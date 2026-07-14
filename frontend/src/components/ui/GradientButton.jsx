function GradientButton({
  children,
  onClick,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`gradient-btn ${className}`}
    >
      {children}
    </button>
  );
}

export default GradientButton;