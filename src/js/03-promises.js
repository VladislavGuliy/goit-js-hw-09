import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formElements = event.currentTarget.elements;
  let delay = Number(formElements.delay.value);
  const step = Number(formElements.step.value);
  const amount = Number(formElements.amount.value);

  if (delay < 0) {
    createWarningMessage(formElements.delay);
    return;
  }
  if (step < 0) {
    createWarningMessage(formElements.step);
    return;
  }
  if (amount < 0) {
    createWarningMessage(formElements.amount);
    return;
  }

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }
}

function createWarningMessage(field) {
  Notiflix.Notify.warning(
    `The field ${field.parentNode.textContent} must be a positive number`
  );
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}