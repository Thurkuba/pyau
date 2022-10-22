<script>
	import { auth } from 'src/lib/services/firebase';

	const signOut = () => {
		auth.signOut();
	};
</script>

<header>
	<nav>
		<a href="/">
			<h2>Pyau</h2>
			<img src="pyauIcon.png" alt="ícone de sol" />
		</a>

		<button on:click={signOut}> sign Out </button>
	</nav>
</header>

<style lang="scss">
	header {
		width: 100%;
	}
	nav {
		box-sizing: border-box;
		width: 100%;
		padding: 12px;
		background-color: #107200;
		display: flex;
		justify-content: center;
		/* flex-direction: ; */
		a {
			display: inline-flex;
			align-items: center;
			gap: 10px;
			h2 {
				margin: 0;
				color: white;
				font-size: 24px;
			}
			img {
				width: 21px;
				height: 23px;
			}
		}
	}
</style>
