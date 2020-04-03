function generateManifest(app_name = 'Default application name') {
  const myDynamicManifest = {
    "name": app_name,
    "short_name": "Test app",
    "scope": window.location.origin,
    "start_url": window.location.origin,
    "display": "standalone",
    "icons": [
      {
        "src":"https://via.placeholder.com/48/",
        "sizes": "48x48",
        "type": "image/png"
      },
      {
        "src": "https://via.placeholder.com/144/",
        "sizes": "144x144",
        "type": "image/png"
      },
      {
        "src": "https://via.placeholder.com/196/",
        "sizes": "196x196",
        "type": "image/png"
      }
    ]
  };
  const stringManifest = JSON.stringify(myDynamicManifest);
  const blob = new Blob([stringManifest], {type: 'application/json'});
  const manifestURL = URL.createObjectURL(blob);
  document.querySelector('#custom-manifest').setAttribute('href', manifestURL);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(
    (reg) => { console.log('SW registered!') },
    (err) => { console.log('SW not registered!', err) }
  )
}

let promptEvent;
window.addEventListener('beforeinstallprompt', (event) => {
  console.log(event);
  event.preventDefault();
  promptEvent = event;
});

window.addEventListener('DOMContentLoaded', () => {
  const generateManifestBtn = document.querySelector('#generate_manifest');
  const addAppToDesktopBtn = document.querySelector('#add_app_to_desktop');
  const input = document.querySelector('#app_name');

  generateManifest();

  generateManifestBtn.addEventListener('click', (e) => {
    e.preventDefault();
    generateManifest(input.value);
  });
  addAppToDesktopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    promptEvent.prompt();
  });

});