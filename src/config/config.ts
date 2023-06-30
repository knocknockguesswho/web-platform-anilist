const config = {
  apiUrl: process.env.API_URL as string,
  prod: process.env.NODE_ENV === 'production',
  indexedDbName: process.env.INDEXED_DB_NAME as string,
  indexedDbVersion: +(process.env.INDEXED_DB_VERSION as string),
};

export { config };
