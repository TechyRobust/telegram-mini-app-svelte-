<script>
	import { setCookie } from 'svelte-cookie';
	import CoinButton from '$lib/components/Home/CoinButton.svelte';
	import CoinUser from '$lib/components/Market/CoinUser.svelte';
	import Tron from '$lib/components/Market/Tron.svelte';
	import Title from '$lib/components/Home/Title.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import { HeaderState, IsLoading } from '../../store/store';
	import { UserInfo, IsChanged } from '../../store/userinfo';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import Modal from '$lib/components/Home/Modal.svelte';
	import Booster from '$lib/icon/ComponentIcons/Booster.svelte';

	export let data;
	//This will get card information
	/**
	 * @type {any[]}
	 */
	let userCards = [];

	//This value will include user information.
	let userInfo = {};

	//If this value is true, the modal to improve or buy card will be open.
	let isOpenModal = false;
	//This value will be card avatar image url to improve or buy card model.
	let cardAvatar= "";
	//This value will be card cost to improve or buy card model.
	let cardCost = "";
	//This value will be card title to improve or buy card model.
	let cardTitle = "";
	//This value will be card level to improve or buy card model.
	let cardLevel = "";
	//This value wil be card id to improve or buy card model.
	let cardId = "";
	//This value will be false if not response from back-end.
	//When have response from back-end, this value will be true.
	let isPossible = true;

	//In here, some value will init.
	//And current page url will be saved in database.
	onMount(async () => {
		//Set cookie currnet page url.
		setCookie('url', '/market', 60 * 60 * 24 * 30);

		//save current page url to database.
		fetch('/api/saveUrl', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			})
				
		//Set current page header state
		$HeaderState = 2;

		//Get card information from back-end.
		userCards = JSON.parse(data.userCards);

		//Get user information from store.
		if ($UserInfo) {
			userInfo = JSON.parse($UserInfo);
		}
		//loading animation stop.
		$IsLoading = false;
	});

	//This is the card of top step.
	let currentStep = 0;

	//Top button text.
	let marketTypes = [
		{ text: 'Команда', active: true },
		{ text: 'Инфраст', active: false },
		{ text: 'Бустеры', active: false }
	];

	//Next move another marketing
	export const moveStep = (/** @type {number} */ step) => {
		marketTypes.forEach((e) => (e.active = false));
		marketTypes[step].active = true;
		currentStep = step;
	};

	//Show model to improve or buy card.
	const improveCard = (/** @type {any} */ id, avatar, name, cost, level) => {
		cardId = id;
		cardAvatar = avatar;
		cardCost = cost;
		cardTitle = name;
		isOpenModal = true;
		cardLevel = level;
	};

	//Send request to back-end to buy card.
	const conformCard = async () => {
		//Still, this page dosen't receive response from back-end, it is impossible to send request to back-end.
		if (isPossible == false) return;
		//Sending request to back-end to improve card.
		isPossible = false;
		
		//Send request to back-end to improve card.
		 const result = await fetch('/api/improveCard', {
		 	method: 'POST',
		 	headers: {
		 		'Content-Type': 'application/json'
		 	},
		 	body: JSON.stringify({ card_id: cardId })
		 });

		 //receive response from back-end.
		 const jsonResult = await result.json();
		 //Imporve card is failed.
		 if (jsonResult.status == false) {
		 	toast.error(jsonResult.content);
		 } else {

		 	//If success, update user information and card information.
		 	$IsChanged = true;
		 	$UserInfo = jsonResult.updateUser;
		 	userCards = JSON.parse(jsonResult.updateCard);
		 	toast.success('Success!!!');
			isOpenModal = false;
		}
		//receive response from back-end, it is possible to send request to back-end.
		isPossible = true;
		 
	}

	//Close model to improve or buy card model.
	const closeModal = () => {
		isOpenModal = false;
	}

	//Hook function to get user information from store.
	$: {
		if ($UserInfo) {
			userInfo = JSON.parse($UserInfo);
		}
	}
</script>

