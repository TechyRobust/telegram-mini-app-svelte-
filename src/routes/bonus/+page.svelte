<script lang="ts">
	import BonusBox from '../../lib/components/Bonus/BonusBox.svelte';
	import TelegramInviteBox from './../../lib/components/Bonus/TelegramInviteBox.svelte';
	import { getCookie, setCookie } from 'svelte-cookie';
	import Bonus from '$lib/components/Bonus/Bonus.svelte';
	import Title from '$lib/components/Home/Title.svelte';
	import TelegramBonus from '$lib/components/Bonus/TelegramBonus.svelte';
	import {
		IsFooter,
		IsHeader,
		HeaderState,
		IsLoading,
		InviteHistory,
		IsAnimate
	} from '../../store/store';
	import { UserInfo, IsChanged } from '../../store/userinfo';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { AES } from 'crypto-es/lib/aes';
	import { Utf8 } from 'crypto-es/lib/core';
	import { goto } from '$app/navigation';
	import { Base64 } from 'crypto-es/lib/enc-base64';

	export let data;

	//This value will include user information.
	let userInfo: any = {};
	//This value will include user invite history.
	let inviteHistory = [];

	//This value will include data for daily bonus.
	//The data based on user information.
	let dailyBonusDatas: any = [];
	//This value will include task information.
	//The data base on user information.
	//The task has accepted in user, it isn't show to user.
	let userTasks: any = [];
	//This value will include the url to invite user in here.
	let inviteUrl = 'start=ref';
	//This value will include the url to send telegram message in here.
	let sendTelegramUrl = 'https://t.me/share/url?url=https://t.me/belkatestbot_bot?';
	//This value will include user count invited by you.
	let inviteStep = 0;
	//This value will include the target invite count.
	let inviteTarget = 5;
	//This value is response state from back-end.
	//If you don't recieve response from back-end, this value will be false.
	//After recieve	response, this will be true.
	let isPassible = true;

	//Init values
	//and decode hash telegram_id
	//and save current page url in database.
	//and set current page header and footer state.
	onMount(async () => {
		//Set cookie current page url.
		setCookie('url', '/bonus', 60 * 60 * 24 * 30);
		//Send request to back-end to save current page url to database.
		fetch('/api/saveUrl', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			})
		//Set current page header and footer state.
		$IsFooter = true;
		$IsHeader = true;
		$HeaderState = 2;
		//Stop loading animation.
		$IsLoading = false;
		//Get daily bonus data from back-end.
		dailyBonusDatas = data.dailyBonus;
		//Get user invite history from back-end.
		$InviteHistory = data.inviteHistory;
		//Get user tasks data from back-end.
		userTasks = JSON.parse(data.userTasks);
		//Get invite history for user from back-end.
		inviteHistory = JSON.parse($InviteHistory);
		//Set invite target and invite step.
		let len = inviteHistory.length;
		if (len > 0) {
			let count = 1;
			while (true) {
				if (len - 5 * count < 0) break;
				len -= 5 * count;
				count++;
			}
			inviteTarget = 5 * count;
			inviteStep = len;
		}
		//Get user info from store.
		if ($UserInfo) {
			userInfo = JSON.parse($UserInfo);
			let tidTemp = userInfo.avatar_url.substr(30);
			let index = tidTemp.indexOf(':');
			tidTemp = tidTemp.substr(3, index - 3);
		}
		//Get hash telegram_id from cookie.
		const hasValue = getCookie('hash');
		if (hasValue) {
			let result: any = Base64.parse(hasValue);
			result = Utf8.stringify(result);
			let hash = AES.decrypt(result, 'hashkey').toString(Utf8);
			inviteUrl += hash;
			sendTelegramUrl = sendTelegramUrl + inviteUrl + '&utm_source=share2';
		}
	});

	//Get daily bonus using daily bonus id, and daily bonus type.
	const getDailyBonus = async (id: any, type: any) => {
		//Still now, if you don't recieve response from back-end, you can send request to back-end to get daily bonus.
		if (!isPassible) return;
		isPassible = false;
		//Send request to back-end to get daily bonus.
		const result = await fetch('/api/getDailyBonus', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ userId: userInfo.id, dailyId: id, dailyType: type })
		});
		//Get response result from back-end.
		const jsonResult = await result.json();
		//Check response state.
		if (jsonResult.status == true) {
			let dayData = dailyBonusDatas[parseInt(id) - 1];
			if (dayData.daily_bonus_type == 1) {
				userInfo.squirrel_coin = parseInt(userInfo.squirrel_coin) + parseInt(dayData.daily_bonus_cost);
			} else if (dayData.daily_bonus_type == 2) {
				userInfo.squirrel_coin =
					parseInt(userInfo.squirrel_coin) + parseInt(dayData.daily_bonus_cost);
			} else {
				userInfo.tron_coin = parseInt(userInfo.tron_coin) + parseInt(dayData.daily_bonus_cost);
			}
			//if response state is true, update user info.
			$IsChanged = true;
			$UserInfo = JSON.stringify(userInfo);
			dailyBonusDatas[parseInt(id) - 1].isChecked = true;
			toast.success('Get Daily Bonus');
		} else {
			toast.error(jsonResult.content);
		}
		//Receive response from back-end.
		isPassible = true;
	};

	//Using this function, can go detail page for invited user information.
	const goDetail = () => {
		goto('/bonus/referral');
	};

	//Send invite request to telegram.
	const inviteUser = () => {
		if (sendTelegramUrl) {
			window.open(sendTelegramUrl, '_black');
		}
	};

	//Accept user level up bonus
	const acceptUserLevelUp = async (id, sum) => {
		//Still now, if you don't recieve response from back-end, you can send request to back-end to get daily bonus.
		if (!isPassible) return;
		isPassible = false;
		//send request to get bonus for user level up.
		const result = await fetch('/api/acceptBonus', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: id, type: 8 })
		});
		//Receive response result from back-end.
		//And check response state.
		const jsonResult = await result.json();
		if (jsonResult.status == true) {
			userTasks = JSON.parse(jsonResult.newTask);
			toast.success(jsonResult.content);
			userInfo.squirrel_coin = parseInt(userInfo.squirrel_coin) + parseInt(sum);
			$IsChanged = true;
			$UserInfo = JSON.stringify(userInfo);
			$IsAnimate = true;
		} else {
			toast.error(jsonResult.content);
		}
		//Receive response from back-end.
		isPassible = true;
	};

	//Accept card level up bonus
	const acceptCardLevelUp = async (id, sum) => {
		//Still now, if you don't recieve response from back-end, you can send request to back-end to get daily bonus.
		if (!isPassible) return;
		isPassible = false;
		//Send request to get bonus for card level up.
		const result = await fetch('/api/acceptBonus', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: id, type: 5 })
		});
		//Get reponse result from back-end.
		//And check reponse state.
		const jsonResult = await result.json();
		if (jsonResult.status == true) {
			userTasks = JSON.parse(jsonResult.newTask);
			toast.success(jsonResult.content);
			userInfo.squirrel_coin = parseInt(userInfo.squirrel_coin) + parseInt(sum);
			$IsChanged = true;
			$UserInfo = JSON.stringify(userInfo);
			$IsAnimate = true;
		} else {
			toast.error(jsonResult.content);
		}
		//Receive response from back-end.
		isPassible = true;
	};

	//Go to squirrel coin game channel.
	const goToChannel = async () => {
		window.open("https://t.me/squirrel_game_channel", "blank");
	}

	//Send request to check user state joinging or not in squirrel coin game chaneel.
	const onCheck = async (id, sum) => {
		if (!isPassible) return;
		isPassible = false;
		const result = await fetch(`/api/checkChannel`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ chatId: userInfo.chatId })
		});
		const jsonResult = await result.json();
		if (jsonResult.status == true) {
			const bonusResult = await fetch('/api/acceptBonus', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: id, type: 1 })
			})
			const jsonBonusResult = await bonusResult.json();
			if (jsonBonusResult.status == true) {
				userTasks = JSON.parse(jsonBonusResult.newTask);
				toast.success(jsonBonusResult.content);
				userInfo.squirrel_coin = parseInt(userInfo.squirrel_coin) + parseInt(sum);
				$IsChanged = true;
				$UserInfo = JSON.stringify(userInfo);
				$IsAnimate = true;
			}
			else {
				toast.error(jsonBonusResult.content)
			}
		}
		else {
			toast.error("Still, Not Join");
		}
		isPassible = true;
	}

	//This is hook functiion to get user information from store when user information change.
	$: {
		if ($UserInfo && $IsChanged == true) {
			userInfo = JSON.parse($UserInfo);
		}
	}
