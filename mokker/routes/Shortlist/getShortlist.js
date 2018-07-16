const getShortlist = require('../../models/Shortlist/getShortlist')

module.exports = {
  method: 'GET',
  url: '/api/Shortlist/GetShortlist',
  controller: getShortlist,
}
