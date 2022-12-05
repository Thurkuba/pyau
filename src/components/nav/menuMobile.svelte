<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { signOut } from 'src/stores/profileStore';

	let clazz = '';
	export { clazz as class };

	export let open = false;

	const handleSignOut = () => {
		signOut();
		open = !open;
	};

	const expand = (_node: unknown, { duration = 500 }) => ({
		duration,
		css: (t: number) => {
			const eased = cubicInOut(t);
			const circleSize = Math.floor(1.1 * eased * window.innerHeight);
			return `clip-path: circle(${circleSize}px at 100% 0);`;
		}
	});

	const clickOutside = () => open && (open = false);

	const options = [
		{ name: 'Perfil', href: '/perfil' },
		{ name: 'Sair', onclick: handleSignOut }
	];
</script>

{#if open}
	<nav class={clazz} transition:expand on:click|stopPropagation on:keypress>
		<ul>
			{#each options as { href = "#", name, onclick }}
				<li>
					<a class="link" {href} on:click={onclick}>
						{name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<svelte:window on:click={clickOutside} />

<style lang="scss">
	nav {
		position: absolute;
		right: 0;
		top: 0;
		height: 100vh;
		background-color: var(--white-g);
		z-index: 90;
		width: 150px;
		box-sizing: border-box;
		padding-top: 72px;
		ul {
			list-style: none;
			padding: 0;
			li {
				margin-bottom: 24px;
				:global(.link) {
					color: var(--text);
					font-size: 24px;
				}
				padding: 0 16px;

				&:hover {
					background-color: var(--secondary);
				}
			}
		}
	}
</style>
