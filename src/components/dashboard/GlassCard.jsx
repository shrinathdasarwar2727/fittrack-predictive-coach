import { motion } from 'framer-motion';

function GlassCard({ children, compact = false, className = '' }) {
  const classes = ['card-wrapper', className].filter(Boolean).join(' ');

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.015, y: -3 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <article className="card">
        <div className="card-content" style={{ padding: compact ? '14px' : '18px' }}>
          {children}
        </div>
      </article>
    </motion.div>
  );
}

export default GlassCard;