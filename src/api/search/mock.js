import mockBuilder from '@api/mockBuilder'

import jobsApi from '.'

export const results = [
  {
    id: 0,
    date: '10',
    location: 'APX Dental',
    time: '9:30 AM - 5:00 PM',
    address: '641 W 900 S, STE 1 Sandy UT 84070',
    type: 'red',
  },
  {
    id: 1,
    date: '19',
    location: 'APEX Dental',
    time: '10:30 AM - 6 PM',
    address: '286 East 12200 South Draper, UT 84020',
    type: 'blue',
  },
  {
    id: 2,
    date: '31',
    location: 'APEX Dental',
    time: '9:30 AM - 5 PM',
    address: '286 East 12200 South Draper, UT 84020',
    type: 'grey',
  },
]

export const mock = {
  search: {
    results,
  },
}

export const apiMocks = mockBuilder(jobsApi, mock)

export default apiMocks
