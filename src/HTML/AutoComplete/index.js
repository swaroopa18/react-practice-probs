import { getWordBy, debounce } from "./utils.js";

const input = document.getElementById("search-box");
const suggestionBox = document.getElementById("suggestion-wrapper");

const resetState = () => {
  suggestionBox.classList.remove("suggestion-visible");
};

const renderDropdown = (list) => {
  const suggFragment = document.createDocumentFragment();
  list.forEach((item) => {
    const el = document.createElement("div");
    el.innerHTML = item;
    el.classList.add("dropdown-item");
    suggFragment.appendChild(el);
  });

  suggestionBox.innerHTML = "";
  suggestionBox.appendChild(suggFragment);
};

const handleSearch = async (value) => {
  const result = await getWordBy(value);
  console.log("----result", result);

  if (result.length) {
    suggestionBox.classList.add("suggestion-visible");
    renderDropdown(result);
  } else {
    resetState();
  }
};

const handleInputChange = (e) => {
  const value = e.target.value;
  if (value) {
    handleSearch(value);
  } else {
    resetState();
  }
};

(() => {
  input.addEventListener("input", debounce(handleInputChange));
})();
