import mockBuilder from '@api/mockBuilder'

import jobsApi from '.'

export const events = [
  {
    id: 0,
    date: '10',
    location: 'APX Dental',
    time: '9:30 AM - 5:00 PM',
    address: '641 W 900 S, STE 1 Sandy UT 84070',
    type: 'red',
    startDate: '2018-11-02',
    endDate: '2018-11-05',
    primary: false,
  },
  {
    id: 1,
    date: '19',
    location: 'APEX Dental',
    time: '10:30 AM - 6 PM',
    address: '286 East 12200 South Draper, UT 84020',
    type: 'blue',
    startDate: '2018-11-12',
    endDate: '2018-11-19',
    primary: true,
  },
  {
    id: 2,
    date: '31',
    location: 'APEX Dental',
    time: '9:30 AM - 5 PM',
    address: '286 East 12200 South Draper, UT 84020',
    type: 'grey',
    startDate: '2018-11-29',
    endDate: '2018-12-04',
    primary: true,
  },
]

export const mock = {
  getEvents: {
    events,
  },
}

export const apiMocks = mockBuilder(jobsApi, mock)

export default apiMocks
