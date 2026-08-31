import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import lit from '@astrojs/lit';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

/*
  Dominio pubblico, usato per canonical URL, tag Open Graph e sitemap.
  Ordine di precedenza:
    1. SITE_URL          — impostala quando ci sarà il dominio definitivo
    2. dominio di produzione Vercel — stabile, non cambia a ogni deploy
    3. segnaposto        — solo in locale

  Si usa il dominio di PRODUZIONE anche nelle preview: una preview non deve
  dichiararsi canonica di se stessa, altrimenti ogni deploy crea un duplicato.
*/
const dominioProduzioneVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/*
  Dominio ufficiale dell'associazione, dal regolamento del 1 settembre 2025.
  Questo sito prende il posto del vecchio deploy su questo indirizzo, quindi
  può dichiararsi canonico (canonical, Open Graph, sitemap).
*/
const DOMINIO_UFFICIALE = 'https://www.bandacastelcovati.it';

const site =
	process.env.SITE_URL ||
	DOMINIO_UFFICIALE ||
	(dominioProduzioneVercel ? `https://${dominioProduzioneVercel}` : null) ||
	'https://example.com';

/*
  L'indicizzazione è governata da SITE_INDEXABLE, letta direttamente dalle
  pagine con import.meta.env: Astro la espone come stringa senza bisogno di
  configurarla qui. NON aggiungere un vite.define su import.meta.env.*, Vite
  gestisce quell'oggetto per conto suo e il valore verrebbe sovrascritto.
  La leggono: src/pages/robots.txt.ts e src/components/head/BaseHead.astro.
*/

export default defineConfig({
	site,
	/*
	  Il sito resta statico: quasi tutte le pagine sono file HTML scritti alla
	  build. L'adapter serve alle sole pagine degli eventi, che dichiarano
	  `prerender = false` e vengono generate a ogni richiesta, così un evento
	  pubblicato su WindDoc compare subito senza ricostruire il sito.
	*/
	adapter: vercel(),
	integrations: [sitemap(), mdx(), lit(), icon()],
	vite: {
		plugins: [tailwindcss()],
	},
});
