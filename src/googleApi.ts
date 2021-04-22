export const insertGapiScript = ():void => {
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/platform.js';
  document.body.appendChild(script);
}