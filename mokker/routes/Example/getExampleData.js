const getExampleData = require('../../models/Example/getExampleData')

module.exports = {
  method: 'GET',
  url: '/api/Example/GetExampleData',
  controller: getExampleData,
}
