<script lang="ts">
	import { IsChanged, UserInfo } from './../../store/userinfo';
	import MoneyButton from '$lib/components/Home/MoneyButton.svelte';
	import { Progressbar } from 'flowbite-svelte';
	import Question from '$lib/icon/MainIcons/Question.svelte';
	import Vector from '$lib/icon/MainIcons/Vector.svelte';
	import Level from '$lib/components/Home/Level.svelte';
	import { IsFooter, IsHeader, HeaderState, IsLoading, IsLevelUp, LevelUpImg } from '../../store/store';
	import { onDestroy, onMount } from 'svelte';
	import { setCookie, getCookie } from 'svelte-cookie';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';

	
	//This value will get data from .server.ts file for this page.
	// @ts-ignore
	export let data;

	//This value will count tap click count.
	let challengeCount = 0;
	//This value will have progress value for user level.
	let progressCount = 0;
	//This value will be used to limit 'onDestory'.
	let isStart = false;
	//This value will get user information from 'Cookie'
	let userInfo : any = {};
	//This value will get user from back-end.
	let userLevel : any = {};
	//This value will get the amount to increase energy per second for user.
	let sumEnergy : any = 0;
	//This value will get the amount to increase Squirrel Coin per clicking tap for user.
	let perTap = 0;
	//This value will have user current level.
	//Using this, the center for screen, I can select Squirrel avatar.
	let currentLevel : any = 0;
	//This value will have Squirrel avatar url.
	//Using this, Squirrel avatar will be changed automatically improving user level.
	let currentAvatar : any = "";
	  /**
	 * @type {{ url: any; }[] | { url: string; }[][]}
	 */
	//This array will be have Squirrel avatar's urls.
	//There are 10 urls for Squirrel.
	 let squirrelsInformation: any = []
	 let IsOpen = false;
	 let isPossible : any = true;

	 //In here, almost values will init.
	 //Save data when browser close, 
	 onMount(async () => {
		if (data.homeAuth == false) {
			goto('/404');
			return;
		}
		//Set Cookie count is 0
		setCookie('count', 0);
		setCookie('url', '/home', 60 * 60 * 24 * 30);
		fetch('/api/saveUrl', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			})
		window.onbeforeunload = () => {
				// @ts-ignore
			setCookie("count", challengeCount);
			updateUserInfo(challengeCount, userInfo.count, userInfo.energy, userInfo.target_count);
			fetch('/api/changeInviteBonus', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({tid: getCookie("hash")})
			})
		}
		$IsFooter = true;
		$IsHeader = true;
		$HeaderState = 1;
		isStart = true;
		let hashValue = getCookie("hash");
		if (hashValue) {
			userInfo = JSON.parse(data.currentUser);
			//Set per tap experience
			perTap = userInfo.per_tap;
			//Set add energy per second
			sumEnergy = userInfo.default_add_energy
			if (userInfo.sumenergy) sumEnergy = parseInt(sumEnergy) + parseInt(userInfo.sumenergy);
			//Set progress for progress bar.
			if (userInfo.count == 0) {
				progressCount = 0;
			}
			else {
				progressCount = Math.round(parseInt(userInfo.count) / parseInt(userInfo.target_count) * 100);
			}
			//Set current user level
			currentLevel = parseInt(userInfo.level_id) - 1;

			//Set add energy.
			const date = new Date();
			let addEnergy = Math.round((date.getTime() - parseInt(userInfo.last_date)) / 1000);
			userInfo.energy += addEnergy;

			if (userInfo.energy > parseInt(userInfo.useful_energy)) userInfo.energy = parseInt(userInfo.useful_energy);

			//get each level information
			const result = await fetch('/api/getCardInformation', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
			});

			//Set cards level information
			squirrelsInformation = JSON.parse((await result.json()).cards);
			//Set current level avatar
			currentAvatar = squirrelsInformation[currentLevel].squirrel_url;
			//Disable loading
			$IsLoading = false;
			
			
		}
		else {
			goto("/404");
		}
	 })

	 //When close this page, this will be called automatically.
	//In here, user data will be saved in database using 'updateUserInfo' function.
	onDestroy(() => {
		if (isStart == true) {
			let hashValue = getCookie('hash');
			if (hashValue) {
				setCookie("count", challengeCount);
				updateUserInfo(challengeCount, userInfo.count, userInfo.energy, userInfo.target_count);
				challengeCount = 0;
			}
		}
	});
	
	//When user click question icon, this function will be called.
	//The 'IsOpen' value is used by this, and here, 'IsOpen' will be true.
	//If 'IsOpen' is true, the model displaying Squirrel information will be display.
	//Else, disappear.
	const showHelpModal = () => {
		IsOpen = true;
	};

	//When user click question icon, this function will be called.
	//The 'IsOpen' value is used by this, and here, 'IsOpen' will be false.
	//If 'IsOpen' is true, the model displaying Squirrel information will be display.
	//Else, disappear.
	const closeHeleModal = () => {
		IsOpen = false;
	};

	//When click tap, this will be called.
	//Squirrel Coin will increase.
	//Increasing amount relate the card improved by user and user level.
	//When User level raise next level, this will call 'updateUserInfo' function.
	const improveLevel = async (event : any) => {
		if (currentLevel >= 9 && userInfo.count == userInfo.target_count) return;
		if (isPossible == false) return;
		if (userInfo.energy != 0) {
			if (navigator.vibrate) {
                	// Вибрация длительностью 200 миллисекунд
 				navigator.vibrate(200);
			} else {
 				console.log("Vibration API is not supported by this browser.");
			}
			//Decrease user energy.
			userInfo.energy = parseInt(userInfo.energy) - 1;
			perTap = userInfo.per_tap;
			//Increase challenge
			challengeCount ++;
			//Set per tap.
			sumEnergy = parseInt(userInfo.default_add_energy);
			if (userInfo.sumenergy) sumEnergy = parseInt(sumEnergy) + parseInt(userInfo.sumenergy);
			userInfo.count = parseInt(userInfo.count) + 1;
			//Set progress for progress bar.
			progressCount = Math.round(parseInt(userInfo.count) / parseInt(userInfo.target_count) * 100);
			//When level up....
			if (userInfo.count >= userInfo.target_count) {
				isPossible = false;
				setCookie("count", `${challengeCount}`);
				const result = await updateUserInfo(challengeCount, userInfo.count, userInfo.energy, userInfo.target_count);
				if (result.status == "failed") {
					toast.error("You can't improve your level")
					goto("/404");
				}
				else {
					$IsChanged = true;
					$UserInfo = result.updateUser;
					userInfo = JSON.parse($UserInfo);
					challengeCount = 0;
					currentLevel ++;
					if (currentLevel < 10) {
						currentAvatar = squirrelsInformation[currentLevel].squirrel_url;
						progressCount = 0;
					}
					$LevelUpImg = squirrelsInformation[currentLevel - 1].squirrel_url;
					$IsLevelUp = true;
				}
				isPossible = true;
			}
			//When click tap, start animation.
			//Get mouse position.
			let x = event.clientX;
			let y = event.clientY;
			//Create new element.
			//And set attribute.
			const newDiv = document.createElement('div') as HTMLDivElement;
			const childDiv = document.createElement('div') as HTMLDivElement;
			childDiv.textContent = "+" + perTap;
			childDiv.classList.add("increase-amount-text");
			newDiv.classList.add("animation-test");
			newDiv.appendChild(childDiv);
			newDiv.style.left = x + "px";
			newDiv.style.top = y + "px";
			const container = document.getElementById('squirrel-container');
			// Append the new div to the container
			if (container) {
				container.appendChild(newDiv);
				setTimeout(() => {
					container.removeChild(newDiv);
				}, 1800);
			}
		}
	}

	// This will send data changing in Home page including Squirrel Coin, Challenge, Energy.
	//API: "/api/increaseStep"
	//Response: This will get the data was updated from API. 
	const updateUserInfo = async (newChallenge: any, userCount: any, newEnergy: any, levelCount: any) => {
		const result = await fetch('/api/increaseStep', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ count: newChallenge, userCount: userCount, energy: newEnergy, levelCount: levelCount })
		});
		return await result.json();
	}

	//User Energy will increase with this function.
	//If user improve card, energy increasing amount will be improve.
	setInterval(() => {
		// @ts-ignore
		userInfo.energy += parseInt(sumEnergy);
		if (userInfo.energy > parseInt(userInfo.useful_energy)) userInfo.energy = parseInt(userInfo.useful_energy);
	}, 1000);

	//This hook function will be called when User Information change
	//And update userInfo value for home page.
	$:{
		if ($UserInfo && $IsChanged == true) {
			userInfo = JSON.parse($UserInfo);
		}
	}
	
