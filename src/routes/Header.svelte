<script lang="ts">
	import { UserInfo, IsChanged } from './../store/userinfo';
	import { IsFooter, IsHeader, HeaderState } from '../store/store';
	import Logo from '$lib/icon/ComponentIcons/Logo.svelte';
	import HeaderMoneyButton from '$lib/components/Market/HeaderMoneyButton.svelte';
	import LogOut from '$lib/icon/LogOut.svelte';
	import { onMount } from 'svelte';

	let userInfo: any = {};
	let firstChat = '';

	onMount(async () => {
		$IsFooter = true;
		$IsHeader = true;
		$HeaderState = 1;
	});

	const redirectPage = () => {
		history.back();
	};

	$: {
		if ($IsChanged == true && $UserInfo) {
			userInfo = JSON.parse($UserInfo);
			firstChat = userInfo.nick_name.toString();
			firstChat = firstChat.charAt(0);
			firstChat = firstChat.toUpperCase();
			$IsChanged = false;
		}
	}
</script>

{#if $IsHeader}
	<div class="p-header">
		<div class="header-container flex justify-between">
			<div class="flex">
				{#if $HeaderState != 3}
					<Logo />
				{/if}
				<!-- svelte-ignore missing-declaration -->
				{#if $HeaderState == 3}
					<!-- svelte-ignore missing-declaration -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div on:click={redirectPage}>
						<LogOut />
					</div>
				{/if}
				{#if $HeaderState == 1}
					<div class="ml-2 text-box mt-1">
						<p class="coin-style">Squirrel Coin</p>
					</div>
				{/if}
			</div>
			{#if $HeaderState == 2}
				<div class="flex gap-3 w-full px-2">
					<div class="w-1/3">
						<HeaderMoneyButton Text={userInfo.squirrel_coin} />
					</div>
					<div class="w-1/3">
						<HeaderMoneyButton Type={2} Text={userInfo.boost_coin} />
					</div>
					<div class="w-1/3">
						<HeaderMoneyButton Type={3} Text={userInfo.tron_coin} />
					</div>
				</div>
			{/if}
			<div class="flex avatar-box items-center">
				{#if $HeaderState != 2}
					<p class="avatar-text mr-3">{userInfo.nick_name}.</p>
				{/if}
				<div class="header-user-avatar-box">
					{#if userInfo.avatar_url && userInfo.avatar_url != ''}
						<img src={userInfo.avatar_url} alt="" />
					{/if}
					{#if !userInfo.avatar_url || userInfo.avatar_url == ''}
						<div class="customer-avatar">
							{#if userInfo.nick_name}
								<div>{firstChat}</div>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.p-header {
		padding: 24px 16px 0 16px;
		height: auto;
	}
	.header-user-avatar-box {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		background: black;
	}
	.header-user-avatar-box > img {
		width: 100%;
		height: auto;
	}
	.header-container {
		height: 32px;
	}

	.text-box {
		width: 44px;
		height: 32px;
		gap: 0px;
		opacity: 0px;
	}

	.coin-style {
		font-family: Gilroy;
		font-size: 12px;
		font-weight: 900;
		line-height: 14.98px;
		text-align: left;
		color: white;
	}

	.avatar-box {
		gap: 0px;
		border: 1px 0px 0px 0px;
		opacity: 0px;
		border-radius: 50%;
	}

	.avatar-text {
		font-family: Gilroy;
		font-size: 16px;
		font-weight: 900;
		line-height: 19.97px;
		text-align: right;
		color: white;
	}

	.customer-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background-color: DodgerBlue;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		color: #fff;
	}
</style>
