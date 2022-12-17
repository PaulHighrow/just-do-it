const refs = {
    closeModal: document.querySelector('.close-modal'),
    backdropModal: document.querySelector('.backdrop-modal'),
};

refs.closeModal.addEventListener('click', visibilModal);

function visibilModal() {
    refs.backdropModal.classList.add('is-hidden');
}
