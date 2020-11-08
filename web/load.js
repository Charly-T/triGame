function loadedBody() {
  const totalHeight = window.innerHeight;
  const racksHeight = document.getElementsByClassName('racks-placeholder')[0].clientHeight;
  const questionHeight = document.getElementsByClassName('card-question-placeholder')[0].clientHeight;
  const heightLeft = totalHeight - racksHeight - questionHeight - 16;
  document.getElementsByClassName('solution-card-placeholder')[0].style.fontSize = Math.floor(0.0390625 * heightLeft) + 'px';
}