/*
  Fonte unica dei dati dei corsi.
  La usano: la pagina /scuola/corsi (grafico + modal + elenco) e le pagine di
  dettaglio /scuola/corsi/[corso].

  DA COMPILARE: i campi valorizzati con DA_CONFERMARE sono segnaposto. Compilali
  qui e si aggiornano ovunque: modal, elenco e pagina di dettaglio. Finche' restano
  segnaposto il sito li mostra dichiaratamente come "da confermare", non li nasconde
  e non inventa nulla al loro posto.

  Le descrizioni parlano dello strumento, non della scuola: nessun dato
  sull'associazione (durata, livelli, numero allievi) è stato dedotto.
*/

export const DA_CONFERMARE = '— da confermare';

/* Definizioni grezze: NON esportate. Prive di href e campi organizzativi.
   Le pagine devono usare gli elenchi arricchiti in fondo al file. */
const definizioniStrumento = [
	{
		slug: 'clarinetto',
		nome: 'Clarinetto',
		famiglia: 'legni',
		descrizione:
			'Strumento ad ancia semplice, è la voce più numerosa della banda: copre un’estensione molto ampia e passa con naturalezza dalla melodia all’accompagnamento.',
	},
	{
		slug: 'clarinetto-basso',
		nome: 'Clarinetto basso',
		famiglia: 'legni',
		descrizione:
			'Un clarinetto più grande e più grave, dal timbro caldo e rotondo. Sostiene l’armonia della sezione dei legni e dialoga spesso con i bassi.',
	},
	{
		slug: 'oboe',
		nome: 'Oboe',
		famiglia: 'legni',
		descrizione:
			'Ad ancia doppia, ha un timbro nitido e penetrante che si riconosce subito dentro l’insieme. Spesso porta i temi più cantabili.',
	},
	{
		slug: 'fagotto',
		nome: 'Fagotto',
		famiglia: 'legni',
		descrizione:
			'Il basso della famiglia ad ancia doppia. Voce grave e agile insieme, usata sia per sostenere l’armonia sia per passaggi solistici molto caratterizzati.',
	},
	{
		slug: 'flauto',
		nome: 'Flauto traverso',
		famiglia: 'legni',
		descrizione:
			'Si suona di traverso e senza ancia: il suono nasce dal soffio sul bordo del foro. Timbro chiaro, molto presente nel registro acuto della banda.',
	},
	{
		slug: 'ottavino',
		nome: 'Ottavino',
		famiglia: 'legni',
		descrizione:
			'Un flauto più piccolo che suona un’ottava sopra. È la voce più acuta della banda e si sente distintamente anche nei passaggi più pieni.',
	},
	{
		slug: 'corno',
		nome: 'Corno francese',
		famiglia: 'ottoni',
		descrizione:
			'Ottone dal timbro morbido, a metà strada fra legni e ottoni. Lega le sezioni fra loro e dona profondità all’armonia.',
	},
	{
		slug: 'tromba',
		nome: 'Tromba',
		famiglia: 'ottoni',
		descrizione:
			'Voce brillante e diretta, porta i temi principali e gli attacchi più decisi. È lo strumento che si riconosce più facilmente in una marcia.',
	},
	{
		slug: 'trombone',
		nome: 'Trombone',
		famiglia: 'ottoni',
		descrizione:
			'Unico ottone con la coulisse: cambia altezza facendo scorrere il tubo. Timbro pieno, capace di glissati che nessun altro strumento fa allo stesso modo.',
	},
	{
		slug: 'sax-contralto',
		nome: 'Sax contralto',
		famiglia: 'legni',
		descrizione:
			'Ottone per costruzione ma legno per il modo di produrre il suono, grazie all’ancia semplice. Timbro espressivo, molto versatile.',
	},
	{
		slug: 'sax-tenore',
		nome: 'Sax tenore',
		famiglia: 'legni',
		descrizione:
			'Piu’ grave del contralto, ha un suono corposo che si presta sia alle parti cantabili sia al sostegno ritmico dell’insieme.',
	},
	{
		slug: 'sax-baritono',
		nome: 'Sax baritono',
		famiglia: 'legni',
		descrizione:
			'Il più grave dei sassofoni usati in banda. Fa da ponte fra i legni e i bassi, con un timbro pieno e riconoscibile.',
	},
	{
		slug: 'percussioni',
		nome: 'Percussioni',
		famiglia: 'percussioni',
		descrizione:
			'Non un solo strumento ma una famiglia: tamburo, grancassa, piatti, timpani e strumenti a tastiera come xilofono e campane. Tengono il tempo e colorano l’insieme.',
	},
	{
		slug: 'tuba',
		nome: 'Tuba',
		famiglia: 'ottoni',
		descrizione:
			'Il basso degli ottoni e fondamento armonico di tutta la banda. Sostiene l’intero organico dal registro più grave.',
	},
	{
		slug: 'euphonium',
		nome: 'Euphonium',
		famiglia: 'ottoni',
		descrizione:
			'Detto anche flicorno baritono, ha un timbro caldo e cantabile. Nella banda ha spesso parti solistiche di grande respiro.',
	},
];

