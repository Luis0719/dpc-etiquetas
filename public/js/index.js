htmlCollectionToArray(document.getElementsByClassName("tag-amount")).forEach(
  (x) => {
    x.addEventListener("click", handleTagAmountChange);
  }
);

document
  .getElementById("cb-todos")
  .addEventListener("change", handleTodosChange);

document
  .getElementById("inp-todos")
  .addEventListener("change", handleTodosChange);

function handleTagAmountChange() {
  const input = this;
  const label = document.getElementById(input.getAttribute("data-label"));
  if (+this.value > 0) {
    label.classList.add("selected");
  } else {
    label.classList.remove("selected");
  }

  handleSelectedTagsChange();
}

function handleSelectedTagsChange() {
  const totalSelected = getTotalSelectedTags();

  const totalSpan = document.getElementById("count");
  totalSpan.textContent = totalSelected;
}

function getTotalSelectedTags() {
  const tags = htmlCollectionToArray(
    document.getElementsByClassName("tag-amount")
  );

  const total = tags.reduce((total, x) => {
    return total + +x.value;
  }, 0);

  return total;
}

function handleTodosChange() {
  const tags = document.getElementsByClassName("tag-amount");
  let amount = document.getElementById("inp-todos").value;
  const cb = document.getElementById("cb-todos");

  if (!cb.checked) amount = 0;

  for (const tag of tags) {
    tag.value = amount;
  }
}
