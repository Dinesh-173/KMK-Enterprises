import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import AnimatedSection, { staggerContainer, slideUp } from '../components/AnimatedSection';
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
    color: '#00A896',
    featured: true,
    gradient: 'linear-gradient(135deg, rgba(0,168,150,0.2), rgba(11,31,58,0.9))',
  },
  {
    id: 2,
    title: 'FSSAI 2025 Label Updates: What Food Manufacturers Must Know',
    excerpt: 'A comprehensive guide to the new labelling regulations effective from January 2025.',
    category: 'industry',
    readTime: '8 min',
    date: 'May 2025',
    tag: 'Industry',
    color: '#7B2FBE',
    featured: false,
    gradient: 'linear-gradient(135deg, rgba(123,47,190,0.15), rgba(11,31,58,0.9))',
  },
  {
    id: 3,
    title: 'Clean-Label Emulsifiers: A Deep Dive into Plant-Based Alternatives',
    excerpt: 'Sunflower lecithin, acacia gum, and modified starches are leading the clean-label revolution in food processing.',
    category: 'research',
    readTime: '10 min',
    date: 'Apr 2025',
    tag: 'Research',
    color: '#F4A100',
    featured: false,
    gradient: 'linear-gradient(135deg, rgba(244,161,0,0.12), rgba(11,31,58,0.9))',
  },
  {
    id: 4,
    title: "India's Functional Beverage Market: $3B Opportunity by 2027",
    excerpt: 'Consumer awareness and urban health trends are fueling unprecedented growth in the functional drinks segment.',
    category: 'trends',
    readTime: '5 min',
    date: 'Mar 2025',
    tag: 'Trends',
    color: '#00A896',
    featured: false,
    gradient: 'linear-gradient(135deg, rgba(0,168,150,0.12), rgba(11,31,58,0.9))',
  },
  {
    id: 5,
    title: 'Probiotics in Dairy: Strain Selection for Maximum Efficacy',
    excerpt: 'Not all probiotics are created equal. This research review examines the most viable strains for dairy application.',
    category: 'research',
    readTime: '12 min',
    date: 'Feb 2025',
    tag: 'Research',
    color: '#7B2FBE',
    featured: false,
    gradient: 'linear-gradient(135deg, rgba(123,47,190,0.12), rgba(11,31,58,0.9))',
  },
  {
    id: 6,
    title: 'HPP Technology: Extending Shelf Life Without Preservatives',
    excerpt: 'High Pressure Processing is no longer just for large FMCG players — here\'s how SMEs can adopt it affordably.',
    category: 'food-tech',
    readTime: '7 min',
    date: 'Jan 2025',
    tag: 'Food Tech',
    color: '#F4A100',
    featured: false,
    gradient: 'linear-gradient(135deg, rgba(244,161,0,0.1), rgba(11,31,58,0.9))',
  },
  {
    id: 7,
    title: 'The 10 Food Trends Defining 2025',
    excerpt: 'From regenerative agriculture to AI-designed flavors — what KMK\'s food technologists are watching closely.',
    category: 'trends',
    readTime: '9 min',
    date: 'Dec 2024',
    tag: 'Trends',
    color: '#00A896',
    featured: false,
    gradient: 'linear-gradient(135deg, rgba(0,168,150,0.1), rgba(11,31,58,0.9))',
  },
];

function ArticleCard({ article, index, isFeatured }) {
  const [hovered, setHovered] = useState(false);

  if (isFeatured) {
    return (
      <motion.article
        className="glass rounded-2xl overflow-hidden relative cursor-pointer group col-span-full"
        style={{ background: article.gradient, border: `1px solid ${article.color}25` }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ boxShadow: `0 20px 60px ${article.color}20` }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <div className="p-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ backgroundColor: `${article.color}20`, color: article.color }}>
              Featured
            </span>
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ backgroundColor: `${article.color}15`, color: article.color }}>
              {article.tag}
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4 max-w-2xl group-hover:text-teal transition-colors duration-300"
            style={{ transition: 'color 0.3s' }}>
            {article.title}
          </h2>
          <p className="text-base max-w-xl mb-8" style={{ color: '#8896A5' }}>{article.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-xs" style={{ color: '#8896A5' }}>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readTime} read</span>
              <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> {article.date}</span>
            </div>
            <motion.div
              className="flex items-center gap-2 font-bold text-sm"
              style={{ color: article.color }}
              animate={{ gap: hovered ? '16px' : '8px' }}
            >
              Read Article <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Parallax hover image effect */}
        <motion.div
          className="absolute right-8 top-8 w-40 h-40 rounded-xl opacity-20 hidden lg:block"
          style={{
            background: `radial-gradient(circle, ${article.color}80, transparent 70%)`,
          }}
          animate={{
            x: hovered ? -10 : 0,
            y: hovered ? -10 : 0,
            scale: hovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.article>
    );
  }

  return (
    <motion.article
      layout
      className="glass rounded-2xl overflow-hidden relative cursor-pointer group"
      style={{ background: article.gradient, border: `1px solid ${article.color}20` }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6, boxShadow: `0 20px 40px ${article.color}20` }}
    >
      {/* Teal left border sweep */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{ backgroundColor: article.color }}
        initial={{ scaleY: 0, transformOrigin: 'bottom' }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.08 }}
      />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${article.color}15`, color: article.color }}>
            {article.tag}
          </span>
          <span className="text-xs" style={{ color: '#8896A5' }}>{article.date}</span>
        </div>

        <h3 className="text-base font-bold text-white mb-3 leading-snug group-hover:text-opacity-80 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: '#8896A5' }}>{article.excerpt}</p>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs" style={{ color: '#8896A5' }}>
            <Clock className="w-3 h-3" /> {article.readTime} read
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: article.color }}>
            Read more <ArrowRight className="w-3 h-3" />
          </span>
        </div>
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
    <div className="bg-navy min-h-screen" style={{ backgroundColor: '#0B1F3A' }}>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative" style={{ background: 'linear-gradient(180deg, #060f1e 0%, #0B1F3A 100%)' }}>

        <div className="max-w-7xl mx-auto px-6">

          <AnimatedSection>
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#00A896' }}>Knowledge Hub</p>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              Blog & <span className="gradient-text-teal">Insights</span>
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: '#8896A5' }}>
              Cutting-edge perspectives on food technology, regulation, and market trends from KMK's experts.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="py-10" style={{ backgroundColor: '#060f1e' }}>
        <div className="max-w-7xl mx-auto px-6">
          <LayoutGroup>
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES_FILTER.map((cat) => (
                <motion.button
                  key={cat.id}
                  layout
                  className="relative px-5 py-2.5 rounded-full text-sm font-bold"
                  style={{
                    color: activeCategory === cat.id ? '#fff' : '#8896A5',
                  }}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="blog-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: '#00A896' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </motion.button>
              ))}
            </div>
          </LayoutGroup>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <LayoutGroup>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Featured (always shown regardless of filter) */}
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

          <AnimatedSection className="text-center mt-16">
            <motion.button
              className="px-10 py-4 rounded-xl font-bold text-sm border"
              style={{ borderColor: 'rgba(0,168,150,0.3)', color: '#00A896' }}
              whileHover={{ backgroundColor: 'rgba(0,168,150,0.1)', borderColor: '#00A896' }}
            >
              Load More Articles
            </motion.button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
