<script>
	import '../app.css';
	import Navbar from '$lib/Navbar/Navbar.svelte';
	import { loggedIn } from '$lib/store';
	let { children, data } = $props();
	if (data.loggedIn === true) {
		loggedIn.set(true);
	} else {
		loggedIn.set(false);
	}
</script>

<Navbar />
{@render children()}
