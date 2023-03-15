export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api',
    port: process.env.PORT || 5050,
    salt: 12,
    jwtSecret: process.env.JWT_SECRET || 'jwx212a_1s!',
}