const definizioniCollettive = [
	{
		slug: 'musica-insieme',
		nome: 'Musica d’insieme',
		famiglia: 'collettivo',
		descrizione:
			'Si suona in gruppo: si impara ad ascoltare gli altri, ad accordarsi, a seguire il direttore e a tenere la propria parte dentro un insieme. È il passaggio fra lo studio individuale e il suonare in banda.',
	},
	{
		slug: 'teoria-solfeggio',
		nome: 'Teoria e solfeggio',
		famiglia: 'collettivo',
		descrizione:
			'Leggere la musica: note, ritmo, tempo, misura e i primi elementi di teoria. È la base che rende più rapido e consapevole lo studio di qualunque strumento.',
	},
];

/*
  Campi organizzativi, per corso.

  PREZZI: le lezioni sono da 30, 45 o 60 minuti e il prezzo cambia con la
  durata. Sono importi MENSILI. Compila `prezzi` con i tre valori in euro,
  numeri semplici (niente simbolo, niente stringhe): la formattazione italiana
  la fa la pagina. Un corso senza `prezzi` mostra "da confermare" e il
  selettore della scala resta disattivato, invece di esporre cifre inventate.

  Esempio completo:

  clarinetto: {
      insegnante: 'Nome Cognome',
      orari: 'Martedì 17:00 – 18:00',
      eta: 'Dagli 8 anni',
      prezzi: { 30: 45, 45: 62, 60: 80 },
  },
*/
export const datiOrganizzativi = {};

/** Durate disponibili, in ordine. La prima è quella mostrata di default. */
export const DURATE = [
	{ minuti: 30, etichetta: '30 minuti' },
	{ minuti: 45, etichetta: '45 minuti' },
	{ minuti: 60, etichetta: '1 ora' },
];

export const DURATA_PREDEFINITA = DURATE[0].minuti;

/** Sconto riservato a chi suona anche in banda. */
export const SCONTO_BANDA = 0.1;

/** Periodo a cui si riferisce l'importo, usato nelle etichette. */
export const PERIODO_PREZZO = 'al mese';

const campiDefault = {
	insegnante: DA_CONFERMARE,
	orari: DA_CONFERMARE,
	eta: DA_CONFERMARE,
	prezzi: null,
};

/** Tutti i corsi, arricchiti con i campi organizzativi e gli asset. */
export const corsi = [...definizioniStrumento, ...definizioniCollettive].map(corso => {
	const dati = { ...campiDefault, ...corso, ...(datiOrganizzativi[corso.slug] ?? {}) };
	// Un listino è valido solo se ha tutte e tre le durate: uno parziale
	// mostrerebbe un buco proprio nella tabella di confronto.
	const prezziCompleti =
		dati.prezzi && DURATE.every(d => typeof dati.prezzi[d.minuti] === 'number');
	return {
		...dati,
		prezzi: prezziCompleti ? dati.prezzi : null,
		href: `/scuola/corsi/${corso.slug}`,
		immagine:
			corso.famiglia === 'collettivo'
				? null
				: `/assets/images/strumenti/${corso.slug}.webp`,
	};
});

export const corsiPerSlug = Object.fromEntries(corsi.map(c => [c.slug, c]));

/** Corsi di strumento, con href e campi organizzativi. */
export const corsiStrumento = corsi.filter(c => c.famiglia !== 'collettivo');

/** Corsi non legati a uno strumento, con href e campi organizzativi. */
export const corsiCollettivi = corsi.filter(c => c.famiglia === 'collettivo');

/** True se il campo è ancora un segnaposto: la UI lo marca invece di nasconderlo. */
export const daConfermare = valore => valore === DA_CONFERMARE;

/*
  Importo in euro secondo la convenzione italiana: 40,50 € — non € 40.50.
  Gli interi restano senza decimali ("45 €"), i non interi ne prendono due
  ("40,50 €", non "40,5 €" che su un prezzo si legge male).
*/
const formatoIntero = new Intl.NumberFormat('it-IT', {
	style: 'currency',
	currency: 'EUR',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
});
const formatoDecimale = new Intl.NumberFormat('it-IT', {
	style: 'currency',
	currency: 'EUR',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

export const formattaPrezzo = valore => {
	if (typeof valore !== 'number') return DA_CONFERMARE;
	return Number.isInteger(valore)
		? formatoIntero.format(valore)
		: formatoDecimale.format(valore);
};

/** Applica lo sconto banda e arrotonda ai centesimi. */
export const conSconto = valore =>
	typeof valore === 'number' ? Math.round(valore * (1 - SCONTO_BANDA) * 100) / 100 : null;

/** Righe pronte per la tabella della scala prezzi. */
export const scalaPrezzi = corso =>
	DURATE.map(d => ({
		minuti: d.minuti,
		etichetta: d.etichetta,
		pieno: corso.prezzi ? corso.prezzi[d.minuti] : null,
		scontato: corso.prezzi ? conSconto(corso.prezzi[d.minuti]) : null,
	}));

export const etichettaFamiglia = {
	legni: 'Legni',
	ottoni: 'Ottoni',
	percussioni: 'Percussioni',
	collettivo: 'Corso collettivo',
};
