export const getItem = sKey =>
  !sKey
    ? null
    : encodeURIComponent(
        document.cookie.replace(
          new RegExp(
            `(?:(?:^|.*;)\\s*${encodeURIComponent(sKey).replace(
              /[-.+*]/g,
              '\\$&',
            )}\\s*\\=\\s*([^;]*).*$)|^.*$`,
          ),
          '$1',
        ),
      ) || null

export const setItem = (sKey, sValue, vEnd, sPath, sDomain, bSecure) => {
  if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
    return false
  }
  let sExpires = ''
  if (vEnd) {
    switch (vEnd.constructor) {
      case Number:
        sExpires =
          vEnd === Infinity
            ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
            : `; max-age=${vEnd}`
        break
      case String:
        sExpires = `; expires=${vEnd}`
        break
      case Date:
        sExpires = `; expires=${vEnd.toUTCString()}`
        break
    }
  }

  const value = `${encodeURIComponent(sKey)}=${encodeURIComponent(sValue)}`
  const domain = sDomain ? `; domain=${sDomain}` : ''
  const path = sPath ? `; path=${sPath}` : ''
  const secure = bSecure ? '; secure' : ''

  document.cookie = `${value}${sExpires}${domain}${path}${secure}`

  return true
}

export const removeItem = (sKey, sPath, sDomain) => {
  if (!hasItem(sKey)) {
    return false
  }

  const expires = '=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  const domain = sDomain ? `; domain=${sDomain}` : ''
  const path = sPath ? `; path=${sPath}` : ''

  document.cookie = `${encodeURIComponent(sKey)}${expires}${domain}${path}`
  return true
}

export const hasItem = sKey => {
  if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
    return false
  }
  return new RegExp(
    `(?:^|;\\s*)${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=`,
  ).test(document.cookie)
}
export const keys = () => {
  const aKeys = document.cookie
    .replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '')
    .split(/\s*(?:=[^;]*)?;\s*/)
  for (let nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
    aKeys[nIdx] = decodeURIComponent(aKeys[nIdx])
  }
  return aKeys
}
