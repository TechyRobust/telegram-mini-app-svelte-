<script>
	import { UserInfo } from './../store/userinfo';
	import { getCookie } from 'svelte-cookie';
	import { IsLoading } from '../store/store';
	import { goto } from '$app/navigation';
	import Home from '$lib/icon/FooterIcons/Home.svelte';
	import Bonuses from '$lib/icon/FooterIcons/Bonuses.svelte';
	import Market from '$lib/icon/FooterIcons/Market.svelte';
	import Wallet from '$lib/icon/FooterIcons/Wallet.svelte';
	import { IsFooter, IsFooterLoad } from '../store/store';
	import { onMount } from 'svelte';

	let footerStatus = [
		{ class: '', url: '/home' },
		{ class: 'opacity-50', url: '/market' },
		{ class: 'opacity-50', url: '/bonus' },
		{ class: 'opacity-50', url: '/wallet' }
	];

	onMount(() => {
		const url = getCookie('url');
		if (url) {
			if (url != "/")
				footerStatus.forEach((e) => (e.url == url ? (e.class = '') : (e.class = 'opacity-50')));
		}
	});
	// @ts-ignore

	const moveFooter = (num) => {
		if (footerStatus[num].class == '') return;
		footerStatus.forEach((e) => (e.class = 'opacity-50'));
		footerStatus[num].class = '';
		$IsLoading = true;
		goto(footerStatus[num].url);
	};

</script>

{#if $IsFooter}
	<div class=" w-full absolute bottom-1 z-50 p-footer">
		<div class="footer-container flex">
			<button
				on:click={() => moveFooter(0)}
				class="w-1/4 footer-item flex justify-center items-center flex-col {footerStatus[0].class}"
			>
				<Home />
				<p class="footer-text">Нлавая</p>
			</button>
			<button
				class="w-1/4 footer-item flex justify-center items-center flex-col {footerStatus[1].class}"
				on:click={() => moveFooter(1)}
			>
				<Bonuses />
				<p class="footer-text">Маркет</p>
			</button>
			<button
				class="w-1/4 footer-item flex justify-center items-center flex-col {footerStatus[2].class}"
				on:click={() => moveFooter(2)}
			>
				<Market />
				<p class="footer-text">Бонусы</p>
			</button>
			<button
				class="w-1/4 footer-item flex justify-center items-center flex-col {footerStatus[3].class}"
				on:click={() => moveFooter(3)}
			>
				<Wallet />
				<p class="footer-text">Кошелек</p>
			</button>
		</div>
	</div>
{/if}

<style>
	.footer-container {
		width: 100%;
		height: 76px;
		padding: 10px;
		gap: 0px;
		border-radius: 20px;
		box-shadow: 0px -10px 20px 0px #00000026;
		background: #19233e;
	}

	.footer-item {
		height: 56px;
		padding: 6px 0px 6px 0px;
		gap: 4px;
	}

	.footer-text {
		font-family: Gilroy;
		font-size: 12px;
		font-weight: 500;
		line-height: 14.12px;
		text-align: center;
		color: white;
	}

	.p-footer {
		padding: 24px 16px;
	}
</style>
