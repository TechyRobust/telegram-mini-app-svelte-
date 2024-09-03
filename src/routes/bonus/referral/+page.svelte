<script lang="ts">
	import { InviteHistory } from './../../../store/store';
	import Title from '$lib/components/Home/Title.svelte';
	import RefferralItem from '$lib/components/Refferral/RefferralItem.svelte';
	import { IsFooter, HeaderState } from '../../../store/store';
	import { onMount } from 'svelte';

	export let data;
	//This value will be invite histories.
	let inviteHistory: any[] = [];
	//This value will be class name for refferral container.
	let classNames = '';

	//This function will be called when this page load,
	//Set header state and referral-container component.
	onMount(() => {
		//Set header and footer state.
		$IsFooter = false;
		$HeaderState = 3;
		//Get invite history from store.
		inviteHistory = JSON.parse($InviteHistory);
		//Set classNames.
		if (inviteHistory.length > 0) {
			classNames = '';
		} else {
			classNames = 'flex justify-center items-center';
		}
	});
</script>

<div class="referral-container gap-4">
	<div class={`refferral-height ${classNames}`}>
		{#if inviteHistory.length == 0 || !inviteHistory}
			<div class="flex flex-col gap-4 justify-center items-center w-full h-full text-center">
				<img class="empty-icon" src="/icons/empty.png" alt="" />
				<p class="no-member-text">У вас нет рефералов</p>
			</div>
		{/if}
		{#if inviteHistory.length != 0}
			<Title Title={`Мои рефералы (${inviteHistory.length})`} />
			<div class="refferral-box flex flex-col">
				{#each inviteHistory as ele}
					<RefferralItem
						UserAvatar={ele.avatar_url}
						NickName={ele.nick_name}
						ChatID={ele.chatId}
						InviteDate={ele.invite_date}
						Income={ele.invite_bonus}
					/>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.referral-container {
		padding: 24px 16px 0 16px;
		display: flex;
		flex-direction: column;
	}

	.refferral-height {
		min-height: calc(100vh - 126px);
		min-height: calc(100vh - 126px);
		overflow-y: auto;
	}

	.refferral-box {
		width: 100%;
		height: 218px;
		gap: 16px;
	}

	.no-member-text {
		font-family: Gilroy;
		font-size: 21px;
		font-weight: 600;
		line-height: 14.98px;
		text-align: left;
		color: white;
	}

	.empty-icon {
		width: 70px;
		height: 70px;
	}
</style>
