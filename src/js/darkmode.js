import Darkmode from 'darkmode-js';

const options = {
  bottom: '32px', // default: '32px'
  right: 'unset', // default: '32px'
  left: '32px', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: '#e1deda', // default: '#fff'
  backgroundColor: '#fff', // default: '#fff'
  buttonColorDark: '#1E2125', // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: true, // default: true,
  label:
    '<svg viewBox="0 0 24 24" width="24" height="24"><g><path d="M0 0h24v24H0z" fill="none"/><path fill="#ff6b08" d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"/></g></svg>', // default: ''
  autoMatchOsTheme: true, // default: true
};

const darkmode = new Darkmode(options);
darkmode.showWidget();
