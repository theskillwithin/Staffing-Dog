import qs from 'qs'
import pickBy from 'lodash/pickBy'
import includes from 'lodash/includes'

export const useQueryParams = queryString => {
  const query = queryString || ''
  const firstChar = query.substr(0, 1)

  return qs.parse('?' === firstChar ? query.substr(1) : query)
}

export const useQueryParamsOnlyWith = (queryString, onlyWith = []) =>
  pickBy(useQueryParams(queryString), (_value, key) => includes(key, onlyWith))

export const useNonEmptyParams = params =>
  pickBy(params, value => value !== null && value !== '')
