document.getElementsByName("cb-etiquetas").forEach(x => {
  x.addEventListener('click', handleSelectedTagsChange);
});
htmlCollectionToArray(document.getElementsByClassName("tag-amount")).forEach(x => {
  x.addEventListener('click', handleTagAmountChange);
});

function handleTagAmountChange() {
  const input = this;
  const checkbox = document.getElementById(input.getAttribute('data-checkbox'));
  if (+this.value > 0) {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }

  handleSelectedTagsChange()
}

function handleSelectedTagsChange() {
  const totalSelected = getTotalSelectedTags();

  const totalSpan = document.getElementById('count');
  totalSpan.textContent = totalSelected;
}

function getTotalSelectedTags() {
  const tags = htmlCollectionToArray(document.getElementsByName("cb-etiquetas"));
  const checkedTags = tags.filter(x => x.checked);

  const amountPerTag = checkedTags.map(x => {
    return document.getElementById(`${x.id}-amount`);
  });

  const total = amountPerTag.reduce((total, x) => {
    return total + (+x.value);
  }, 0);

  return total;
}

