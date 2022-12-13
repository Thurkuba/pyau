<script lang="ts">
	import MemoryGame from 'src/components/game/memoryGame.svelte';
	import { layoutControl } from 'src/stores/layoutStore';
	import type { PageData } from './$types';

	export let data: PageData;
	$: cartas = data.cartas;

	layoutControl.setFooter({ tipo: 'none' });
</script>

<MemoryGame {cartas} />
