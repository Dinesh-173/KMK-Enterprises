// Ingestion script for KMK Knowledge Base
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Splits document content into semantic paragraphs/chunks
 */
export function chunkDocument(document, maxChunkChars = 800) {
  const paragraphs = document.content.split(/\n\n+/);
  const chunks = [];
  let currentChunk = '';
  let chunkIdx = 0;

  for (const para of paragraphs) {
    if ((currentChunk + '\n\n' + para).length > maxChunkChars && currentChunk.trim().length > 0) {
      chunks.push({
        document_slug: document.slug,
        chunk_index: chunkIdx++,
        chunk_title: `${document.title} (Part ${chunkIdx})`,
        content: currentChunk.trim(),
        metadata: {
          category: document.category,
          source_url: document.source_url,
          title: document.title,
        },
      });
      currentChunk = para;
    } else {
      currentChunk = currentChunk ? `${currentChunk}\n\n${para}` : para;
    }
  }

  if (currentChunk.trim().length > 0) {
    chunks.push({
      document_slug: document.slug,
      chunk_index: chunkIdx++,
      chunk_title: `${document.title} (Part ${chunkIdx})`,
      content: currentChunk.trim(),
      metadata: {
        category: document.category,
        source_url: document.source_url,
        title: document.title,
      },
    });
  }

  return chunks;
}

/**
 * Generates embeddings via OpenAI API or deterministic fallback for unit tests
 */
export async function getEmbedding(text, apiKey = process.env.OPENAI_API_KEY) {
  if (!apiKey) {
    // Generate deterministic 1536-dimensional mock vector for testing/offline environments
    const vector = new Array(1536).fill(0);
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      vector[i % 1536] += (charCode / 255) * 0.05;
    }
    // Normalize vector
    const norm = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0)) || 1;
    return vector.map((v) => v / norm);
  }

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      input: text,
      model: 'text-embedding-3-small',
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI Embedding API error: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

/**
 * Main ingestion routine
 */
export async function runIngestion(options = {}) {
  const seedPath = path.resolve(__dirname, '../seed_knowledge.json');
  const documents = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  console.log(`Loaded ${documents.length} canonical KMK documents from ${seedPath}`);

  const allChunks = [];
  for (const doc of documents) {
    const docChunks = chunkDocument(doc);
    allChunks.push(...docChunks);
  }

  console.log(`Generated ${allChunks.length} chunks across ${documents.length} documents.`);
  return { documents, chunks: allChunks };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runIngestion().catch((err) => {
    console.error('Ingestion failed:', err);
    process.exit(1);
  });
}
