import {HOUSING_TYPES} from './data.js';

// const mapCanvas = document.querySelector('#map-canvas');
const AdTemplate = document.querySelector('#card').content.querySelector('.popup');

// до ДЗ 27 - отрисовка объявления вместо карты
// const renderAds = (dates) => {
//   const AdFragment = document.createDocumentFragment();

//   dates.forEach(({author, offer}) => {
//     const AdContainer = AdTemplate.cloneNode(true);

//     const renderRoomsCount = (room) => {
//       if (room === 1) {
//         return 'комната';
//       } else {
//         if (room >= 2 && room < 5) {
//           return 'комнаты';
//         } else {
//           return 'комнат';
//         }
//       }
//     };

//     const renderGuestsCount = (guest) => {
//       if (guest === 1) {
//         return 'гостя';
//       } else {
//         return 'гостей';
//       }
//     };

//     const renderFeaturesList = (features) => {
//       const featuresContainer = AdTemplate.querySelector('.popup__features');
//       const featuresListFragment = document.createDocumentFragment();
//       features.forEach((feature) => {
//         const featuresListItem = featuresContainer.querySelector(`.popup__feature--${feature}`);

//         if (featuresListItem) {
//           featuresListFragment.appendChild(featuresListItem);
//         }
//       });
//       return featuresListFragment;
//     };

//     const renderPhotosList = (photos) => {
//       if (photos === 0) {
//         return;
//       }
//       const photosListFragment = document.createDocumentFragment();
//       const photosContainer = AdTemplate.querySelector('.popup__photos');
//       const photosListItem = photosContainer.querySelector('.popup__photo');
//       photos.forEach((photo) => {
//         const photosItemTemplate = photosListItem.cloneNode(true);
//         photosItemTemplate.src = photo;
//         photosListFragment.appendChild(photosItemTemplate);
//       });
//       return photosListFragment;
//     };

//     const AdProperties = [
//       {
//         avatar: {
//           condition: author.avatar,
//           selector: '.popup__avatar',
//           property: 'src',
//           propertyValue: author.avatar,
//         }
//       },
//       {
//         title: {
//           condition: offer.title,
//           selector: '.popup__title',
//           property: 'textContent',
//           propertyValue: offer.title,
//         }
//       },
//       {
//         address: {
//           condition: offer.address,
//           selector: '.popup__text--address',
//           property: 'textContent',
//           propertyValue: offer.address,
//         }
//       },
//       {
//         price: {
//           condition: offer.price,
//           selector: '.popup__text--price',
//           property: 'textContent',
//           propertyValue: `${offer.price} ₽/ночь`
//         }
//       },
//       {
//         type: {
//           condition: offer.type,
//           selector: '.popup__type',
//           property: 'textContent',
//           propertyValue: HOUSING_TYPES[offer.type]
//         }
//       },
//       {
//         capacity: {
//           condition: (offer.rooms) || (offer.guests),
//           selector: '.popup__text--capacity',
//           property: 'textContent',
//           propertyValue: `${offer.rooms} ${renderRoomsCount(offer.rooms)} для ${offer.guests} ${renderGuestsCount(offer.guests)}`
//         }
//       },
//       {
//         time: {
//           condition: (offer.checkin) || (offer.checkout),
//           selector: '.popup__text--time',
//           property: 'textContent',
//           propertyValue: `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`
//         }
//       },
//       {
//         features: {
//           condition: offer.features,
//           selector: '.popup__features',
//           property: 'append',
//           propertyValue: renderFeaturesList(offer.features)
//         }
//       },
//       {
//         description: {
//           condition: offer.description,
//           selector: '.popup__description',
//           property: 'textContent',
//           propertyValue: offer.description
//         }
//       },
//       {
//         photos: {
//           condition: offer.photos,
//           selector: '.popup__photos',
//           property: 'append',
//           propertyValue: renderPhotosList(offer.photos)
//         }
//       }
//     ];

//     const renderAdProperties = ({condition, selector, property, propertyValue}) => {
//       const AdElement = AdContainer.querySelector(selector);

//       if ((condition !== offer.features) && (condition !== offer.photos)) {
//         AdElement[property] = propertyValue;
//       } else {
//         if (condition === offer.features) {
//           AdElement.innerHTML = '';
//           AdElement[property](propertyValue);
//         } else {
//           if (condition === offer.photos) {
//             AdElement.innerHTML = '';
//             AdElement[property](propertyValue);
//           } else {
//             AdElement.remove();
//           }
//         }
//       }
//     };