</script>

<div class="market-container gap-4 flex flex-col">
	<Title Title="Бонусы" />
	<div class="gap-4 flex flex-col bonuses-group-box">
		<div>
			<p class="day-bonus-text">Ежедневный бонус</p>
			<div class="bonus-list-container mt-4">
				<div class="inline-flex w-auto gap-3">
					{#each dailyBonusDatas as day}
						<Bonus
							IsPossible={day.isPossible}
							on:onClick={day.isPossible == true && day.isChecked == false
								? () => getDailyBonus(day.id, day.daily_bonus_type)
								: () => {}}
							BonusChecked={day.isChecked}
							BonusCost={day.daily_bonus_cost}
							Title={day.title}
						/>
					{/each}
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<p class="eachbonus-title-text">Реферальная программа</p>
			<TelegramInviteBox on:onDetail={goDetail} Url={inviteUrl} Count={inviteHistory.length} />
		</div>
		<p class="eachbonus-title-text">Другие бонусы</p>

		{#each userTasks.filter((task) => task.task_state != 3) as task}
			{#if task.task_type == 1}
				<div class="flex flex-col gap-4">
					<TelegramBonus on:onCheck={() => onCheck(task.id, task.task_complete_bonus)} on:onGoTo={goToChannel} />
				</div>
			{/if}
			{#if task.task_type == 2}
				<BonusBox
					Text="Подписаться на наш telegaram"
					on:onClick={inviteUser}
					Type={2}
					CurrentLevel={`${inviteStep}`}
					Level={`${inviteTarget}`}
					State={'2'}
				/>
			{/if}
			{#if task.task_type == 3}
				<BonusBox Text="Просто купите Трон." on:onClick={inviteUser} Type={3} />
			{/if}
			{#if task.task_type == 4}
				<BonusBox Text="Купить Премиум" Type={4} />
			{/if}
			{#if task.task_type == 5}
				<BonusBox
					CurrentLevel={task.task_progress}
					Text="Карта повышения уровня"
					on:onClick={task.task_state == 2
						? () => acceptCardLevelUp(task.id, task.task_complete_bonus)
						: () => {
								toast.error('This card level is not enough!');
							}}
					Type={5}
					ImageUrl={task.card_avatar}
					Level={task.task_target}
					Bonus={task.task_complete_bonus}
					State={task.task_state}
				/>
			{/if}
			{#if task.task_type == 8}
				<BonusBox
					CurrentLevel={task.task_progress}
					Text="Перейти на следующий уровень"
					on:onClick={task.task_state == 2
						? () => acceptUserLevelUp(task.id, task.task_complete_bonus)
						: () => {
								toast.error('Your level is not enough!');
							}}
					Type={8}
					ImageUrl={task.squirrel_url}
					Level={task.task_target_id}
					Bonus={task.task_complete_bonus}
					State={task.task_state}
				/>
			{/if}
		{/each}
	</div>
</div>

<style>
	.bonuses-group-box {
		max-height: calc(100vh - 233px);
		overflow-y: auto;
	}

	.bonuses-group-box::-webkit-scrollbar {
		width: 0;
	}

	.market-container {
		padding: 24px 16px 0 16px;
		visibility: visible;
	}

	.bonus-list-container {
		width: 100%;
		overflow-x: scroll;
	}

	.bonus-list-container::-webkit-scrollbar {
		height: 5px;
	}

	/* Track */
	.bonus-list-container::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}

	/* Handle */
	.bonus-list-container::-webkit-scrollbar-thumb {
		background: #3c9ff5b9;
		border-radius: 10px;
	}

	/* Handle on hover */
	.bonus-list-container::-webkit-scrollbar-thumb:hover {
		background: #3c9ef5;
	}

	.day-bonus-text {
		font-family: Gilroy;
		font-size: 16px;
		font-weight: 700;
		line-height: 20px;
		text-align: center;
		color: #828998;
	}

	.eachbonus-title-text {
		font-family: Gilroy;
		font-size: 16px;
		font-weight: 700;
		line-height: 20px;
		text-align: center;
		color: #828998;
	}
</style>