</script>

<Level {IsOpen} on:onClose={closeHeleModal} CurrentLevel={currentLevel} SquirrelInformation={JSON.stringify(squirrelsInformation)} />
<div class="p-home main-container flex flex-col gap-6">
	<div class="container flex gap-3">
		<div class="w-1/3 justif-center items-center">
			<p class="top-money-text mb-2">Доступно</p>
			<div class=" h-16">
				<MoneyButton Text={userInfo.squirrel_coin}/>
			</div>
		</div>
		<div class="w-1/3">
			<p class="top-money-text mb-2">Улучшения</p>
			<div class=" h-16">
				<MoneyButton Type={2} Text={userInfo.boost_coin}/>
			</div>
		</div>
		<div class="w-1/3">
			<p class="top-money-text mb-2">Навывод</p>
			<div class=" h-16">
				<MoneyButton Type={3} Text={userInfo.tron_coin}/>
			</div>
		</div>
	</div>
	<div class="flex h-screen flex-col justify-center items-center p-6 gap-3 w-full">
		<div class="w-full flex justify-between">
			<div class="flex">
				<p class="level-number-text mr-3">{userInfo.level_id}</p>
				<p class="level-text">level</p>
			</div>
			<p class="progress-text">{progressCount}%</p>
		</div>
		<div class="w-full">
			<!-- <Progressbar
				progress={progressCount}
				labelInside
				animate={true}
				color="green"
				labelInsideClass="bg-progress text-blue-100 text-xs text-center font-medium text-center p-0 leading-none rounded-full"
				class="my-4 customer-progress-bg"
			/> -->
			<div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
				<div class="bg-progress h-2.5 rounded-full" style={`width: ${progressCount}%`}></div>
			</div>
		</div>
		<div id="squirrel-container" class="w-full relative flex justify-center">
			<button class="squirrel-avatar-box" on:click={(event) =>improveLevel(event)}>
				<img src={currentAvatar} draggable="false" alt="" loading="lazy">
			</button>
			<button class=" absolute right-0" on:click={showHelpModal}>
				<Question />
			</button>
		</div>
		<div class="flex justify-center w-full gap-3 mt-5">
			<div class=" h-6 w-6">
				<Vector />
			</div>
			<div class="gold-text">{userInfo.energy}</div>
			<div class="value-text">/</div>
			<div class="value-text">{userInfo.useful_energy}</div>
		</div>
	</div>
