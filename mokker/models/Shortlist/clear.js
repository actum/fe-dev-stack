const clear = (data, req, res) => {
  // Generate random response for success and error
  if (Math.floor(Math.random() * 6) > 3) {
    res.status(400)

    return {
      success: false,
      message: 'Sorry, we could not clear your shortlist',
    }
  }

  const { hostQuery } = data

  if (hostQuery.status) {
    res.status(hostQuery.status)
  }

  return {
    success: true,
    message: 'Your shortlist has been cleared',
    payload: {
      items: [
        {
          guid: 'a2da2dad-af41-4afe-8de2-8cd0e04f3f74',
          boatId: 58678,
          providerId: 4,
          dateFrom: '2018-07-07T00:00:00',
          dateTo: '2018-07-14T00:00:00',
          status: 'booked',
          preBookedUntil: null,
          booking: {
            image: '//satyr.io/256x256/3',
            name: 'Blue-Pi',
            model: 'Maxi 77',
            type: 'Plachetnice',
            productionYear: 1982,
            berths: '4',
            cabins: '1',
            heads: '0',
            company: 'Sail Stockholm',
            country: 'Švédsko',
            countryCode: 'SE',
            marina: 'Vaxholm-Säbyviken',
            dateFrom: '2018-07-07T00:00:00',
            dateTo: '2018-07-14T00:00:00',
            price: 618,
            basePrice: 650,
            discountPercentage: 5,
          },
        },
        {
          guid: 'afd73186-12a9-4563-bdf0-6038d74211ac',
          boatId: 49304,
          providerId: 1,
          dateFrom: '2018-07-07T00:00:00',
          dateTo: '2018-07-14T00:00:00',
          status: 'available',
          preBookedUntil: null,
          booking: {
            image: '//satyr.io/256x256/6',
            name: 'Gertrud',
            model: 'Other',
            type: 'Plachetnice',
            productionYear: 1978,
            berths: '2',
            cabins: '1',
            heads: null,
            company: 'mediamare yachtcharter',
            country: 'Německo',
            countryCode: 'DE',
            marina: 'Marina Kröslin',
            dateFrom: '2018-07-07T00:00:00',
            dateTo: '2018-07-14T00:00:00',
            price: 656,
            basePrice: 690,
            discountPercentage: 5,
          },
        },
      ],
    },
  }
}

module.exports = clear
