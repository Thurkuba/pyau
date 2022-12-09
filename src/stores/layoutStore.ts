import { writable } from 'svelte/store';

export type FooterType = 'none' | 'inicio' | 'simples' | 'duplo';

type FnOrString = (() => void) | string;

export type BtnInfo = {
	texto?: string;
	efeito?: FnOrString;
};
export type BtnInfoBack = { back?: FnOrString } & BtnInfo;

export type FooterControl =
	| { tipo: 'none' }
	| { tipo: 'inicio' }
	| { tipo: 'simples'; btn1?: BtnInfoBack }
	| { tipo: 'duplo'; btn1?: BtnInfo; btn2?: BtnInfo };

interface LayoutControl {
	header: { back: string; large: boolean };
	footer: FooterControl;
}
const initialLayout: LayoutControl = {
	header: { back: '', large: false },
	footer: { tipo: 'none' }
};

function createStore() {
	const { subscribe, set, update } = writable<LayoutControl>(initialLayout);

	return {
		subscribe,
		reset: () => set(initialLayout),
		setHeader: (newInfo: LayoutControl['header']) =>
			update((layout) => ({ ...layout, header: newInfo })),
		adjustHeader: (newInfo: Partial<LayoutControl['header']>) =>
			update((layout) => ({ ...layout, header: { ...layout.header, ...newInfo } })),
		setFooter: (newInfo: LayoutControl['footer']) =>
			update((layout) => ({ ...layout, footer: newInfo })),
		adjustFooter: (newInfo: Partial<LayoutControl['footer']>) =>
			update((layout) => ({ ...layout, footer: { ...layout.footer, ...newInfo } }))
	};
}

export const layoutControl = createStore();

layoutControl.subscribe(console.log);
