const cors = require('cors')

console.log(process.env.CORS_ALLOWED_ORIGIN)

const corsConfig = cors({
  origin: process.env.CORS_ALLOWED_ORIGIN,
  exposedHeaders: ['Authentication'],
})

module.exports.cors = corsConfig
