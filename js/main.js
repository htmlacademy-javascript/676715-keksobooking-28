import {resetForm, disableFiltersForm, disableAdForm, activateFiltersForm, activateAdForm, setOnFormSubmit} from './form.js';
import {renderMap, renderMainMarker, createMarkers, printFilteredMarkers} from './map.js';
import {openSuccessMessage, openErrorMessage} from './messages.js';
import {getData, sendData} from './api.js';
import {showAlert} from './util.js';

disableAdForm();
disableFiltersForm();
renderMap();
activateAdForm();
renderMainMarker();

try {
  const data = await getData();
  createMarkers(data);
  activateFiltersForm();
  printFilteredMarkers(data);
} catch (err) {
  showAlert(err.message);
}

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    resetForm();
    openSuccessMessage();
  } catch {
    openErrorMessage();
  }
});
