const refs = {
  openModalBtn: document.querySelector('.team__link'),
  closeModalBtn: document.querySelector('.modal__close-btn'),
  modalTeam: document.querySelector('.backdrop__team'),
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  refs.modalTeam.classList.toggle('is-hidden');
}

window.addEventListener('click', function (evt) {
  if (evt.target === document.querySelector('.backdrop__team')) {
    toggleModal();
  }
});
