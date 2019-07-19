//Bu sayfayi require ettigimizde ,yani bir module olarak ekledigimizde baska bir sayfa da
//baseUrl ve APIKey i new lemeden kullanabiliriz
module.exports = {
  query: {
    name: "q",
    id: "id",
    coordinates: {
      latitude: "lat",
      longitude: "lon"
    },
    zipcode: "zip"
  },
  APIKey: "99b8f8897c4daf2d48053bc43310b9d4"
};
