// Map setup
const centerCoordinates = [55.62533433976489, 12.573634292952859];
const map = L.map('map').setView(centerCoordinates, 18);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Dette er en hovedopgave'
}).addTo(map);

// bounds til overlay
const bounds = [
    [55.624534, 12.572634], // Southwest corner
    [55.626134, 12.574634]  // Northeast corner
];

//  image overlays 
const overlays = {
    "1": L.imageOverlay('src/assets/1.png', bounds),
    "2": L.imageOverlay('src/assets/2.png', bounds),
    "3": L.imageOverlay('src/assets/3.png', bounds)
};


const markerLayers = {
    "1": L.layerGroup(),
    "2": L.layerGroup(),
    "3": L.layerGroup()
};

//generering af random markers på kortet til demo
function generateRandomMarkers(layer, count) {
    for (let i = 0; i < count; i++) {
        const lat = centerCoordinates[0] + (Math.random() - 0.5) * 0.0005; 
        const lng = centerCoordinates[1] + (Math.random() - 0.5) * 0.0005;
        const marker = L.marker([lat, lng]).bindPopup(`Etage marker ${i + 1}`);
        layer.addLayer(marker);
    }
}

generateRandomMarkers(markerLayers["1"], 5); 
generateRandomMarkers(markerLayers["2"], 5); 
generateRandomMarkers(markerLayers["3"], 5); 

overlays["1"].addTo(map);
markerLayers["1"].addTo(map);

const floorSelect = document.getElementById('floor-select');

floorSelect.addEventListener('change', event => {
    const selectedFloor = event.target.value;

    //bruger lokation
    Object.values(overlays).forEach(overlay => map.removeLayer(overlay));
    Object.values(markerLayers).forEach(layer => map.removeLayer(layer));

    overlays[selectedFloor].addTo(map);
    markerLayers[selectedFloor].addTo(map);
});

function checkLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // beregning i meter til center af arena
            const distance = getDistanceFromLatLonInMeters(
                centerCoordinates[0], centerCoordinates[1], userLat, userLng
            );

            if (distance > 100) {
                document.getElementById('message').innerText = 'Du er ikke i arenaen';
                document.getElementById('message').style.display = 'block';

                // tilføj bruger på kortet
                L.marker([userLat, userLng]).addTo(map)
                    .bindPopup('Din placering').openPopup();
            } else {
                document.getElementById('message').style.display = 'none';
            }
        }, error => {
            alert('Kunne ikke få adgang til din placering. Sørg for, at din GPS er aktiveret.');
        });
    } else {
        alert('Geolocation er ikke understøttet af din browser.');
    }
}

// funktion for mellem 2 lokationer i meter
function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Radius 
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon1 - lon2);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

//  location check 
document.addEventListener('DOMContentLoaded', checkLocation);