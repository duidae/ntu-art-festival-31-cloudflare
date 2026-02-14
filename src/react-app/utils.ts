export const FormatDateYYYYMMDD = (d: Date) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
export const FormatLatLon = (lat: number, lon: number) => {
  const latAbs = Math.abs(lat).toFixed(3);
  const lonAbs = Math.abs(lon).toFixed(3);
  const latHem = lat >= 0 ? 'N' : 'S';
  const lonHem = lon >= 0 ? 'E' : 'W';
  return `${latAbs}°${latHem} ${lonAbs}°${lonHem}`;
};

export const SanitizeHref = (input?: string) => {
  if (!input) return '#';

  try {
    const url = new URL(input, window.location.origin);

    const allowed = new Set([
      'http:',
      'https:',
      'mailto:',
      'tel:',
    ]);

    return allowed.has(url.protocol) ? url.href : '#';
  } catch {
    return '#';
  }
};
