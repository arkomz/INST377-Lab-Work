function mapInit() {
  var mymap = L.map('mapid').setView([51.505, -0.09], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiYXJrb216OTEiLCJhIjoiY2t1c3RhaGFpNWk2cTJucWpzYno1cnZ6YiJ9.uw81Ywj5jrcHVHOD2NdNpw'
  }).addTo(mymap);
  return mymap
}
mapInit()


async function windowActions() {

    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const restaurants = await request.json
    const request = await fetch(endpoint)
    const mymap = mapInit()
  
    
    
    function findMatches(wordToMatch, restaurants) {
      return restaurants.filter(place => {
    
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.zip.match(regex)
      });
    }

    
    function displayMatches(event) {
      const matchArray = findMatches(event.target.value, restaurants);
      const html = matchArray.map(place => {
        const regex = new RegExp(event.target.value, 'gi');
        const restaurantName = place.name.replace(regex, `<span class="hl">${event.target.value}</span>`);
        const zipName = place.zip.replace(regex, `<span class="hl">${event.target.value}</span>`);
        return `
          <li>
            <span class="name">${restaurantName}</span>
            <span class="zip">${zipName}</span>
          </li>
        `;
      }).join('');
      suggestions.innerHTML = html;
    }
    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');
    
    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });
    
    }
    window.onload = windowActions;