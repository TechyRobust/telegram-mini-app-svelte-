<script lang="ts">
	import { IsLevelUp, LevelUpImg } from '../store/store';
	import Money from '$lib/icon/ComponentIcons/BoosterCoin.svelte';
	import { IsLoading, IsAnimate, IsStart, IsFooterLoad, IsMobile } from '../store/store';
	import { IsChanged, UserInfo } from '../store/userinfo';
	import '../app.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Toaster } from 'svelte-french-toast';
	// @ts-ignore
	import Circle from '$lib/components/Loading/Circle.svelte';
	import { getCookie } from 'svelte-cookie';

	export let data;
	let userInfo = {};
	let callBack: any;

	//In here, check auth and then will go page. 404 or home.
	//And from that time, the bonus system will start.
	onMount(async () => {
		if (data.auth == false && $IsMobile == false) {
			goto('/404');
		} else {
			// @ts-ignore
			userInfo = JSON.parse(data.userInfo);
			let now = new Date();
			let nowMill = now.getTime();
			let countTimer = nowMill - parseInt(userInfo.accept_bonus_last_date);
			const num = Math.floor(countTimer / 3600000);
			if (num > 0 && num < 3) {
				let result: any;
				result = await fetch('/api/addSquirrelCoin', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ id: userInfo.id, isfirst: true, coin: num })
				});
				const jsonResult = await result.json();
				$IsChanged = true;
				$UserInfo = jsonResult.updateUser;
			}
			else {
				$IsChanged = true;
				$UserInfo = data.userInfo;
			}

			const inviteBonus = await fetch('/api/acceptInviteBonus', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const afterTime = 3600000 - (countTimer % 3600000);
			setTimeout(() => {
				setInterval(async () => {
					const result = await fetch('/api/addSquirrelCoin', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ id: userInfo.id, isfirst: false })
					});
					const jsonResult = await result.json();
					$IsChanged = true;
					$UserInfo = jsonResult.updateUser;
				}, 3600000);
			}, afterTime);
			// goto("/");
		}
	});


	const getRandomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	$: {
		if ($IsAnimate == true) {
			callBack = setInterval(() => {
				Math.random();
				let x = getRandomInt(1, 400);
				let y = getRandomInt(1, 600);
				//Create new element.
				//And set attribute.
				const newDiv = document.createElement('div');
				const childDiv = document.createElement('div');
				childDiv.classList.add('increase-amount-text');
				newDiv.classList.add('money-animation');
				newDiv.appendChild(childDiv);
				newDiv.style.left = x + 'px';
				newDiv.style.top = y + 'px';
				const container = document.getElementById('animation-class');
				new Money({
					target: newDiv
				});
				// Append the new div to the container
				if (container) {
					container.appendChild(newDiv);
					setTimeout(() => {
						container.removeChild(newDiv);
						$IsAnimate = false;
					}, 1800);
				}
			}, 10);
			setTimeout(() => {
				clearInterval(callBack);
			}, 3000);
		}
		if ($IsLevelUp == true) {
			setTimeout(() => {
				const newDiv = document.createElement('div');
				newDiv.classList.add('avatar-animation-box');
				newDiv.classList.add('image-animation');
				const newImg = document.createElement('img');
				newImg.src = $LevelUpImg;
				newDiv.appendChild(newImg);
				const container = document.getElementById('level-up-animation-class');
				// Append the new div to the container
				if (container) {
					container.appendChild(newDiv);
					setTimeout(() => {
						container.removeChild(newDiv);
						$IsLevelUp = false;
					}, 1800);
				}
			}, 200);
		}
	}
</script>

{#if $IsLevelUp == true}
	<div class="animation-class" id="level-up-animation-class"></div>
{/if}
{#if $IsLoading}
	<div class="spinner-container">
		<Circle />
	</div>
{/if}
{#if $IsAnimate == true}
	<div class="animation-class" id="animation-class"></div>
{/if}

<Toaster />
<div class="app w-full h-screen relative">
	<Header></Header>
	<slot></slot>
	<Footer />
</div>

<style>
	.app {
		background-color: #04081f;
	}

	.spinner-container {
		min-width: 420px;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		z-index: 10000000;
	}
</style>
