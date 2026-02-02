export default {
	async fetch(request): Promise<Response> {
		let html_content = "";
		let html_style =
			"body{padding:6em; font-family: sans-serif;} h1{color:#f6821f;}";

		html_content += "<p> Colo: " + request.cf.colo + "</p>";
		html_content += "<p> Country: " + request.cf.country + "</p>";
		html_content += "<p> City: " + request.cf.city + "</p>";
		html_content += "<p> Continent: " + request.cf.continent + "</p>";
		html_content += "<p> Latitude: " + request.cf.latitude + "</p>";
		html_content += "<p> Longitude: " + request.cf.longitude + "</p>";
		html_content += "<p> PostalCode: " + request.cf.postalCode + "</p>";
		html_content += "<p> MetroCode: " + request.cf.metroCode + "</p>";
		html_content += "<p> Region: " + request.cf.region + "</p>";
		html_content += "<p> RegionCode: " + request.cf.regionCode + "</p>";
		html_content += "<p> Timezone: " + request.cf.timezone + "</p>";

		let html = `<!DOCTYPE html>
      <head>
        <title> What's up doc </title>
        <style> ${html_style} </style>
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
			},
		});
	},
} satisfies ExportedHandler;
