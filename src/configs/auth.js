import { resolveCookeiDomain } from './env'

export const AUTH_COOKIE_NAME = '_test_jwt_sso'
export const AUTH_COOKIE_DOMAIN = resolveCookeiDomain()
