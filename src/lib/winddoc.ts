// src/lib/winddoc.ts

export const WINDDOC_URL = 'https://app.winddoc.com/v1/api_json.php';

// In produzione sposta questi su .env e importali da import.meta.env
export const TOKEN_APP =
	'bffb341ae63fbce4a510d123d4ae8af0b2b04a5ae0ecd58cd3a747f3161af24d';
export const TOKEN_KEY =
	'7a0b2b9dc333a2fb235953e17f36d78a9532d46fc2a2ffae1a1464dbd81efe8d';

export function toFormUrlEncoded(data: Record<string, any>): string {
	const params = new URLSearchParams();

	const build = (prefix: string, value: any) => {
		if (value === null || value === undefined) return;

		if (typeof value === 'object' && !Array.isArray(value)) {
			Object.entries(value).forEach(([k, v]) => {
				build(`${prefix}[${k}]`, v);
			});
		} else {
			params.append(prefix, String(value));
		}
	};

	Object.entries(data).forEach(([key, value]) => {
		if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			Object.entries(value).forEach(([k, v]) => {
				build(`${key}[${k}]`, v);
			});
		} else {
			params.append(key, String(value));
		}
	});

	return params.toString();
}
