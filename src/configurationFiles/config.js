module.exports = {
  googleAppId: process.env.GOOGLE_APP_ID,
  googleApiKey: process.env.GOOGLE_API_KEY,
  host: process.env.DOMAIN,
  baseUrl: process.env.BASE_URL || '/',
  apiUrl: `https://api.${process.env.DOMAIN}`
};