//     AdProperties.forEach((item) => Object.values(item).map((value) => renderAdProperties(value)));
//     AdFragment.appendChild(AdContainer);
//   });
//   mapCanvas.appendChild(AdFragment);
// };


/// с ДЗ 27 отрисовка одного объявления в поп-ап метки карты
const renderAd = ({author, offer}) => {
  const AdContainer = AdTemplate.cloneNode(true);

  const renderRoomsCount = (room) => {
    if (room === 1) {
      return 'комната';
    } else {
      if (room >= 2 && room < 5) {
        return 'комнаты';
      } else {
        return 'комнат';
      }
    }
  };

  const renderGuestsCount = (guest) => {
    if (guest === 1) {
      return 'гостя';
    } else {
      return 'гостей';
    }
  };

  const renderFeaturesList = (features) => {
    const featuresContainer = AdTemplate.querySelector('.popup__features');
    const featuresListFragment = document.createDocumentFragment();
    features.forEach((feature) => {
      const featuresListItem = featuresContainer.querySelector(`.popup__feature--${feature}`);

      if (featuresListItem) {
        featuresListFragment.appendChild(featuresListItem);
      }
    });
    return featuresListFragment;
  };

  const renderPhotosList = (photos) => {
    if (photos === 0) {
      return;
    }
    const photosListFragment = document.createDocumentFragment();
    const photosContainer = AdTemplate.querySelector('.popup__photos');
    const photosListItem = photosContainer.querySelector('.popup__photo');
    photos.forEach((photo) => {
      const photosItemTemplate = photosListItem.cloneNode(true);
      photosItemTemplate.src = photo;
      photosListFragment.appendChild(photosItemTemplate);
    });
    return photosListFragment;
  };

  const AdProperties = [
    {
      avatar: {
        condition: author.avatar,
        selector: '.popup__avatar',
        property: 'src',
        propertyValue: author.avatar,
      }
    },
    {
      title: {
        condition: offer.title,
        selector: '.popup__title',
        property: 'textContent',
        propertyValue: offer.title,
      }
    },
    {
      address: {
        condition: offer.address,
        selector: '.popup__text--address',
        property: 'textContent',
        propertyValue: offer.address,
      }
    },
    {
      price: {
        condition: offer.price,
        selector: '.popup__text--price',
        property: 'textContent',
        propertyValue: `${offer.price} ₽/ночь`
      }
    },
    {
      type: {
        condition: offer.type,
        selector: '.popup__type',
        property: 'textContent',
        propertyValue: HOUSING_TYPES[offer.type]
      }
    },
    {
      capacity: {
        condition: (offer.rooms) || (offer.guests),
        selector: '.popup__text--capacity',
        property: 'textContent',
        propertyValue: `${offer.rooms} ${renderRoomsCount(offer.rooms)} для ${offer.guests} ${renderGuestsCount(offer.guests)}`
      }
    },
    {
      time: {
        condition: (offer.checkin) || (offer.checkout),
        selector: '.popup__text--time',
        property: 'textContent',
        propertyValue: `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`
      }
    },
    {
      features: {
        condition: offer.features,
        selector: '.popup__features',
        property: 'append',
        propertyValue: renderFeaturesList(offer.features)
      }
    },
    {
      description: {
        condition: offer.description,
        selector: '.popup__description',
        property: 'textContent',
        propertyValue: offer.description
      }
    },
    {
      photos: {
        condition: offer.photos,
        selector: '.popup__photos',
        property: 'append',
        propertyValue: renderPhotosList(offer.photos)
      }
    }
  ];

  const renderAdProperties = ({condition, selector, property, propertyValue}) => {
    const AdElement = AdContainer.querySelector(selector);

    if ((condition !== offer.features) && (condition !== offer.photos)) {
      AdElement[property] = propertyValue;
    } else {
      if (condition === offer.features) {
        AdElement.innerHTML = '';
        AdElement[property](propertyValue);
      } else {
        if (condition === offer.photos) {
          AdElement.innerHTML = '';
          AdElement[property](propertyValue);
        } else {
          AdElement.remove();
        }
      }
    }
  };

  AdProperties.forEach((item) => Object.values(item).map((value) => renderAdProperties(value)));
  // AdFragment.appendChild(AdContainer);
  return AdContainer;
  // };
  // mapCanvas.appendChild(AdFragment);
};

export {renderAd};
