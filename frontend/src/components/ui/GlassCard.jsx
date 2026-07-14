function GlassCard({ children, className = "" }) {
  return (
    <div className={`glass-ui-card ${className}`}>
      {children}
    </div>
  );
}

export default GlassCard;