// import {getSimilarAds} from './data.js';
// import {renderAds} from './ads.js';

// debugger;
// вывод 1-го объявления
// const a = getSimilarAds();
// console.log (a);
// renderAds(a);
// console.log (renderAds(a));

// ------- рабочий вариант - map.js: карта + маркер объявления из формы + маркеры объявлений с сервера, а в main.js только 1 строка - import './map.js';
// import './map.js';
// -----

// ----- новый вариант - export {renderMap, renderMainMarker, renderMarkers};
import {resetForm, disableMapFilter, disableAdForm, activateMapFilter, activateAdForm, setOnFormSubmit} from './form.js';
// import {disableMapFilter, disableAdForm, activateMapFilter, activateAdForm} from './form.js';
import {renderMap, renderMainMarker, renderMarkers} from './map.js';
import {openSuccessMessage, openErrorMessage} from './messages.js';

import {getData, sendData} from './api.js';
// import {getData} from './api.js';
import {showAlert} from './util.js';

// debugger;
disableAdForm();
disableMapFilter();
renderMap();
activateAdForm();

try {
  const data = await getData();
  renderMarkers(data);
  activateMapFilter();
} catch (err) {
  showAlert(err.message);
}

renderMainMarker();

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    resetForm();
    // renderMainMarker();
    openSuccessMessage();
  } catch {
    openErrorMessage();
  }
});
