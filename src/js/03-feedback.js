import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onFormInput, 500));

const STORAGE_KEY = 'feedback-form-state';
const formData = { email: '', message: '' };
populateForm();

function onFormInput(e) {
  const savedLocalStorage = getItemLocalStorage();
  if (savedLocalStorage) {
    if (savedLocalStorage.email) {
      formData.email = savedLocalStorage.email;
    }
    if (savedLocalStorage.message) {
      formData.message = savedLocalStorage.message;
    }
  }

  formData[e.target.name] = e.target.value;

  setItemLocalStorage(formData);
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log(getItemLocalStorage());
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateForm() {
  const savedData = getItemLocalStorage();
  if (!savedData) {
    return;
  }
  formRef[0].value = savedData.email ? savedData.email : '';
  formRef[1].value = savedData.message ? savedData.message : '';
}

function setItemLocalStorage(obj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

function getItemLocalStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}
