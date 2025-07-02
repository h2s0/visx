function isDate(obj) {
  return obj instanceof Date && !isNaN(obj.getTime());
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (!isDate(date)) return null;
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

export default formatDate;
