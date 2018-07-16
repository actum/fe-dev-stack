const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

module.exports = {
  method: 'POST',
  url: '/api/Shortlist/ChangeBookingDates',
  controller: (data, req) => ({
    success: true,
    message: 'Done.',
    payload: {
      guid: req.body.guid,
      boatId: 7314,
      providerId: 2,
      dateFrom: req.body.dateFrom,
      dateTo: req.body.dateTo,
      status: 'booked',
      preBookedUntil: null,
      booking: {
        name: 'Tove',
        model: 'Fountaine Pajot Belize 43',
        type: 'Katamarán',
        productionYear: 2001,
        berths: '10',
        cabins: '4',
        heads: '3',
        company: 'Istion Yachting',
        country: 'Řecko',
        countryCode: 'GR',
        marina: 'o. Levkáda - Marina Lefkas',
        dateFrom: req.body.dateFrom,
        dateTo: req.body.dateTo,
        price: randomInt(3000, 10000),
        basePrice: 4800,
        discountPercentage: randomInt(1, 50),
        image:
          'http://api.yachtcharter.cz.preview.cz/api/v2//200px-square-thumbnails/2/7314/16551-1.jpg',
        status: 'booked',
      },
    },
    modelErrors: null,
    exception: null,
  }),
}
