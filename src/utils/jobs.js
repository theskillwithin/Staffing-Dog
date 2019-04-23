import { useMemo } from 'react'
import isArray from 'lodash/isArray'

// gets list of jobs based on userType
export function getJobsByUserType({ userType, jobs }) {
  if (isArray(jobs)) {
    return jobs
  }

  if ('professional' === userType) {
    return jobs.scheduled
  }

  if ('practice' === userType) {
    return jobs.posts || []
  }

  return []
}

// TODO: get useMemo to actually work when jobs changes, it is too deep of a check
export function useJobsByUserType({ userType, jobs }) {
  return useMemo(() => getJobsByUserType(userType, jobs), [userType, jobs])
}
