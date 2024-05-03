const form = document.getElementById("form");
const resultField = document.getElementById("result");
const input = document.getElementById("input");
const error = document.getElementById("error");

const showError = () => {
  error.textContent = "Sorry, something went wrong. Please try again later.";
};
const removeError = () => {
  error.textContent = "";
};
const isDataValid = (data) => {
  return data?.rates?.length > 0 && data.rates[0].mid;
};

const getCurrency = async () => {
  const amount = form.amount.value;
  const currency = form.currency.value;
  const URL = `https://api.nbp.pl/api/exchangerates/rates/a/${currency}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    if (!isDataValid(data)) {
      showError();
      return;
    }
    removeError();

    const rate = data.rates[0].mid;
    const result = (amount * rate).toFixed(2);
    resultField.textContent = `${result}`;
  } catch {
    showError();
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getCurrency();
});

input.addEventListener("input", () => {
  if (input.value === "") {
    resultField.textContent = "";
  }
});
