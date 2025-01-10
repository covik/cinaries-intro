export function DownloadIndicator() {
  return (
    <svg width="508" height="20" xmlns="http://www.w3.org/2000/svg">
      <line
        stroke-dasharray="5, 10"
        x1="0"
        y1="10"
        x2="310"
        y2="10"
        style={{ strokeWidth: '1px;' }}
      />
    </svg>
  );
}
