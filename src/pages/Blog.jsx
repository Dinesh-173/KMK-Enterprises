import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { ArrowRight, Clock, Tag } from 'lucide-react';

const CATEGORIES_FILTER = [
  { id: 'all', label: 'All Posts' },
  { id: 'food-tech', label: 'Food Tech' },
  { id: 'industry', label: 'Industry Articles' },
  { id: 'research', label: 'Research' },
  { id: 'trends', label: 'Trends' },
];

const ARTICLES = [
  {
    id: 1,
    title: 'The Rise of Millet in Premium Ice Cream Formulation',
    excerpt: 'How ancient grains are reshaping the frozen dessert industry. Jowar, ragi, and bajra are driving a new wave of health-forward indulgence.',
    category: 'food-tech',
    readTime: '6 min',
    date: 'Jun 2025',
    tag: 'Food Tech',
    featured: true,
  },
  {
    id: 2,
    title: 'FSSAI 2025 Label Updates: What Food Manufacturers Must Know',
    excerpt: 'A comprehensive guide to the new labelling regulations effective from January 2025.',
    category: 'industry',
    readTime: '8 min',
    date: 'May 2025',
    tag: 'Industry',
    featured: false,
    isNew: true,
  },
  {
    id: 3,
    title: 'Clean-Label Emulsifiers: A Deep Dive into Plant-Based Alternatives',
    excerpt: 'Sunflower lecithin, acacia gum, and modified starches are leading the clean-label revolution in food processing.',
    category: 'research',
    readTime: '10 min',
    date: 'Apr 2025',
    tag: 'Research',
    featured: false,
  },
  {
    id: 4,
    title: "India's Functional Beverage Market: $3B Opportunity by 2027",
    excerpt: 'Consumer awareness and urban health trends are fueling unprecedented growth in the functional drinks segment.',
    category: 'trends',
    readTime: '5 min',
    date: 'Mar 2025',
    tag: 'Trends',
    featured: false,
  },
  {
    id: 5,
    title: 'Probiotics in Dairy: Strain Selection for Maximum Efficacy',
    excerpt: 'Not all probiotics are created equal. This research review examines the most viable strains for dairy application.',
    category: 'research',
    readTime: '12 min',
    date: 'Feb 2025',
    tag: 'Research',
    featured: false,
  },
  {
    id: 6,
    title: 'HPP Technology: Extending Shelf Life Without Preservatives',
    excerpt: "High Pressure Processing is no longer just for large FMCG players — here's how SMEs can adopt it affordably.",
    category: 'food-tech',
    readTime: '7 min',
    date: 'Jan 2025',
    tag: 'Food Tech',
    featured: false,
  },
];

function ArticleCard({ article, index, isFeatured }) {
  if (isFeatured) {
    return (
      <motion.article
        className="bg-white rounded-2xl p-8 md:p-14 shadow-card border border-slate-200 relative cursor-pointer group col-span-full border-t-4 border-t-royal-primary"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(11,79,156,0.18)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono uppercase tracking-widest tag-royal font-bold">
            Featured
          </span>
          <span className="text-xs font-mono uppercase tracking-widest tag-muted font-bold">
            {article.tag}
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-normal text-navy mb-6 max-w-4xl leading-tight group-hover:text-royal-primary transition-colors" style={{ fontFamily: '"DM Serif Display", serif' }}>
          {article.title}
        </h2>
        <p className="text-lg md:text-xl text-text-body mb-8 max-w-3xl font-medium leading-relaxed">{article.excerpt}</p>
        <div className="flex items-center justify-between pt-6 border-t border-cream-divider">
          <div className="flex items-center gap-6 text-xs md:text-sm text-silver-dark font-mono font-bold">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-royal-primary" /> {article.readTime} read</span>
            <span className="flex items-center gap-1.5"><Tag className="w-4 h-4 text-royal-primary" /> {article.date}</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-sm font-bold uppercase text-royal-primary">
            Read Article <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      layout
      className="card-royal p-8 flex flex-col justify-between group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono uppercase tracking-widest tag-royal font-bold">
            {article.tag}
          </span>
          {article.isNew && (
            <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-royal-primary text-white font-bold">
              New
            </span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-navy mb-3 leading-snug group-hover:text-royal-primary transition-colors">
          {article.title}
        </h3>
        <p className="text-base text-text-body font-medium leading-relaxed mb-6">{article.excerpt}</p>
      </div>

      <div className="pt-4 border-t border-cream-divider flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-mono text-silver-dark font-bold">
          <Clock className="w-4 h-4 text-royal-primary" /> {article.readTime} read
        </span>
        <span className="flex items-center gap-1 text-xs font-mono font-bold uppercase text-royal-primary">
          Read more <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');

  const featured = ARTICLES.find((a) => a.featured);
  const regular = ARTICLES.filter(
    (a) => !a.featured && (activeCategory === 'all' || a.category === activeCategory)
  );

  return (
    <div className="bg-base min-h-screen grain-overlay">
      {/* Hero Header */}
      <section className="relative min-h-[40vh] flex items-center page-hero-pt pb-20 md:pb-24 bg-base border-b border-cream-divider">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase mb-4 inline-block tag-royal">
              Knowledge Hub
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-normal text-navy mb-6" style={{ fontFamily: '"DM Serif Display", serif' }}>
              Blog & Insights
            </h1>
            <p className="text-lg md:text-2xl max-w-3xl text-text-body font-medium leading-relaxed">
              Cutting-edge perspectives on food technology, regulation, and market trends from KMK's experts.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="py-8 bg-soft border-b border-cream-divider">
        <div className="max-w-7xl mx-auto px-6">
          <LayoutGroup>
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES_FILTER.map((cat) => (
                <motion.button
                  key={cat.id}
                  layout
                  className="relative px-5 py-2.5 rounded-full text-xs md:text-sm font-mono font-bold uppercase transition-all"
                  style={{
                    backgroundColor: activeCategory === cat.id ? '#0B4F9C' : '#FFFFFF',
                    color: activeCategory === cat.id ? '#FFFFFF' : '#334155',
                    border: activeCategory === cat.id ? '1px solid #0B4F9C' : '1px solid #EAE5D9',
                  }}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </LayoutGroup>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding-royal bg-soft">
        <div className="max-w-7xl mx-auto px-6">
          <LayoutGroup>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeCategory === 'all' && featured && (
                <ArticleCard key={featured.id} article={featured} index={0} isFeatured />
              )}

              <AnimatePresence>
                {regular.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} isFeatured={false} />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
      </section>
    </div>
  );
}
