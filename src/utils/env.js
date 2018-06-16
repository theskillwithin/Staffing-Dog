export const ENV = process.env.NODE_ENV
export const IS_DEV = ENV === 'development'
export const IS_PROD = !ENV
export const USE_MOCK = Boolean(process.env.MOCK_DATA)
// export const SIM = IS_DEV || USE_MOCK
export const SIM = true

export default ENV
