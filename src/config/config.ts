const config = {
  apiUrl: process.env.API_URL as string,
  prod: process.env.NODE_ENV === 'production',
  secretKey: process.env.SECRET_KEY as string,
  anilistClientId: process.env.ANILIST_CLIENT_ID as string,
  anilistSecretKey: process.env.ANILIST_SECRET_KEY as string,
  anilistRedirectUrl: process.env.ANILIST_REDIRECT_URL as string,
  indexedDbName: process.env.INDEXED_DB_NAME as string,
  indexedDbVersion: +(process.env.INDEXED_DB_VERSION as string),
};

export { config };
