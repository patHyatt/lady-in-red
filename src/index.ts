export default {
	async fetch(request, env): Promise<Response> {
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
					"X-API-NAME": "carmen-sandiego",
					"X-API-VERSION": "1.2",
				},
			});
		}

		return env.ASSETS.fetch(request)
	},
} satisfies ExportedHandler;
