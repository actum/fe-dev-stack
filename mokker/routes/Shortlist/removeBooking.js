const removeBooking = require('../../models/Shortlist/removeBooking')

module.exports = {
  method: 'POST',
  url: '/api/Shortlist/RemoveBooking',
  controller: removeBooking,
}
