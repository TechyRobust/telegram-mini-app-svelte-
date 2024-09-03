<script>
	import BoosterCoin from '$lib/icon/ComponentIcons/BoosterCoin.svelte';
	import Money from '$lib/icon/ComponentIcons/BoosterCoin.svelte';
	import Vector from '$lib/icon/MainIcons/Vector.svelte';
	import ImproveButton from './ImproveButton.svelte';
	import Booster from '$lib/icon/ComponentIcons/Booster.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { UserInfo, IsChanged } from '../../../store/userinfo';

	export let AvatarUrl = '';
	export let UserName = '';
	export let Description = '';
	export let BoostCost = 0;
	export let SquirrelCost = 0;
	export let VectorCost = 0;
	export let BtnText = '';
	export let CardCost = '0';

	let userInfo = {};

	const dispatch = createEventDispatcher();
	const handleClick = () => {
		dispatch('onButtonClick');
	};

	onMount(() => {
		if ($UserInfo) {
			userInfo = JSON.parse($UserInfo);
		}
	});
	$: {
		if ($UserInfo) userInfo = JSON.parse($UserInfo);
	}
</script>

<div class="user-container flex flex-col justify-center">
	<div class="user-avatar-box">
		<img class="user-avatar" src={AvatarUrl} alt="" />
	</div>
	<div class="username-text">{UserName}</div>
	<p class="detail-text">{Description}</p>
	<div class="flex h-4 w-full gap-1">
		<p class="cost-text">+ {BoostCost}</p>
		<div class="h-4 w-4">
			<Booster />
		</div>
		<p class="hourly-text">/ ч</p>
	</div>
	<div class="flex h-4 w-full gap-1">
		<p class="cost-text">+ {SquirrelCost}</p>
		<Money />
		<p class="hourly-text">/ ч</p>
	</div>
	<div class="flex h-4 gap-1">
		<p class="cost-text mr-1">+ {VectorCost}</p>
		<div class="w-4 h-4">
			<Vector />
		</div>
		<p class="hourly-text">/ ч</p>
	</div>
	<div class="improve-btn relative">
		{#if userInfo && parseInt(userInfo.boost_coin) < parseInt(CardCost)}
			<div class="disable-btn"></div>
		{/if}
		<ImproveButton Text={BtnText} on:onClick={handleClick} />
	</div>
</div>

<style>
	.user-container {
		height: auto;
		width: 100%;
		gap: 10px;
		padding: 10px;
		border: 1px solid #283454;
		border-radius: 8px;
	}

	.user-avatar-box {
		width: 100%;
		height: 87px;
		border-radius: 8px;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.user-avatar {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.username-text {
		font-family: Gilroy;
		font-size: 13px;
		min-height: 54px;
		font-weight: 600;
		line-height: 18px;
		text-align: left;
		color: white;
		word-wrap: break-word;
		display: flex;
		align-items: center;
	}

	.detail-text {
		font-family: Gilroy;
		font-size: 12px;
		font-weight: 500;
		line-height: 14px;
		text-align: left;
		color: #828998;
	}

	.cost-text {
		font-family: Gilroy;
		font-size: 14px;
		font-weight: 700;
		line-height: 16px;
		text-align: left;
		color: white;
	}

	.hourly-text {
		font-family: Gilroy;
		font-size: 12px;
		font-weight: 700;
		line-height: 16px;
		text-align: left;
		color: white;
	}

	.improve-btn {
		width: 100%;
		height: 30px;
	}

	.disable-btn {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.555);
		position: absolute;
	}
</style>
