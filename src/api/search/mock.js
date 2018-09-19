import mockBuilder from '@api/mockBuilder'

import jobsApi from '.'

export const results = [
  {
    id: 0,
    title: 'Temporary Hygienist Needed for Maternity Leave',
    date: '10',
    location: 'APX Dental',
    time: '9:30 AM - 5:00 PM',
    address: '641 W 900 S, STE 1 Sandy UT 84070',
    type: 'red',
    slug: '/test',
  },
  {
    id: 1,
    title: 'Temporary Hygienist Needed for Maternity Leave',
    date: '19',
    location: 'APEX Dental',
    time: '10:30 AM - 6 PM',
    address: '286 East 12200 South Draper, UT 84020',
    type: 'blue',
    slug: '/test',
  },
  {
    id: 2,
    title: 'Temporary Hygienist Needed for Maternity Leave',
    date: '31',
    location: 'APEX Dental',
    time: '9:30 AM - 5 PM',
    address: '286 East 12200 South Draper, UT 84020',
    type: 'grey',
    slug: '/test',
  },
]

export const mock = {
  search: {
    results,
  },
}

export const apiMocks = mockBuilder(jobsApi, mock)

export default apiMocks
