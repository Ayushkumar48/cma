<script>
	import '../app.css';
	import Navbar from '$lib/Navbar/Navbar.svelte';
	import { loggedIn } from '$lib/store';
	import { Toaster } from 'svelte-sonner';
	let { children, data } = $props();
</script>

<Navbar username={data.username} name={data.name} />
{@render children()}

<Toaster richColors />
