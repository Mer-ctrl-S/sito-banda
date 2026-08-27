import type { APIRoute } from 'astro';

/*
  robots.txt generato: finché SITE_INDEXABLE non è "true" il sito chiede ai
  motori di non indicizzare nulla. Serve durante le demo, quando le pagine
  contengono ancora segnaposto e il modulo contatti non recapita.

  Il divieto qui va in coppia con il meta noindex in BaseHead: robots.txt
  impedisce la scansione, il meta impedisce l'indicizzazione anche se qualcuno
  linka una pagina dall'esterno.
*/
export const GET: APIRoute = ({ site }) => {
	const indicizzabile = import.meta.env.SITE_INDEXABLE === 'true';

	const corpo = indicizzabile
		? [
				'User-agent: *',
				'Allow: /',
				'',
				site ? `Sitemap: ${new URL('sitemap-index.xml', site).href}` : '',
			]
		: [
				'# Indicizzazione disattivata: sito in fase di lavorazione.',
				'# Si attiva impostando SITE_INDEXABLE=true fra le variabili di build.',
				'User-agent: *',
				'Disallow: /',
			];

	return new Response(corpo.filter(Boolean).join('\n') + '\n', {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
