<script lang="ts">
	import Money from '$lib/icon/ComponentIcons/BoosterCoin.svelte';
	import ImproveButton from '../Market/ImproveButton.svelte';
	import Avatar from '$lib/icon/BonusIcons/Avatar.svelte';
	import ProgressBar from '../Market/ProgressBar.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import TronIcon from '$lib/icon/MarketIcons/TronIcon.svelte';
	import Crown from '$lib/icon/MarketIcons/Crown.svelte';

	const dispatch = createEventDispatcher();

	export let Text = '';
	export let Type = 0;
	export let ImageUrl = '';
	export let Level = '';
	export let Bonus = '';
	export let CurrentLevel = '';
	export let State = '';
	let CompleteMembers: any = 0;
	let MaxStep = 5;

	const handleClick = () => {
		dispatch('onClick');
	};

	onMount(() => {
		if (CurrentLevel && Type == 2) {
			CompleteMembers = Math.round((parseInt(CurrentLevel) / parseInt(Level)) * 5);
		}
		else {
			if (CurrentLevel) {
				CompleteMembers = parseFloat(CurrentLevel);
			}
		}
	});
	$: {
		if (CurrentLevel && Type == 2) {
			CompleteMembers = Math.round((parseInt(CurrentLevel) / parseInt(Level)) * 5);
		}
		else {
			if (CurrentLevel) {
				CompleteMembers = parseFloat(CurrentLevel);
			}
		}
	}
</script>

<div class="invite-bonus-container flex justify-between">
	<div class="invite-icon-box">
		<div class="icon-size-box">
			{#if Type == 2}
				<Avatar />
			{/if}
			{#if Type == 3}
				<TronIcon />
			{/if}
			{#if Type == 4}
				<Crown />
			{/if}
			{#if Type == 5 || Type == 8}
				<img src={ImageUrl} alt="" />
			{/if}
		</div>
		<div class=" gap-3 flex flex-col">
			{#if Type == 2 || Type == 3 || Type == 4}
				<p class="content-text">{Text}</p>
			{/if}
			{#if Type == 5 || Type == 8}
				<div class="flex justify-between items-center gap-4">
					<p class="content-text">Level: {Level}</p>
					<div class="flex justify-between items-center gap-1">
						<Money />
						<p class="content-text">{Bonus}</p>
					</div>
				</div>
			{/if}
			{#if Type == 2}
				<ProgressBar StepCount={MaxStep} Completed={CompleteMembers} />
			{/if}
			{#if Type == 5 || Type == 8}
				<div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
					<div class="bg-progress h-2.5 rounded-full" style={`width: ${CompleteMembers/parseFloat(Level) * 100}%`}></div>
				</div>
			{/if}
		</div>
	</div>
	<div class="type-btn-group-box flex flex-col justify-center items-center relative">
		{#if State != '2'}
			<div class="disabled-btn-style"></div>
		{/if}
		<ImproveButton Text="Забрать" on:onClick={handleClick} />
	</div>
</div>

<style>
	.invite-bonus-container {
		width: 100%;
		height: 102px;
		padding: 16px;
		gap: 10px;
		border-radius: 8px;
		opacity: 0px;
		background: #ffffff0a;
		border: 1px solid #283454;
	}

	.invite-icon-box {
		gap: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.content-text {
		font-family: Gilroy;
		font-size: 16px;
		font-weight: 600;
		line-height: 20px;
		text-align: left;
		color: #ffffff;
	}

	.type-btn-group-box {
		min-width: 90px;
		max-width: 90px;
		height: 70px;
		gap: 10px;
		opacity: 0px;
	}

	.icon-size-box {
		max-width: 50px;
		max-height: 50px;
		min-width: 50px;
		min-height: 50px;
		border-radius: 50%;
		background: #ffffff0d;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.disabled-btn-style {
		width: 100%;
		height: 30px;
		background: rgba(0, 0, 0, 0.555);
		position: absolute;
	}
</style>
