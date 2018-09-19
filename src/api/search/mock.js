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
    city: 'Salt Lake City, UT',
    distance: 7,
    type: 'red',
    slug: '/test',
    position: 'Dental Hygientist',
    experience: '4-7 Years',
    jobType: 'Temporary',
    short:
      'We are in need of a RDH for the months of December, January and February for maternity leave. Possibly turning into a part-time permanet position. Dentrix knowlege is preferred …',
    pay: '$15 hr',
    new: true,
    star: true,
    applied: false,
  },
  {
    id: 1,
    title: 'Temporary Hygienist Needed for Maternity Leave',
    date: '19',
    location: 'APEX Dental',
    time: '10:30 AM - 6 PM',
    address: '286 East 12200 South Draper, UT 84020',
    city: 'Salt Lake City, UT',
    distance: 7,
    type: 'blue',
    slug: '/test',
    position: 'Dental Hygientist',
    experience: '4-7 Years',
    jobType: 'Temporary',
    short:
      'We are in need of a RDH for the months of December, January and February for maternity leave. Possibly turning into a part-time permanet position. Dentrix knowlege is preferred …',
    pay: '$15 hr',
    new: false,
    star: false,
    applied: true,
  },
  {
    id: 2,
    title: 'Temporary Hygienist Needed for Maternity Leave',
    date: '31',
    location: 'APEX Dental',
    time: '9:30 AM - 5 PM',
    address: '286 East 12200 South Draper, UT 84020',
    city: 'Salt Lake City, UT',
    distance: 7,
    type: 'grey',
    slug: '/test',
    position: 'Dental Hygientist',
    experience: '4-7 Years',
    jobType: 'Temporary',
    short:
      'We are in need of a RDH for the months of December, January and February for maternity leave. Possibly turning into a part-time permanet position. Dentrix knowlege is preferred …',
    pay: '$15 hr',
    new: false,
    star: false,
    applied: false,
  },
]

export const mock = {
  search: {
    results,
  },
}

export const apiMocks = mockBuilder(jobsApi, mock)

export default apiMocks
