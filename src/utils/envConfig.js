function decodeBase64(value) {
  if (!value) {
    return '';
  }

  try {
    return window.atob(value);
  } catch {
    return '';
  }
}

export function decodeEncodedConfig(value) {
  const decoded = decodeBase64(value);
  return Array.from(decoded).reverse().join('');
}

export function getPublicConfig(encodedValue, plainValue = '') {
  return decodeEncodedConfig(encodedValue) || plainValue || '';
}
