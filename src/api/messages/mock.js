import mockBuilder from '@sdog/api/mockBuilder'

import messagesApi from '.'

export const messages = [
  {
    id: 1111,
    threadId: 111,
    from: 'Wes Bos',
    location: 'React Dental',
    date: '5/16/18',
    order: 0,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi asperiores error cupiditate doloribus obcaecati sint blanditiis, maxime quae delectus quibusdam aperiam nam ab? Minus repellendus aut, asperiores facere delectus blanditiis!',
    read: false,
  },
  {
    id: 2222,
    threadId: 222,
    from: 'Me',
    date: '5/16/18',
    order: 0,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi asperiores error cupiditate doloribus obcaecati sint blanditiis, maxime quae delectus quibusdam aperiam nam ab? Minus repellendus aut, asperiores facere delectus blanditiis!',
    read: false,
  },
  {
    id: 3333,
    threadId: 333,
    from: 'Wes Bos',
    location: 'React Dental',
    date: '5/16/18',
    order: 0,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi asperiores error cupiditate doloribus obcaecati sint blanditiis, maxime quae delectus quibusdam aperiam nam ab? Minus repellendus aut, asperiores facere delectus blanditiis!',
    read: false,
  },
]

export const threads = [
  {
    id: 111,
    from: 'Wes Bos',
    location: 'React Dental',
    date: '4:00 PM',
    short:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, dolor provident.',
    read: false,
    threadCount: 4,
  },
  {
    id: 1,
    from: 'Wes Bos',
    location: 'React Dental',
    date: 'Monday',
    short:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, dolor provident.',
    read: false,
    threadCount: null,
  },
  {
    id: 2,
    from: 'Wes Bos',
    location: 'React Dental',
    date: '5/16/18',
    short:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, dolor provident.',
    read: true,
    threadCount: null,
  },
  {
    id: 3,
    from: 'Wes Bos',
    date: '5/16/18',
    short:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, dolor provident.',
    read: true,
    threadCount: null,
  },
  {
    id: 4,
    from: 'Wes Bos',
    location: 'React Dental',
    date: '5/16/18',
    short:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, dolor provident.',
    read: true,
    threadCount: null,
    avatar: 'https://fillmurray.com/48/48',
  },
  {
    id: 5,
    from: 'Wes Bos',
    location: 'React Dental',
    date: '5/16/18',
    short:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, dolor provident.',
    read: true,
    threadCount: 4,
  },
  {
    id: 6,
    from: 'Wes Bos',
    location: 'React Dental',
    date: '5/16/18',
    short:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, dolor provident.',
    read: true,
    threadCount: null,
  },
]

export const mock = {
  getMessages: {
    threads: threads.map(thread => ({
      ...thread,
      messages,
    })),
  },
}

export const apiMocks = mockBuilder(messagesApi, mock)

export default apiMocks
