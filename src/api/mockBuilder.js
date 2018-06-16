export default (apis, mockData) =>
  Object.keys(apis).map(apiName => ({
    ...apis[apiName],
    response: mockData[apiName] || {},
  }))
