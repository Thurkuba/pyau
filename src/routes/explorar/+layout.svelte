<script lang="ts">
	import { layoutControl } from 'src/stores/layoutStore';

	layoutControl.setHeader({ large: false, back: '' });
	layoutControl.setFooter({ tipo: 'inicio' });
</script>

<slot />
