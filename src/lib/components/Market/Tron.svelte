<script>
	import TronIcon from '$lib/icon/MarketIcons/TronIcon.svelte';
	import ImproveButton from './ImproveButton.svelte';
</script>

<div class="tron-container flex justify-center flex-col">
	<TronIcon />
	<div class="tron-amount-text">2.5 Tron</div>
	<div class="w-full h-7">
		<ImproveButton Text="Купить" />
	</div>
</div>

<style>
	.tron-container {
		height: 195px;
		padding: 10px;
		gap: 10px;
		border-radius: 8px;
		border: 1px solid #283454;
		background: #ffffff0a;
	}

	.tron-amount-text {
		font-family: Gilroy;
		font-size: 14px;
		font-weight: 600;
		line-height: 18px;
		text-align: center;
		color: white;
	}
</style>
