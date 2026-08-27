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

/*
  Strumenti insegnati dalla scuola ma che non fanno parte dell'organico della
  banda: non compaiono nel grafico della disposizione, hanno una sezione loro.
*/
const definizioniAltri = [
	{
		slug: 'pianoforte',
		nome: 'Pianoforte',
		famiglia: 'altri',
		descrizione:
			'Si suona con entrambe le mani su una tastiera di 88 tasti: melodia e accompagnamento insieme, senza bisogno di altri strumenti. È anche il modo più diretto per vedere come funziona l’armonia.',
	},
	{
		slug: 'chitarra-classica',
		nome: 'Chitarra classica',
		famiglia: 'altri',
		descrizione:
			'Corde in nylon pizzicate con le dita, senza amplificazione. È la strada più solida per imparare la tecnica della mano destra e leggere la musica sullo strumento.',
	},
	{
		slug: 'chitarra-elettrica',
		nome: 'Chitarra elettrica',
		famiglia: 'altri',
		descrizione:
			'Corde in acciaio e amplificazione: il suono si costruisce anche con l’amplificatore e gli effetti. Repertorio rock, pop e blues, fra accordi, riff e assoli.',
	},
	{
		slug: 'basso-elettrico',
		nome: 'Basso elettrico',
		famiglia: 'altri',
		descrizione:
			'Quattro corde gravi che tengono insieme ritmo e armonia: è il ponte fra la batteria e gli strumenti melodici, la parte che si sente più con il corpo che con l’orecchio.',
	},
	{
		slug: 'batteria',
		nome: 'Batteria',
		famiglia: 'altri',
		descrizione:
			'Un insieme di tamburi e piatti suonati con mani e piedi insieme. Si lavora sull’indipendenza degli arti e sulla tenuta del tempo, che è il mestiere di chi sta dietro al gruppo.',
	},
	{
		slug: 'canto-moderno',
		nome: 'Canto moderno',
		famiglia: 'altri',
		descrizione:
			'Si lavora sulla voce come strumento: respirazione, intonazione, appoggio e interpretazione, sul repertorio pop, rock e cantautorale.',
	},
	{
		slug: 'violino',
		nome: 'Violino',
		famiglia: 'altri',
		descrizione:
			'Il più acuto degli archi: il suono nasce dall’arco sulle corde e non ha tasti, quindi l’intonazione la costruisce chi suona. Timbro molto espressivo, vicino alla voce umana.',
	},
];

const definizioniCollettive = [
	{
		slug: 'propedeutico',
		nome: 'Propedeutico e solfeggio',
		famiglia: 'collettivo',
		descrizione:
			'Leggere e capire la musica: note, ritmo, tempo, misura e i primi elementi di teoria, in piccoli gruppi formati per grado di preparazione. È il primo passo per chi non suona ancora, e la base che rende più rapido lo studio di qualunque strumento.',
	},
	{
		slug: 'musica-insieme',
		nome: 'Musica d’insieme',
		famiglia: 'collettivo',
		descrizione:
			'Si suona in gruppo: si impara ad ascoltare gli altri, ad accordarsi, a seguire il direttore e a tenere la propria parte dentro un insieme. È il passaggio fra lo studio individuale e il suonare in banda.',
	},
	{
		slug: 'laboratorio-percussioni',
		nome: 'Laboratorio di percussioni',
		famiglia: 'collettivo',
		descrizione:
			'Un percorso collettivo dedicato agli strumenti a percussione: ritmo, coordinazione e suono d’insieme, dai tamburi ai piatti agli strumenti a tastiera.',
	},
	{
		slug: 'perfezionamento',
		nome: 'Perfezionamento',
		famiglia: 'collettivo',
		descrizione:
			'Un percorso per chi punta all’ammissione a una scuola musicale statale o a un conservatorio: si lavora sul programma d’esame e sulla preparazione tecnica richiesta.',
	},
];

/*
  Campi organizzativi e listini, dal prospetto ufficiale della scuola.

  I prezzi sono QUOTE ANNUALI su 8 mesi. Il mensile non si scrive: si ricava
  dividendo per MESI_CORSO. Nel prospetto i due valori coincidono sempre
  (440/8 = 55, 520/8 = 65, 640/8 = 80...), quindi tenerne uno solo evita che
  in futuro divergano.

  - Corsi di strumento: `prezzi` con le tre durate della lezione settimanale.
  - Corsi collettivi: `quotaAnnuale`, una cifra sola, e `inclusoConStrumento`
    per chi frequenta già un corso di strumento.
*/

/** Mesi di lezione in un anno di corso: il prospetto parla di 8 mesi. */
export const MESI_CORSO = 8;

/** Listino degli strumenti dell'organico della banda. */
const LISTINO_BANDA = { 30: 440, 45: 520, 60: 640 };

/** Listino di pianoforte, chitarre, basso, batteria, canto e violino. */
const LISTINO_ALTRI = { 30: 520, 45: 600, 60: 720 };

export const datiOrganizzativi = {
	propedeutico: { insegnante: 'Gianfranco Scalvini', eta: 'Dai 7 anni' },
	pianoforte: { insegnante: 'Gabriele Moraschi' },
	'chitarra-elettrica': { insegnante: 'Michele Belleri' },
	'basso-elettrico': { insegnante: 'Michele Belleri' },
};

/** Età minima per i corsi di strumento e canto, dal regolamento. */
const ETA_STRUMENTO = 'Dai 10 anni, o dopo il corso propedeutico';

