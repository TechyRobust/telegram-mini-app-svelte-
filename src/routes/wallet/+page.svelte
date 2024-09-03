<script lang="ts">
	import { UserInfo, IsChanged } from './../../store/userinfo';
	import { setCookie } from 'svelte-cookie';
	import IDVerify from '$lib/components/Wallet/IDVerify.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import Title from '$lib/components/Home/Title.svelte';
	import YourWallet from '$lib/components/Wallet/YourWallet.svelte';
	import CoinInfo from '$lib/components/Wallet/CoinInfo.svelte';
	import PassNotification from '$lib/components/Withdraw/PassNotification.svelte';
	import DetailVerify from '$lib/components/Wallet/DetailVerify.svelte';
	import { IsFooter, IsHeader, HeaderState, IsLoading, Squirrel_Cost, WithdrawInfo } from '../../store/store';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	
	export let data: any;

	//this array include verify state including id and cards.
	//This is temporary solution, we should get ......
	let verifyDatas = [
		{
			step: 0,
			title: 'Верификация реквизитов',
			content: 'Пожалуйста, пройдите верификацию, чтобы подтвердить этот метод вывода средств',
			conformText: 'Подтвердить',
			isPass: false,
			passContent: 'Верификация реквизитов',
			isOpenModal: false
		},
		{
			step: 1,
			title: 'Верификация личности',
			content: 'Пожалуйста, пройдите верификацию, чтобы подтвердить этот метод вывода средств',
			conformText: 'Подтвердить',
			isPass: false,
			passContent: 'Верификация реквизитов',
			isOpenModal: false
		}
	];

	//This value will include user information.
	let userInfo :any = {};
	//This value will be squirrel coin cost for RUB.
	let squirrelCoinToRuble = 0;
	//
	let squirrelCost : any = 0;
	//This value will include withdraw card information.
	let withdrawCards : any = [];

	//This is init function.
	//It is called when page load.
	onMount(async () => {
		//Set cookie current page url
		setCookie('url', '/wallet', 60 * 60 * 24 * 30);
		//Send request to back-end to save current page url to back-end.
		fetch('/api/saveUrl', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		//Get withdraw card information from back-end(+page.server.ts)
		withdrawCards = JSON.parse(data.withDrawCards);
		//Save withdraw card information to storage.
		$WithdrawInfo = JSON.stringify(withdrawCards);
		//Get card has verified state using withdraw card information.
		let temp = withdrawCards.filter((item) => {
			return item.type == 1 && item.isConform == false; 
		});
		//if all cards have verified, anymore, verify model won't show.
		if (temp.length == 0) {
			verifyDatas[1].isPass = true;
		}
		//Get squirre coin cost with RUB.
		const result = await fetch('/api/getSquirrelToRuble');
		//get response from back-end.
		const jsonResult = await result.json();
		//get squirrel coin cost to RUB from back-end.
		squirrelCost = jsonResult.cost;
		//Set squirrel coin cost in store.
		$Squirrel_Cost = squirrelCost;
		//set current page header and footer state.
		$IsFooter = true;
		$IsHeader = true;
		$HeaderState = 1;
		//Stop loading animation.
		$IsLoading = false;
		//Get user information from store.
		if ($UserInfo) {
			userInfo = JSON.parse($UserInfo);
			squirrelCoinToRuble = parseInt(squirrelCost) * userInfo.squirrel_coin;
		}
	});

	//This function will be show verify model including card and ID by calling this function.
	const verify = (/** @type {number} */ step) => {
		verifyDatas[step].isOpenModal = true;
	};

	//You can ID verify using this function and api.
	const onConformIdVerify = async (verifyData : any) => {
		// This is the api to save user verify information -->
		//Get verify detail information from model.
		let receiveData = JSON.parse(verifyData.detail);
		//Send request to back-end to verify information.
		const result = await fetch('/api/conformIdVerify', {
		method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({name: receiveData.name, surname: receiveData.surname, birthday: receiveData.bith, city: receiveData.city})
		})

		//Receive reponse from back-end and check state.
		const jsonResult = await result.json();
		if (jsonResult.status == true) {
			userInfo.squirrel_coin = parseInt(userInfo.squirrel_coin) - 250;
			$IsChanged = true;
			$UserInfo = JSON.stringify(userInfo);
			verifyDatas[0].isPass = true;
			verifyDatas[0].isOpenModal = !verifyDatas[0].isOpenModal;
		}
		else {
			toast.error(jsonResult.content);
		}
	}

	//You can Card verify using this function.
	const onConformCardVerify = async (verifyData : any) => {
	    // This is the api to save user verify information -->

		//Get verify detail information from model.
		const receiveData = await JSON.parse(verifyData.detail);
		//Send request to back-end to verify information.
		const result = await fetch('/api/conformCardVerify', {
			method: 'POST',
				headers: {
				'Content-Type': 'application/json'
				},
			body: JSON.stringify({cardId: receiveData.selectedId, cardNumber: receiveData.cardNumber, cardOwner: receiveData.cardOwner})
		});

		//Receive reponse from back-end and check state.
		const jsonResult = await result.json();
		if (jsonResult.status == false) {
			toast.error(jsonResult.content);
		}
		else {
		//Update withdraw card information conform state.
		withdrawCards.forEach((item) => {
			if (item.id == receiveData.selectedId) {
				item.isConform = true;
			}
		})
		//Save withdraw card information to store.
		$WithdrawInfo = JSON.stringify(withdrawCards);
		//Get cards has verified inforamtion for withdraw model.
		let temp = withdrawCards.filter((item) => {
			return item.isConform == false && item.type == 1;
		})
		if (temp.length == 0) {
			verifyDatas[1].isPass = true;
		}
		//if withdraw is success, update user squirrel coin amount and then save the data has updated.
		userInfo.squirrel_coin = parseInt(userInfo.squirrel_coin) - 250;
		$IsChanged = true;
		$UserInfo = JSON.stringify(userInfo);
		verifyDatas[1].isOpenModal = !verifyDatas[1].isOpenModal;
	}

	}

	//This is hook function to get user inforamtion from store.
	$: {
		if ($UserInfo) {
			userInfo = JSON.parse($UserInfo);
			squirrelCoinToRuble = parseInt($Squirrel_Cost) * userInfo.squirrel_coin;
		}
	}
</script>

<IDVerify
	IsOpen={verifyDatas[0].isOpenModal}
	on:onConform={(verifyData) => {
		onConformIdVerify(verifyData)
	}}
	on:onClose={() => (verifyDatas[0].isOpenModal = !verifyDatas[0].isOpenModal)}
/>
<DetailVerify
	IsOpen={verifyDatas[1].isOpenModal}
	on:onConform={(verifyData) => {
		onConformCardVerify(verifyData)
	}}
	on:onClose={() => (verifyDatas[1].isOpenModal = !verifyDatas[1].isOpenModal)}
/>
<div class="wallet-container gap-4">
	<div class="w-full flex justify-center items-center">
		<Title Title="Кошелек" />
	</div>
	<div class="flex flex-col gap-4 wallet-box">
		<YourWallet YourRuble={squirrelCoinToRuble} />

		{#each verifyDatas as data}
			{#if data.isPass}
				<PassNotification Content={data.passContent} />
			{/if}

			{#if data.isPass == false}
				<Notification
					IsCrown={false}
					IsWarning={true}
					Title={data.title}
					Content={data.content}
					ConformText={data.conformText}
					on:onConfirm={() => verify(data.step)}
				/>
			{/if}
		{/each}

		<div class="gap-4 flex flex-col justify-center items-center">
			<p class="my-coin-text">Мои монеты</p>
			<CoinInfo
				CoinName="Squirrel Coin"
				IsSquirrelCoin={true}
				CoinAmount={userInfo.squirrel_coin}
				CoinValue={squirrelCoinToRuble}
			/>
			<CoinInfo CoinName="TRX" IsTRXCoin={true} CoinAmount={userInfo.tron_coin} CoinValue={0} />
		</div>
	</div>
</div>

<style>
	.wallet-container {
		padding: 24px 16px 0 16px;
		display: flex;
		flex-direction: column;
	}

	.my-coin-text {
		font-family: Gilroy;
		font-size: 16px;
		font-weight: 700;
		line-height: 20px;
		text-align: center;
		color: #828998;
	}

	.wallet-box {
		max-height: calc(100vh - 233px);
		scrollbar-width: none;
		overflow: auto;
	}

	.wallet-box::-webkit-scrollbar {
		display: none;
	}
</style>
