function StatusBadge({
  status = "offline",
}) {
  return (
    <span
      className={`status-badge ${status}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;