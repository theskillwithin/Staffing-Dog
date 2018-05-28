export const ENV = process.env.NODE_ENV
export const IS_DEV = ENV === 'development'
export const IS_PROD = !ENV
export const SIM = !!process.env.MOCK_DATA

export default ENV
