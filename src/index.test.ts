import { SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';

describe('worker', () => {
	it('GET / returns HTML with X-API-NAME and X-API-VERSION headers', async () => {
		const response = await SELF.fetch('http://example.com/');

		expect(response.status).toBe(200);
		expect(response.headers.get('content-type')).toContain('text/html');
		expect(response.headers.get('X-API-NAME')).toBe('carmen-sandiego');
		expect(response.headers.get('X-API-VERSION')).toBe('1.2');

		const text = await response.text();
		expect(text).toContain("fetch('/location')");
	});

	it('GET /location returns JSON with X-API-NAME and X-API-VERSION headers', async () => {
		const response = await SELF.fetch('http://example.com/location');

		expect(response.status).toBe(200);
		expect(response.headers.get('content-type')).toContain('application/json');
		expect(response.headers.get('X-API-NAME')).toBe('carmen-sandiego');
		expect(response.headers.get('X-API-VERSION')).toBe('1.2');

		const json = await response.json();
		expect(json).toBeTypeOf('object');
	});
});
