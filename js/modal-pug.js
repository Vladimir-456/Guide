const callMoadlBtn = document.querySelector('#openCallbackModal');
const profileModaleBtn = document.querySelector('#openProfileModal');
const profileFormOverlay = document.querySelector('#profile-modal');
const profileFormCloseBtn = document.querySelector('.profile-modal__overlay');

profileModaleBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    profileFormOverlay.display = 'block';
});

callMoadlBtn?.addEventListener('click', (e) => {
    e.preventDefault();
});