const getExampleData = (data, req, res) => {
  const { hostQuery } = data

  if (hostQuery.status) {
    res.status(hostQuery.status)
  }

  if (res) {
    switch (res.statusCode) {
      case '200':
        return {
          title: 'Example feature',
          text: 'It is awesome!',
        }
      case '400':
        return {
          message: 'Sorry, we could not get your data',
        }
      case '500':
        return {
          message: '500 Internal Server Error',
        }
      default:
        return {
          title: 'Example feature',
          text: 'It is awesome!',
        }
    }
  }

  return {
    title: 'Example feature',
    text: 'It is awesome!',
  }
}
module.exports = getExampleData
