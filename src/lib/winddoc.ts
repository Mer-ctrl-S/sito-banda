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

// --- Tipo di partecipazione (radio "Iscrizione" nella scheda evento WindDoc) ---
//
// WindDoc espone la scelta nel campo `tipo_iscrizione_socio`, numerato da 1
// nell'ordine in cui le opzioni compaiono nel pannello. Da non confondere con
// `iscrizione_evento`, che e' il menu a tendina accanto ("Attiva fino ad una
// data specifica") e riguarda QUANDO le iscrizioni sono aperte, non CHI puo'
// partecipare.
//
//   1  Riservato a soci con Iscrizione
//   2  Libero senza iscrizione
//   3  Libero con possibile iscrizione
//   4  Solo per soci gia' iscritti all'associazione
//
// Gli eventi creati prima che l'impostazione esistesse riportano 0: in quel
// caso non mostriamo niente, meglio il silenzio di un'etichetta inventata.
export type TipoPartecipazione = {
	/** Chi puo' partecipare. */
	accesso: 'soci' | 'libero';
	/** Etichetta pronta per l'accesso. */
	etichettaAccesso: string;
	/** true se per partecipare bisogna iscriversi all'evento. */
	iscrizioneRichiesta: boolean;
};

const TIPI_PARTECIPAZIONE: Record<string, TipoPartecipazione> = {
	'1': {
		accesso: 'soci',
		etichettaAccesso: 'Riservato ai soci',
		iscrizioneRichiesta: true,
	},
	'2': {
		accesso: 'libero',
		etichettaAccesso: 'Partecipazione libera',
		iscrizioneRichiesta: false,
	},
	'3': {
		accesso: 'libero',
		etichettaAccesso: 'Partecipazione libera',
		iscrizioneRichiesta: true,
	},
	'4': {
		accesso: 'soci',
		etichettaAccesso: 'Riservato ai soci',
		iscrizioneRichiesta: false,
	},
};

export function tipoPartecipazione(valore: unknown): TipoPartecipazione | null {
	if (valore === null || valore === undefined) return null;
	return TIPI_PARTECIPAZIONE[String(valore).trim()] ?? null;
}
