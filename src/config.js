const { env } = process

const isProduction = env.NODE_ENV === 'production'
const endpoint = `${env.PRISMA_ENDPOINT}/${env.PRISMA_SERVICE}/${env.PRISMA_STAGE}`
const secret = env.PRISMA_SERVICE_SECRET
const playground = isProduction ? false : '/'

const corsHostes = env.CLIENT_HOSTS || ['localhost:8080', '127.0.0.1:8000'].join('|')
const corsProtocols = isProduction ? 'wss|https' : 'ws|http'

const origen = new RegExp(`(${corsProtocols}):\/\/(${corsHostes})(.+)?`)

module.exports = {
    endpoint,
    env,
    isProduction,
    origen,
    playground,
    secret
}