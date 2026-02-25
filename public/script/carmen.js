fetch('/location')
    .then(res => res.json())
    .then(data => {
        document.getElementById('location-data').innerHTML =
            '<p>' + data.country + ', ' + data.continent + '</p>' +
            '<p>' + data.city + ', ' + data.region + ', ' + data.postalCode + '</p>' +
            '<p>' + data.latitude + ', ' + data.longitude + '</p>' +
            '<p>' + data.timezone + '</p>';
        document.getElementById('flag-data').innerHTML =
            '<p> Flag Name: ' + data.flag.name + '</p>';
    });