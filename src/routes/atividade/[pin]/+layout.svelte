<script>
	import { layoutControl } from 'src/stores/layoutStore';

	layoutControl.setFooter({ tipo: 'none' });
	layoutControl.setHeader({ large: false, back: '' });
</script>

<slot />
