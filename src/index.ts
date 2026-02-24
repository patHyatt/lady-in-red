const API_HEADERS = {
	"X-API-NAME": "carmen-sandiego",
	"X-API-VERSION": "1.2",
};

export default {
	async fetch(request): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/location") {
			const location = {
				country: request.cf?.country,
				city: request.cf?.city,
				region: request.cf?.region,
				continent: request.cf?.continent,
				latitude: request.cf?.latitude,
				longitude: request.cf?.longitude,
				postalCode: request.cf?.postalCode,
				metroCode: request.cf?.metroCode,
				regionCode: request.cf?.regionCode,
				timezone: request.cf?.timezone,
				colo: request.cf?.colo,
			};

			return new Response(JSON.stringify(location), {
				headers: {
					"content-type": "application/json;charset=UTF-8",
					...API_HEADERS,
				},
			});
		}

		let html_style =
			"body{padding:1em; font-family: sans-serif;} h1{color:#a62b2b;}";

		let html = `<!DOCTYPE html>
      <head>
        <title> Where in the world </title>
        <style> ${html_style} </style>
		<script>
			fetch('/location')
				.then(res => res.json())
				.then(data => {
					document.getElementById('location-data').innerHTML =
						'<p> Country: ' + data.country + '</p>' +
						'<p> City: ' + data.city + '</p>' +
						'<p> Region: ' + data.region + '</p>' +
						'<p> Continent: ' + data.continent + '</p>' +
						'<p> Latitude: ' + data.latitude + '</p>' +
						'<p> Longitude: ' + data.longitude + '</p>' +
						'<p> PostalCode: ' + data.postalCode + '</p>' +
						'<p> MetroCode: ' + data.metroCode + '</p>' +
						'<p> RegionCode: ' + data.regionCode + '</p>' +
						'<p> Timezone: ' + data.timezone + '</p>' +
						'<p> Colo: ' + data.colo + '</p>';
					console.log('Flag Name:', data.flag.name);
				});
		</script>
      </head>
      <body>
        <h1>Are you Carmen Sandiego</h1>
        <div id="location-data"></div>
      </body>`;

		return new Response(html, {
			headers: {
				"content-type": "text/html;charset=UTF-8",
				...API_HEADERS,
			},
		});
	},
} satisfies ExportedHandler;
