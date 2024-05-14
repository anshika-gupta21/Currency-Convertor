const BASE_URL =
  "https://v6.exchangerate-api.com/v6/6fe440a06c8de2e0e3137e76/pair/";
const dropdowns = document.querySelectorAll(".dropdown select");

const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const btn = document.querySelector("form button");
for (let select of dropdowns) {
  for (curr in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = curr;
    newOption.value = curr;
    if (select.name === "from" && curr === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && curr === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
    select.addEventListener("change", (eve) => {
      updateFlag(eve.target);
    });
  }
}

const updateFlag = (ele) => {
  let curr = ele.value;
  let code = countryList[curr];
  let newsrc = `https://flagsapi.com/${code}/flat/64.png`;
  let img = ele.parentElement.querySelector("img");
  img.src = newsrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let val = amount.value;
  if (val === "" || isNaN(val) || val < 1) {
    val = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}${fromcurr.value}/${tocurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.conversion_rate;
  let final = val * rate;
  msg.innerText = `${val} ${fromcurr.value} = ${final} ${tocurr.value}`;
});
