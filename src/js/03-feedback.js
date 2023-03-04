import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name="email"]'),
  textarea: document.querySelector('textarea[name="message"]'),
};

const { form, email, textarea } = refs;

const STORAGE_KEY = 'feedback-form-state';

let formData = {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', onFormTextContent);

populateFormTextContent();

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormTextContent(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateFormTextContent() {
  const savedInfo = localStorage.getItem(STORAGE_KEY);

  if (savedInfo) {
    console.log(savedInfo);
    formData = JSON.parse(savedInfo);

    for (let key in formData) {
      form.elements[key].value = formData[key];
    }
  }
}
