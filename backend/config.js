function getEnvString(key, required = false) {
  const val = process.env[key];
  if (required && !val) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return val;
}

export const s3 = {
  photosBucket: getEnvString('S3_PHOTOS_BUCKET'),
};

