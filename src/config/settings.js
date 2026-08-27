export default {
	title: `Corpo Bandistico di Castelcovati APS`,
	description: `questo è il sito del Corpo Bandistico di Castelcovati.`,
	// Nessun campo `url` qui: il dominio si configura solo in astro.config.mjs
	// (variabile SITE_URL), e le pagine lo leggono da Astro.site.
	name: `CB Castelcovati aps`, // The short name of the business or brand name. Used for things like the copyright in the footer.
	// Codice fiscale dell'associazione. Per questa APS coincide con la partita
	// IVA (unico numero a 11 cifre), quindi si compila SOLO qui: le pagine che
	// lo mostrano usano l'etichetta giusta a seconda del contesto.
	// Finché resta vuoto le pagine lo dichiarano "da inserire" invece di
	// mostrare un numero inventato. Compilalo e si completano da sole.
	codiceFiscale: '02095050171',
	// true = lo stesso numero vale anche come partita IVA (etichetta unificata
	// nelle note legali). Metti false se un giorno saranno due numeri distinti.
	codiceFiscaleAnchePartitaIva: true,

	// Recapiti ufficiali dell'ente. Usati da /company/legal, dal footer e dalla
	// pagina contatti: modificarli qui, non nelle singole pagine.
	sedeLegale: 'Via Aldo Moro snc, 25030 Castelcovati (BS)',
	pec: 'corpobandistico.castelcovati@pec.it',
	email: 'corpobandistico.castelcovati@gmail.com',
	// Estremi di iscrizione al RUNTS: non ancora forniti.
	runts: '',
	enableThemeSwitcher: false,
	showPlug: false, // Disable this if you want to remove the plug from the footer. (╯°□°)╯︵ ┻━┻
};