{#if isOpenModal == true}
	<Modal on:onClick={closeModal} on:onKeyDown={closeModal}>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="isCheck-modal" on:click|stopPropagation on:keydown|stopPropagation>
			<div class="check-avatar">
				<img src={cardAvatar} alt="">
			</div>
			<div class="check-title">
				<p>{cardTitle}</p>
			</div>
			<div class="check-level-title">
				<p>{cardLevel}</p>
			</div>
			<div class="flex gap-3 flex-col">
				<CoinButton IsActive={true} on:onClick={conformCard}>
					<div class="h-8 p-1 flex gap-3 justify-center items-center">
						<Booster />
						<p class="card-cost-text">{cardCost}</p>
					</div>
				</CoinButton>
				<CoinButton btnText="отмена" on:onClick={closeModal}>
					<div class="h-8 p-1 flex gap-3 justify-center items-center">
					</div>
				</CoinButton>
			</div>
			
		</div>
	</Modal>
{/if}
<div class="market-container main-container">
	<Title Title="Маркет" />
	<div class="justify-between flex h-10 mt-4">
		<div class=" w-1/3 px-1">
			<CoinButton
				btnText="Команда"
				IsActive={marketTypes[0].active}
				on:onClick={() => moveStep(0)}
			/>
		</div>
		<div class=" w-1/3 px-1">
			<CoinButton
				on:onClick={() => moveStep(1)}
				btnText="Инфраст"
				IsActive={marketTypes[1].active}
			/>
		</div>
		<div class=" w-1/3 px-1">
			<CoinButton
				on:onClick={() => moveStep(2)}
				btnText="Бустеры"
				IsActive={marketTypes[2].active}
			/>
		</div>
	</div>
	<div class="users-container flex flex-wrap">
		{#if currentStep == 0}
			{#each userCards as card}
				{#if card.role == 1}
					<div class=" w-1/3 p-1 flex justify-center relative">
						{#if parseInt(card.require_user_level) > parseInt(userInfo.level_id)}
							<div class="lock-container">
								<div class="lock-box">
									<div class="icon-lock" style="float: left">
										<div class="lock-top-1" style="background-color: #E5E9EA"></div>
										<div class="lock-top-2"></div>
										<div class="lock-body" style="background-color: #E5E9EA"></div>
										<div class="lock-hole"></div>
									</div>
								</div>
							</div>
						{/if}
						<CoinUser
							UserName={card.card_name}
							Description={card.maxLevel ? card.maxLevel + ' уровень' : 'След. уровень'}
							BoostCost={card.sumbooster ? card.sumbooster : card.boost_coin_amount}
							SquirrelCost={card.sumsquirrel ? card.sumsquirrel : card.squirrel_coin_amount}
							VectorCost={card.sumenergy ? card.sumenergy : card.add_energy}
							AvatarUrl={card.card_avatar}
							BtnText={card.maxLevel ? 'Улучшить' : 'Купить'}
							CardCost={card.sumcost ? card.sumcost : card.cost}
							on:onButtonClick={() => improveCard(card.id, card.card_avatar, card.card_name, card.sumcost ? card.sumcost : card.cost, card.maxLevel ? card.maxLevel + ' уровень' : 'След. уровень')}
						/>
					</div>
				{/if}
			{/each}
		{/if}
		{#if currentStep == 1}
			{#each userCards as card}
				{#if card.role == 2}
					<div class=" w-1/3 p-1 flex justify-center relative">
						{#if parseInt(card.require_user_level) > parseInt(userInfo.level_id)}
							<div class="lock-container">
								<div class="lock-box">
									<div class="icon-lock" style="float: left">
										<div class="lock-top-1" style="background-color: #E5E9EA"></div>
										<div class="lock-top-2"></div>
										<div class="lock-body" style="background-color: #E5E9EA"></div>
										<div class="lock-hole"></div>
									</div>
								</div>
							</div>
						{/if}
						<CoinUser
							UserName={card.card_name}
							Description={card.maxLevel ? card.maxLevel + ' уровень' : 'След. уровень'}
							BoostCost={card.sumbooster ? card.sumbooster : card.boost_coin_amount}
							SquirrelCost={card.sumsquirrel ? card.sumsquirrel : card.squirrel_coin_amount}
							VectorCost={card.sumenergy ? card.sumenergy : card.energy_amount}
							AvatarUrl={card.card_avatar}
							BtnText={card.maxLevel ? 'Улучшить' : 'Купить'}
							CardCost={card.sumcost ? card.sumcost : card.cost}
							on:onButtonClick={() => improveCard(card.id, card.card_avatar, card.card_name, card.sumcost ? card.sumcost : card.cost, card.maxLevel ? card.maxLevel + ' уровень' : 'След. уровень')}
						/>
					</div>
				{/if}
			{/each}
		{/if}
		{#if currentStep == 2}
			<div class="flex flex-col mt-1 gap-4">
				<div class="flex flex-wrap">
					<div class="flex justify-center items-center w-1/3 p-1">
						<Tron />
					</div>
					<div class="flex justify-center items-center w-1/3 p-1">
						<Tron />
					</div>
					<div class="flex justify-center items-center w-1/3 p-1">
						<Tron />
					</div>
				</div>
				<Notification
					Title="Try Premium for Free!"
					Content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor."
					ConformText="Premium"
					IsCrown={true}
				/>
			</div>
		{/if}
	</div>
</div>

<style>
	.market-container {
		padding: 24px 16px 0 16px;
	}

	.users-container {
		margin-top: 5px;
		max-height: calc(100vh - 285px);
		scrollbar-width: none;
		overflow: auto;
	}

	.users-container::-webkit-scrollbar {
		display: none;
	}

	.lock-container {
		position: absolute;
		width: 100%;
		height: 100%;
		padding-bottom: 8px;
		border-radius: 6px;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2;
		padding-left: 4px;
		padding-right: 4px;
	}

	.lock-box {
		background: #0a183fc0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 8px;
	}
	.icon-lock {
		width: 48px;
		height: 48px;
		position: relative;
		overflow: hidden;
	}

	.icon-lock .lock-top-1 {
		width: 40%;
		height: 40%;
		position: absolute;
		left: 50%;
		margin-left: -20%;
		top: 14%;
		background-color: #000;
		border-radius: 40%;
	}

	.icon-lock .lock-top-2 {
		width: 24%;
		height: 40%;
		position: absolute;
		left: 50%;
		margin-left: -12%;
		top: 22%;
		background-color: #151517;
		border-radius: 25%;
	}

	.icon-lock .lock-body {
		width: 60%;
		height: 48%;
		position: absolute;
		left: 50%;
		margin-left: -30%;
		bottom: 11%;
		background-color: #000;
		border-radius: 15%;
	}

	.icon-lock .lock-hole {
		width: 16%;
		height: 16%;
		position: absolute;
		left: 50%;
		margin-left: -8%;
		top: 51%;
		border-radius: 100%;
		background-color: #151517;
	}

	.icon-lock .lock-hole:after {
		content: '';
		width: 43%;
		height: 78%;
		position: absolute;
		left: 50%;
		margin-left: -20%;
		top: 100%;
		background-color: inherit;
	}

	.isCheck-modal {
		width: 200px;
		height: auto;
		background: #19233e;
		padding: 20px;
		gap: 15px;
		display: flex;
		flex-direction: column;
		border-radius: 5px;
	}
	.check-avatar {
		border-radius: 8px;
		width: auto;
		height: 150px;
		overflow: hidden;
	}

	.check-title {
		font-family: Gilroy;
		font-size: 18px;
		font-weight: 900;
		line-height: 16px;
		text-align: left;
		color: rgb(126, 122, 146);
	}

	.check-level-title {
		font-family: Gilroy;
		font-size: 19px;
		font-weight: 900;
		line-height: 19px;
		text-align: left;
		color: rgb(185, 252, 241);
	}

	.card-cost-text {
		font-family: Gilroy;
		font-size: 15px;
		font-weight: 900;
		line-height: 16px;
		text-align: left;
		color: white;
	}
</style>
