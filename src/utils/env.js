export const ENV = process.env.NODE_ENV
export const IS_DEV = ENV === 'development'
export const IS_PROD = !ENV
export const IS_STAGE = process.env.BUILD_STAGE || false
export const USE_MOCK = Boolean(process.env.MOCK_DATA)
export const BYPASS_LUA = Boolean(process.env.BYPASS_LUA)
// export const SIM = IS_DEV || USE_MOCK
export const SIM = true

export default ENV
