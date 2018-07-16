const removeBooking = (data, req, res) => {
  const { hostQuery } = data

  if (hostQuery.status) {
    res.status(hostQuery.status)
  }

  if (req.body.guid === '1210a4b0-817f-4992-ab9b-367b439278ee') {
    res.status(400)

    return {
      success: false,
      message: 'Sorry, we could not remove your booking',
    }
  }

  return {
    success: true,
    message: 'Your booking has been removed',
    modelErrors: null,
    exception: null,
  }
}

module.exports = removeBooking
