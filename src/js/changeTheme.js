
const htmlBody = document.querySelector('.body');

const htmlCheckbox = document.querySelector('.checkbox');

htmlCheckbox.addEventListener('change', switchTheme);

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
function switchTheme(e) {
  if (e.target.checked) {
    localStorage.setItem('theme', Theme.DARK);
    document.body.classList.add(Theme.DARK);
    refs.darkFooterTheme.classList.add('black-footer');
  } else {
    localStorage.setItem('theme', Theme.LIGHT);
    document.body.classList.remove(Theme.DARK);
    refs.darkFooterTheme.classList.remove('black-footer');
  }
}
function getThemeOnPageLoad() {
  if (localStorage.getItem('theme') === Theme.DARK) {
    htmlCheckbox.checked = true;
    document.body.classList.toggle(Theme.DARK);
  }
}
getThemeOnPageLoad();
