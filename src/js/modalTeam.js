const refs = {
  openModalBtn: document.querySelector('.team__link'),
  closeModalBtn: document.querySelector('.modal__close-btn'),
  modalTeam: document.querySelector('.backdrop__team'),
};

refs.openModalBtn.addEventListener('click', toggleModal); // Відкриває модалку
refs.closeModalBtn.addEventListener('click', toggleModal); // Закриває модалку

function toggleModal() {
  refs.modalTeam.classList.toggle('is-hidden');
}
