<script lang="ts">
	import Sol from '../icons/sol.svelte';

	export let num: number;
	export let idx: number;
</script>

<div
	class:seis={num === 6}
	class:oito={num === 8}
	class:dez={num === 10}
	class:doze={num === 12}
	style={`grid-area: x${idx + 1};`}
>
	<Sol size="60%" color="var(--secondary)" />
</div>

<style lang="scss">
	div {
		grid-area: c;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0.7;
		&.seis {
			width: 120px;
			height: 160px;
		}
		&.oito,
		&.dez,
		&.doze {
			width: 90px;
			height: 120px;
		}
	}
</style>
