// src/lib/winddoc.ts

export const WINDDOC_URL = 'https://app.winddoc.com/v1/api_json.php';

// I token vivono in `.env` (non versionato, vedi `.env.example`). Vengono letti
// solo qui e usati nel frontmatter delle pagine, quindi restano lato build e non
// finiscono mai nel bundle inviato al browser: NON rinominarli con prefisso
// PUBLIC_, che li esporrebbe al client.
function requireEnv(name: string): string {
	const value = import.meta.env[name];
	if (!value) {
		throw new Error(
			`Variabile d'ambiente ${name} mancante: copia .env.example in .env e inserisci i token WindDoc.`
		);
	}
	return value;
}

export const TOKEN_APP = requireEnv('WINDDOC_TOKEN_APP');
export const TOKEN_KEY = requireEnv('WINDDOC_TOKEN_KEY');

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
