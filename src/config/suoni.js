/*
  Estratti audio degli strumenti, in public/assets/sound.
  Chiave = slug del corso (vedi corsi.js). Uno strumento senza voce qui mostra
  semplicemente "Audio in arrivo": non va aggiunta una chiave con un percorso
  inventato.
*/

export const soundMap = {
	clarinetto: '/assets/sound/clarinetto1.mp3',
	'clarinetto-basso': '/assets/sound/clarinetto-basso.mp3',
	oboe: '/assets/sound/oboe.mp3',
	fagotto: '/assets/sound/fagotto.mp3',
	flauto: '/assets/sound/flauto.mp3',
	ottavino: '/assets/sound/ottavino.mp3',
	corno: '/assets/sound/corno.mp3',
	tromba: '/assets/sound/tromba.mp3',
	trombone: '/assets/sound/trombone.mp3',
	'sax-contralto': '/assets/sound/sax-alto.mp3',
	'sax-tenore': '/assets/sound/sax-tenore.mp3',
	'sax-baritono': '/assets/sound/sax-baritono.mp3',
	tuba: '/assets/sound/tuba.mp3',
	// percussioni ed euphonium: file non ancora presenti in public/assets/sound.
	// La mappa precedente conteneva le stringhe 'percussioni' ed 'euphonium', che
	// non sono percorsi: l'audio falliva in silenzio invece di dire "in arrivo".
};

/*
  Il grafico ha due settori di clarinetto: il secondo usa la registrazione
  alternativa. Override per id di settore, non per slug.
*/
export const soundMapSettore = {
	Clar2: '/assets/sound/clarinetto2.mp3',
};
