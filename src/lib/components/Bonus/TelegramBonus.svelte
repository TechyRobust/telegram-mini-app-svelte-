<script>
  import ImproveButton from "./../Market/ImproveButton.svelte";
  import Telegram from "$lib/icon/BonusIcons/Telegram.svelte";
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

  const handleCheck = () => {
		dispatch('onCheck');
	};

  const handleGoto = () => {
    dispatch('onGoTo');
  }
</script>

<div class="telegram-bonus-container flex justify-between">
  <div class="telegram-icon-box">
    <div>
      <Telegram />
    </div>
    <p class="content-text">Подписаться на наш telegaram</p>
  </div>
  <div class="type-btn-group-box flex flex-col">
    <ImproveButton Text="Перейти" on:onClick={handleGoto} />
    <ImproveButton Text="Проверить" on:onClick={handleCheck} />
  </div>
</div>

<style>
  .telegram-bonus-container {
    width: 100%;
    height: 102px;
    padding: 16px;
    gap: 10px;
    border-radius: 8px;
    opacity: 0px;
    background: #ffffff0a;
    border: 1px solid #283454;
  }

  .type-btn-group-box {
    width: 127px;
    height: 70px;
    gap: 10px;
    opacity: 0px;
  }

  .telegram-icon-box {
    gap: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .telegram-icon-box > :first-child {
    width: 50px;
    height: 50px;
  }

  .content-text {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
    color: #ffffff;
  }
</style>