</div>

<style>
	.top-money-text {
		font-family: Gilroy;
		font-size: 14px;
		font-weight: 500;
		line-height: 16px;
		text-align: center;
		color: #828998;
	}

	.level-number-text {
		font-family: Gilroy;
		font-size: 16px;
		font-weight: 700;
		line-height: 20px;
		text-align: right;
		color: white;
		text-align: center;
	}

	.level-text {
		font-family: Gilroy;
		font-size: 14px;
		font-weight: 500;
		text-align: left;
		color: #828998;
		text-align: center;
	}

	.progress-text {
		font-family: Gilroy;
		font-size: 14px;
		font-weight: 700;
		line-height: 16px;
		text-align: right;
		color: #828998;
	}

	.gold-text {
		font-family: Gilroy;
		font-size: 16px;
		font-weight: 700;
		line-height: 24px;
		text-align: center;
		color: #97dd01;
	}

	.value-text {
		font-family: Gilroy;
		font-size: 16px;
		font-weight: 700;
		line-height: 24px;
		text-align: center;
		color: #828998;
	}

	.p-home {
		padding: 24px 16px 0 16px;
	}

	.squirrel-avatar-box {
		width: 275px;
		height: 275px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		position: relative;
	}

	.squirrel-avatar-box > img {
		width: 100%;
		position: relative;
	}

	
</style>
