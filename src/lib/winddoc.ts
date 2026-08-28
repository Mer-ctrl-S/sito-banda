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
// WindDoc espone la scelta nel campo `tipo_iscrizione_socio`, numerato da 0
// nell'ordine in cui le opzioni compaiono nel pannello. Da non confondere con
// `iscrizione_evento`, che e' il menu a tendina accanto ("Attiva fino ad una
// data specifica") e riguarda QUANDO le iscrizioni sono aperte, non CHI puo'
// partecipare.
//
//   0  Riservato a soci con Iscrizione
//   1  Libero senza iscrizione
//   2  Libero con possibile iscrizione
//   3  Solo per soci gia' iscritti all'associazione
//
// Attenzione: 0 e' anche il valore che hanno gli eventi in cui il radio non e'
// mai stato toccato, quindi non e' distinguibile da una scelta esplicita della
// prima voce. Se un evento pubblico si presenta come riservato ai soci, la
// causa e' questa: basta impostare il radio in WindDoc.
export type TipoPartecipazione = {
	/** Chi puo' partecipare. */
	accesso: 'soci' | 'libero';
	/** Etichetta pronta per l'accesso. */
	etichettaAccesso: string;
	/** true se per partecipare bisogna iscriversi all'evento. */
	iscrizioneRichiesta: boolean;
};

const TIPI_PARTECIPAZIONE: Record<string, TipoPartecipazione> = {
	'0': {
		accesso: 'soci',
		etichettaAccesso: 'Riservato ai soci',
		iscrizioneRichiesta: true,
	},
	'1': {
		accesso: 'libero',
		etichettaAccesso: 'Partecipazione libera',
		iscrizioneRichiesta: false,
	},
	'2': {
		accesso: 'libero',
		etichettaAccesso: 'Partecipazione libera',
		iscrizioneRichiesta: true,
	},
	'3': {
		accesso: 'soci',
		etichettaAccesso: 'Riservato ai soci',
		iscrizioneRichiesta: false,
	},
};

export function tipoPartecipazione(valore: unknown): TipoPartecipazione | null {
	if (valore === null || valore === undefined) return null;
	return TIPI_PARTECIPAZIONE[String(valore).trim()] ?? null;
}

// --- Iscrizione all'evento ---
//
// `link_form` e' il link pubblico al modulo d'iscrizione, diverso per ogni
// evento (verificato: risponde 200 senza login e si intitola "Iscrizione
// evento"). Lo espongono sia la lista sia il dettaglio.
//
// `data_iscrizione_evento` e' il termine ultimo, quando impostato.
export type StatoIscrizione =
	| { stato: 'aperta'; link: string; scadenza: Date | null }
	| { stato: 'chiusa'; scadenza: Date }
	| { stato: 'assente' };

/**
 * Decide se proporre il modulo d'iscrizione per un evento.
 *
 * Volutamente prudente: propone il link solo se l'evento e' futuro, se il tipo
 * di partecipazione dice che l'iscrizione serve, e se WindDoc ha davvero dato
 * un link. Non prova a interpretare `iscrizione_evento`, i cui valori non sono
 * documentati: l'unico vincolo temporale che applica e' la scadenza esplicita.
 */
export function statoIscrizione(
	evento: {
		link_form?: unknown;
		data_iscrizione_evento?: unknown;
		tipo_iscrizione_socio?: unknown;
	},
	dataEvento: Date | null,
	adesso: Date
): StatoIscrizione {
	const tipo = tipoPartecipazione(evento.tipo_iscrizione_socio);
	if (!tipo?.iscrizioneRichiesta) return { stato: 'assente' };

	// Su un evento gia' passato non ha senso proporre l'iscrizione.
	if (!dataEvento || dataEvento < adesso) return { stato: 'assente' };

	const link =
		typeof evento.link_form === 'string' ? evento.link_form.trim() : '';
	if (!link.startsWith('https://')) return { stato: 'assente' };

	const grezza = evento.data_iscrizione_evento;
	const scadenza =
		typeof grezza === 'string' && grezza.trim()
			? new Date(grezza.replace(' ', 'T'))
			: null;
	const scadenzaValida =
		scadenza && !Number.isNaN(scadenza.getTime()) ? scadenza : null;

	if (scadenzaValida && scadenzaValida < adesso) {
		return { stato: 'chiusa', scadenza: scadenzaValida };
	}

	return { stato: 'aperta', link, scadenza: scadenzaValida };
}
