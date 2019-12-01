export const range = (start, end) => Array.from({ length: end - start }, (_, k) => k + start);

export const getCurrentPosition = async () =>
  new Promise((resolve, reject) => {
    if ('geolocation' in window.navigator) {
      window.navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          resolve(new window.google.maps.LatLng(latitude, longitude));
        },
        () => reject(),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      reject();
    }
  });

export const getNearbyPlaces = async (service, location) =>
  new Promise((resolve, reject) => {
    service.nearbySearch(
      { location, radius: 500, type: ['restaurant'], fields: ['formatted_address'] },
      (places, status) => {
        switch (status) {
          case window.google.maps.places.PlacesServiceStatus.OK:
            resolve(normalizePlaces(places));
            break;
          default:
            resolve([]);
            break;
        }
      },
      () => reject()
    );
  });

export const getPlaceDetails = async (service, placeId) =>
  new Promise((resolve, reject) => {
    if (Object.prototype.hasOwnProperty.call(window.places, placeId)) {
      resolve(window.places[placeId]);
    } else {
      service.getDetails(
        {
          placeId,
          fields: [
            'place_id',
            'name',
            'type',
            'reviews',
            'user_ratings_total',
            'formatted_address',
            'photos',
            'international_phone_number',
            'url',
            'rating',
            'geometry',
            'vicinity',
            'website',
          ],
        },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            resolve(normalizePlace(place));
          } else {
            reject();
          }
        }
      );
    }
  });

export const normalizePlace = ({
  place_id = '',
  name = '',
  photos = [{ getUrl: () => null }],
  types = [],
  rating = 0,
  user_ratings_total = 0,
  geometry: { location },
  international_phone_number = '',
  opening_hours: { isOpen = () => true } = {},
  website = '',
  vicinity = '',
  formatted_address = '',
  reviews = [],
  url = '',
}) => ({
  id: place_id,
  cover: photos[0].getUrl({ maxWidth: 570, maxHeight: 260 }),
  types: types.slice(-8).map(type => type.replace(/_/g, ' ')),
  rating: +rating.toFixed(1),
  phoneNumber: international_phone_number,
  gmap: url,
  address: formatted_address || vicinity,
  ratings: user_ratings_total,
  reviews: sortReviews(normalizeReviews(reviews)),
  isOpen,
  website,
  name,
  location,
});

export const normalizePlaces = places =>
  places.reduce((accumulator, place) => {
    accumulator[place.place_id] = normalizePlace(place);

    return accumulator;
  }, {});

export const normalizeReview = ({
  profile_photo_url: photo,
  author_name: author,
  text: comment,
  time,
}) => ({
  date: new Date(time * 1000),
  photo,
  author,
  comment,
});

export const normalizeReviews = reviews => reviews.map(review => normalizeReview(review));

export const sortReviews = reviews =>
  reviews.sort((left, right) => right.date.getTime() - left.date.getTime());

export const getFilteredPlaces = (places, query, minRating, maxRating) =>
  Object.values(places).filter(
    ({ name, rating }) =>
      name.toLowerCase().includes(query.toLowerCase()) && rating >= minRating && rating <= maxRating
  );

export const getSortedPlaces = places => places.sort((left, right) => right.rating - left.rating);

export const noop = () => {};

export const gmapEncodeURI = uri => window.encodeURIComponent(uri).replace(/%20/g, '+');

export const uniqid = () => (new Date().getTime() * Math.random()).toString(32).replace('.', '');