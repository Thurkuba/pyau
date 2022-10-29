import { error } from '@sveltejs/kit';
import { memoStore } from 'src/stores/memoStore';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const slug = params.slug;
	const store = get(memoStore);
	if (Object.keys(store.cartasObj).includes(slug)) {
		return {
			nomeguarani: store.cartasObj[slug].nomeguarani,
			nomept: store.cartasObj[slug].nomept,
			descricao: store.cartasObj[slug].descricao,
			imagem: store.cartasObj[slug].imagem
		};
	}

	throw error(404, 'Not found');
}
