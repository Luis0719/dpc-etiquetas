htmlCollectionToArray(document.getElementsByClassName("tag-amount")).forEach(
  (x) => {
    x.addEventListener("click", handleTagAmountChange);
  }
);

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
