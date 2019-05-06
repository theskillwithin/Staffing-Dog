import { useState } from 'react'
import qs from 'qs'
import pickBy from 'lodash/pickBy'
import includes from 'lodash/includes'

export const useQueryParams = queryString => {
  const query = queryString || ''
  const firstChar = query.substr(0, 1)

  return qs.parse('?' === firstChar ? query.substr(1) : query)
}

export const useQueryParamsOnlyWith = (queryString, onlyWith = []) =>
  pickBy(useQueryParams(queryString), (_value, key) => includes(onlyWith, key))

export const useNonEmptyParams = params =>
  pickBy(params, value => value !== null && value !== '' && value !== '0')

/**
 * Hook: userFilterQueryParams
 *
 * Provides state/setState to get/set filters
 * Updates filters when ever the queryString chnages
 * TODO: useMemo some of the calculations
 * @param {string} queryString
 * @param {array} filterNames
 */
export function useFilterQueryParams(
  queryString,
  filterNames = ['employment_type', 'specialty', 'job_type', 'radius'],
) {
  const searchParams = useQueryParamsOnlyWith(queryString, filterNames)
  const filterParams = {
    ...filterNames.reduce(
      (listOfFilters, currentFilterName) => ({
        ...listOfFilters,
        [currentFilterName]: null,
      }),
      {},
    ),
    ...searchParams,
  }

  const [filters, setFilters] = useState(filterParams)

  return [filters, setFilters]
}
