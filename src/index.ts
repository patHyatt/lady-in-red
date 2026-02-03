export default {
	async fetch(request): Promise<Response> {
		let html_content = "";
		let html_style = `
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}
			
			body {
				padding: 3em;
				font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
				background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
				min-height: 100vh;
				color: #333;
			}
			
			h1 {
				color: #f6821f;
				text-align: center;
				margin-bottom: 2em;
				font-size: 2.5em;
				text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
				background: white;
				padding: 0.5em;
				border-radius: 10px;
			}
			
			.container {
				max-width: 800px;
				margin: 0 auto;
			}
			
			.info-section {
				background: white;
				margin: 1em 0;
				padding: 1.5em;
				border-radius: 8px;
				box-shadow: 0 2px 8px rgba(0,0,0,0.1);
				cursor: pointer;
				transition: all 0.3s ease;
				position: relative;
				overflow: hidden;
			}
			
			.info-section::before {
				content: '';
				position: absolute;
				top: 0;
				left: -100%;
				width: 100%;
				height: 100%;
				background: linear-gradient(90deg, transparent, rgba(246, 130, 31, 0.1), transparent);
				transition: left 0.5s ease;
			}
			
			.info-section:hover {
				transform: translateY(-4px) scale(1.02);
				box-shadow: 0 6px 20px rgba(0,0,0,0.15);
			}
			
			.info-section:hover::before {
				left: 100%;
			}
			
			.info-section:active {
				transform: translateY(-2px) scale(1.01);
			}
			
			.info-label {
				font-weight: 600;
				color: #667eea;
				font-size: 0.9em;
				text-transform: uppercase;
				letter-spacing: 0.5px;
				margin-bottom: 0.3em;
			}
			
			.info-value {
				font-size: 1.2em;
				color: #333;
				word-break: break-all;
			}
			
			.copied-notification {
				position: fixed;
				top: 20px;
				right: 20px;
				background: #4caf50;
				color: white;
				padding: 1em 2em;
				border-radius: 8px;
				box-shadow: 0 4px 12px rgba(0,0,0,0.2);
				display: none;
				animation: slideIn 0.3s ease;
				z-index: 1000;
			}
			
			@keyframes slideIn {
				from {
					transform: translateX(400px);
					opacity: 0;
				}
				to {
					transform: translateX(0);
					opacity: 1;
				}
			}
			
			.copied-notification.show {
				display: block;
			}
		`;

		const dataFields = [
			{ label: "Colo", value: request.cf.colo },
			{ label: "Country", value: request.cf.country },
			{ label: "City", value: request.cf.city },
			{ label: "Continent", value: request.cf.continent },
			{ label: "Latitude", value: request.cf.latitude },
			{ label: "Longitude", value: request.cf.longitude },
			{ label: "PostalCode", value: request.cf.postalCode },
			{ label: "MetroCode", value: request.cf.metroCode },
			{ label: "Region", value: request.cf.region },
			{ label: "RegionCode", value: request.cf.regionCode },
			{ label: "Timezone", value: request.cf.timezone }
		];

		dataFields.forEach(field => {
			html_content += `
				<div class="info-section" onclick="copyToClipboard('${field.label}', '${field.value}')">
					<div class="info-label">${field.label}</div>
					<div class="info-value">${field.value}</div>
				</div>
			`;
		});

		let html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>What's up doc</title>
        <style>${html_style}</style>
      </head>
      <body>
        <div class="container">
          <h1>Are you Carmen Sandiego</h1>
          ${html_content}
        </div>
        <div id="copiedNotification" class="copied-notification"></div>
        <script>
          const flag = { 
            colors: ['orange', 'white', 'green']
          };

          console.log('Colors', flag.colors);

          function copyToClipboard(label, value) {
            const text = label + ': ' + value;
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(text).then(function() {
                showNotification('Copied: ' + label);
              }).catch(function(err) {
                console.error('Failed to copy:', err);
                fallbackCopyToClipboard(text, label);
              });
            } else {
              fallbackCopyToClipboard(text, label);
            }
          }

          function fallbackCopyToClipboard(text, label) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
              document.execCommand('copy');
              showNotification('Copied: ' + label);
            } catch (err) {
              console.error('Fallback copy failed:', err);
            }
            
            document.body.removeChild(textArea);
          }

          function showNotification(message) {
            const notification = document.getElementById('copiedNotification');
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(function() {
              notification.classList.remove('show');
            }, 2000);
          }
        </script>
      </body>
      </html>`;

		return new Response(html, {
			headers: {
				"content-type": "text/html;charset=UTF-8",
				"X-API-NAME": "carmen-sandiego",
				"X-API-VERSION": "1.2"
			},
		});
	},
} satisfies ExportedHandler;
