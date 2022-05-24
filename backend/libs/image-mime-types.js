const CONTENT_TYPE_SUFFIX_MAPPINGS = {
  'image/jpeg': 'jpg',
  'image/svg+xml': 'svg',
  'image/png': 'png',
};

export function getSupportedContentTypes() {
  return Object.keys(CONTENT_TYPE_SUFFIX_MAPPINGS);
}

export function isValidImageContentType(contentType) {
  return Object.keys(CONTENT_TYPE_SUFFIX_MAPPINGS).includes(contentType);
}

export function getFileSuffixForContentType(contentType) {
  return CONTENT_TYPE_SUFFIX_MAPPINGS[contentType];
}
