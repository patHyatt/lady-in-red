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

		let html_content = "";
		let html_style =
			"body{padding:1em; font-family: sans-serif;} h1{color:#a62b2b;}";

		html_content += "<p> Country: " + request.cf?.country + "</p>";
		html_content += "<p> City: " + request.cf?.city + "</p>";
		html_content += "<p> Region: " + request.cf?.region + "</p>";
		html_content += "<p> Continent: " + request.cf?.continent + "</p>";
		html_content += "<p> Latitude: " + request.cf?.latitude + "</p>";
		html_content += "<p> Longitude: " + request.cf?.longitude + "</p>";
		html_content += "<p> PostalCode: " + request.cf?.postalCode + "</p>";
		html_content += "<p> MetroCode: " + request.cf?.metroCode + "</p>";
		html_content += "<p> RegionCode: " + request.cf?.regionCode + "</p>";
		html_content += "<p> Timezone: " + request.cf?.timezone + "</p>";
		html_content += "<p> Colo: " + request.cf?.colo + "</p>";

		let html = `<!DOCTYPE html>
      <head>
        <title> Where in the world </title>
        <style> ${html_style} </style>
		<script>
			fetch('/location')
				.then(res => res.json())
				.then(data => console.log('Location:', data));
		</script>
		<script>
			const flag = { 
				colors: ['orange', 'white', 'green']
			};

			console.log('Colors', flag.colors);
			console.log('Country', flag.country.name);
		</script>
      </head>
      <body>
        <h1>Are you Carmen Sandiego</h1>
        ${html_content}
      </body>`;

		return new Response(html, {
			headers: {
				"content-type": "text/html;charset=UTF-8",
				...API_HEADERS,
			},
		});
	},
} satisfies ExportedHandler;
