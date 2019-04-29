export const ENV = process.env.NODE_ENV
export const IS_DEV = ENV === 'development'
export const IS_PROD = !ENV
export const IS_STAGE = process.env.BUILD_STAGE || false
export const BYPASS_LUA = Boolean(process.env.BYPASS_LUA)
export const GA_CODE = process.env.GA_CODE || false

export default ENV
