<script>
	import { EyeOutline, EyeSlashOutline, PenOutline } from 'flowbite-svelte-icons';
	import { Toaster, toast } from 'svelte-sonner';
	let isDisabled = $state(true);
	let inputRef;
	const enableInput = () => {
		if (name === 'username') {
			toast.error('Username can not be changed!!!');
			return;
		}
		isDisabled = false;
		setTimeout(() => {
			inputRef.focus();
		}, 0);
	};
	let eyeOpen = $state(false);
	const disableInput = (event) => {
		// Disable input only for non-password fields
		if (name !== 'password' && !event.target.closest('.eye-icon')) {
			isDisabled = true;
		}
	};
	let { type, value, forLabel, name } = $props();
	function handlePassword() {
		eyeOpen = !eyeOpen;
		if (eyeOpen === true) {
			type = 'text';
		} else {
			type = 'password';
		}
	}
</script>

<div class="flex flex-col gap-2">
	<label for={forLabel}
		>{name === 'password' ? 'Update Password' : name[0].toUpperCase() + name.slice(1)}:</label
	>
	<div class="flex flex-row items-center gap-2">
		<div class="relative">
			<input
				{type}
				class="h-9 w-72 rounded-sm bg-white pl-2 text-black disabled:cursor-not-allowed disabled:bg-gray-400"
				bind:value
				disabled={isDisabled}
				onblur={disableInput}
				bind:this={inputRef}
				{name}
			/>
			{#if name === 'password'}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="eye-icon absolute right-2 top-1/2 flex -translate-y-1/2 items-center"
					onclick={handlePassword}
				>
					<span class="mr-1 h-6 border-r-2 border-opacity-55"></span>
					{#if eyeOpen}
						<EyeOutline class="h-6 w-6 text-black" />
					{:else}
						<EyeSlashOutline class="h-6 w-6 text-black" />
					{/if}
				</div>
			{/if}
		</div>
		<button
			class="flex flex-row items-center gap-1 rounded-xl bg-slate-500 p-[0.4rem]"
			type="button"
			onclick={enableInput}
		>
			<PenOutline class="w-[1.3rem]" />
			<div>Edit</div>
		</button>
	</div>
</div>
