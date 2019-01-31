import { SIM, IS_DEV, IS_STAGE } from '@sdog/utils/env'

export { SIM, IS_DEV }
export const API_VERSION = 'v1'
export const SIM_TTL = 100
export const LOCAL_API_ROOT = `http://api.sdog.test/${API_VERSION}`
export const STAGE_API_ROOT = `https://api.dev.staffing.dog/${API_VERSION}`
export const PROD_API_ROOT = IS_STAGE
  ? STAGE_API_ROOT
  : `https://api.staffing.dog/${API_VERSION}`
export const API_ROOT = IS_DEV ? LOCAL_API_ROOT : PROD_API_ROOT