/** Quote dei corsi collettivi: gratuiti per chi segue già uno strumento. */
const QUOTE_COLLETTIVE = {
	propedeutico: 200,
	'musica-insieme': 80,
	'laboratorio-percussioni': 200,
};


export const DURATE = [
	{ minuti: 30, etichetta: '30 minuti' },
	{ minuti: 45, etichetta: '45 minuti' },
	{ minuti: 60, etichetta: '1 ora' },
];

export const DURATA_PREDEFINITA = DURATE[0].minuti;

/*
  Riduzioni dal regolamento del 1 settembre 2025. Sono importi FISSI sulla
  quota annuale, non percentuali: 120 € l'anno corrispondono esattamente a
  15 € al mese sugli 8 mesi di corso.
*/
export const SCONTO_BANDA_ANNUO = 120;
export const SCONTO_FRATELLI_ANNUO = 40;

/** Contributo associativo annuale, comprensivo di assicurazione RC e infortuni. */
export const QUOTA_ASSOCIATIVA = 10;

/** Periodo a cui si riferisce l'importo, usato nelle etichette. */
export const PERIODO_PREZZO = 'al mese';

const campiDefault = {
	insegnante: DA_CONFERMARE,
	orari: DA_CONFERMARE,
	eta: DA_CONFERMARE,
};

/** Listino che spetta a un corso in base alla famiglia. */
const listinoDi = famiglia => {
	if (['legni', 'ottoni', 'percussioni'].includes(famiglia)) return LISTINO_BANDA;
	if (famiglia === 'altri') return LISTINO_ALTRI;
	return null; // i collettivi hanno una quota unica, non una scala
};

/** Tutti i corsi, arricchiti con i campi organizzativi e gli asset. */
/*
  Slug che hanno una foto in public/assets/images/strumenti/. Elenco esplicito:
  costruire il percorso a partire dallo slug faceva chiedere al browser file
  inesistenti per i corsi senza foto. Aggiungi qui lo slug quando arriva l'immagine.
*/
const SLUG_CON_FOTO = new Set([
	'clarinetto', 'clarinetto-basso', 'oboe', 'fagotto', 'flauto', 'ottavino',
	'corno', 'tromba', 'trombone', 'sax-contralto', 'sax-tenore', 'sax-baritono',
	'percussioni', 'tuba', 'euphonium',
]);

export const corsi = [
	...definizioniStrumento,
	...definizioniAltri,
	...definizioniCollettive,
].map(corso => {
	const dati = { ...campiDefault, ...corso, ...(datiOrganizzativi[corso.slug] ?? {}) };
	const listino = dati.prezzi ?? listinoDi(corso.famiglia);
	// Un listino è valido solo se ha tutte e tre le durate: uno parziale
	// mostrerebbe un buco proprio nella tabella di confronto.
	const prezziCompleti =
		listino && DURATE.every(d => typeof listino[d.minuti] === 'number');
	const quota = QUOTE_COLLETTIVE[corso.slug] ?? null;
	// I corsi di strumento hanno tutti la stessa età minima: non va ripetuta
	// venti volte nei dati organizzativi.
	const eta =
		dati.eta !== DA_CONFERMARE
			? dati.eta
			: prezziCompleti
				? ETA_STRUMENTO
				: DA_CONFERMARE;
	return {
		...dati,
		eta,
		prezzi: prezziCompleti ? listino : null,
		quotaAnnuale: quota,
		// quota propria ma gratuita per chi segue già uno strumento
		inclusoConStrumento: quota !== null,

		href: `/scuola/corsi/${corso.slug}`,
		immagine: SLUG_CON_FOTO.has(corso.slug)
			? `/assets/images/strumenti/${corso.slug}.webp`
			: null,
	};
});

export const corsiPerSlug = Object.fromEntries(corsi.map(c => [c.slug, c]));

/** Strumenti dell'organico della banda: sono quelli del grafico. */
export const corsiStrumento = corsi.filter(c =>
	['legni', 'ottoni', 'percussioni'].includes(c.famiglia)
);

/** Strumenti insegnati dalla scuola ma fuori dall'organico della banda. */
export const corsiAltri = corsi.filter(c => c.famiglia === 'altri');

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

/** Rata mensile ricavata dalla quota annuale: il prospetto conta 8 mesi. */
export const alMese = annuale =>
	typeof annuale === 'number' ? Math.round((annuale / MESI_CORSO) * 100) / 100 : null;

/** Applica lo sconto banda alla quota annuale, senza mai scendere sotto zero. */
export const conSconto = annuale =>
	typeof annuale === 'number' ? Math.max(0, annuale - SCONTO_BANDA_ANNUO) : null;

/** Righe pronte per la tabella della scala prezzi. */
export const scalaPrezzi = corso =>
	DURATE.map(d => {
		const anno = corso.prezzi ? corso.prezzi[d.minuti] : null;
		const annoScontato = conSconto(anno);
		return {
			minuti: d.minuti,
			etichetta: d.etichetta,
			anno,
			mese: alMese(anno),
			annoScontato,
			meseScontato: alMese(annoScontato),
		};
	});

export const etichettaFamiglia = {
	legni: 'Legni',
	ottoni: 'Ottoni',
	percussioni: 'Percussioni',
	altri: 'Altri strumenti',
	collettivo: 'Corso collettivo',
};
