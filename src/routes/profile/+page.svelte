<script>
	import Profile from '$lib/Profile/Profile.svelte';
	let { data } = $props();
</script>

<Profile user={data.user} />
