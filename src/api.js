export function getGeoLocation() {
    const url = `https://eu1.locationiq.com/v1/reverse.php?key=pk.f0109d77eeb33c1442d7d57910945385&lat=54.209988700000004&lon=-8.515426399999999&format=json`;

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(e => console.error(e));
}

export function getActivities() {
    const addressRegion = "Sligo";
    const url = `https://failteireland.azure-api.net/opendata-api/v1/activities?$filter=search.ismatch(%27${addressRegion}%27,%27address/addressRegion%27)`;

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const { results } = data;
            info = results;
        })
        .catch(e => console.error(e));
}