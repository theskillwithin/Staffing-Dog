import * as userApi from '@sdog/api/user'

export default [
  {
    type: 'GET',
    url: userApi.API_USER,
    response: {
      data: {
        user: { name: 'Will', age: 31 },
      },
    },
  },
]
