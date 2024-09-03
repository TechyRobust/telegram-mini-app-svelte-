<script>
  import ThreeLevel from "$lib/icon/MainIcons/ThreeLevel.svelte";
  import Modal from "./Modal.svelte";
  import { createEventDispatcher } from "svelte";
  import CancelIcon from "$lib/icon/CancelIcon.svelte";
  import Money from "$lib/icon/ComponentIcons/BoosterCoin.svelte";
  import Booster from "$lib/icon/ComponentIcons/Booster.svelte";
  import Vector from "$lib/icon/MainIcons/Vector.svelte";
  import NextArrow from "./NextArrow.svelte";
  import PrevArrow from "./PrevArrow.svelte";
  import { onMount } from "svelte";

  export let IsOpen = false;
  export let CurrentLevel = 0;
  export let SquirrelInformation = "";
 

  const dispatch = createEventDispatcher();
  /**
	 * @type {{ url: any; }[] | { url: string; }[][]}
	 */
  let squirrelsInformation = []


  $: {
    squirrelsInformation = JSON.parse(SquirrelInformation);
  }

  onMount(() => {
    
  })

  const handleClick = () => {
    dispatch("onClose");
  };

  const nextSquirrel = () => {
if (CurrentLevel < squirrelsInformation.length - 1) CurrentLevel ++;
  }

  const prevSquirrel = () => {
    if (CurrentLevel > 0) CurrentLevel --;
  }
</script>

{#if IsOpen}
  <Modal on:onClick={handleClick} on:onKeyDown={handleClick}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="level-container"
      on:click|stopPropagation
      on:keydown|stopPropagation
    >
      <div class=" relative level-box">
        <p class="level-text">{CurrentLevel + 1} level</p>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class=" absolute top-5 right-5" on:click={handleClick}>
          <CancelIcon />
        </div>
        <button class=" absolute prev-arrow" on:click={prevSquirrel}>
          <PrevArrow />
        </button>
        <button class=" absolute next-arrow" on:click={nextSquirrel}>
          <NextArrow />
        </button>
        <button class="squirrel-avatar-box">
          <img src={squirrelsInformation[CurrentLevel].squirrel_url} alt="">
        </button>
        <p class="income-text">Ваша доходность</p>
        <div class="income-information-box">
          <div class="income-item flex flex-col gap-4">
            <div class="income-information">
              <p class="info-text">В час</p>
              <div class="money-box flex">
                <p class="money-number">{squirrelsInformation[CurrentLevel].boost_coin}</p>
                <Booster />
              </div>
            </div>
            <div class="income-line-box"></div>
          </div>
          <div class="income-item flex flex-col gap-4">
            <div class="income-information">
              <p class="info-text">За тап</p>
              <div class="money-box flex">
                <p class="money-number">+ {squirrelsInformation[CurrentLevel].per_tap}</p>
              </div>
            </div>
            <div class="income-line-box"></div>
          </div>
          <div class="income-item flex flex-col gap-4">
            <div class="income-information">
              <p class="info-text">Энергия</p>
              <div class="money-box flex">
                <p class="vector-number">{squirrelsInformation[CurrentLevel].useful_energy}</p>
                <div class=" w-5 h-5">
                  <Vector />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
{/if}

<style>
  .level-container {
    width: 343px;
    height: 473px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .level-box {
    width: 293px;
    height: 473px;
    gap: 20px;
    border-radius: 8px;
    opacity: 0px;
    background: #19233e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .level-text {
    height: 24px;
    top: 189px;
    left: 162px;
    gap: 0px;
    opacity: 0px;
    font-family: Gilroy;
    font-size: 17px;
    font-weight: 700;
    line-height: 24px;
    color: white;
    text-align: center;
  }

  .income-text {
    height: 20px;
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
    color: #828998;
  }

  .income-information-box {
    width: 253px;
    height: 124px;
    gap: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }

  .income-item {
    width: 253px;
    height: 36px;
    gap: 16px;
  }

  .income-information {
    width: 253px;
    height: 20px;
    justify-content: space-between;
    display: flex;
  }

  .info-text {
    height: 20px;
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
    color: white;
  }

  .money-box {
    height: 20px;
    gap: 10px;
  }

  .money-number {
    height: 20px;
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
    color: white;
  }

  .income-line-box {
    width: 253px;
    border: 1px solid #ffffff26;
  }

  .vector-number {
    height: 20px;
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
    color: #97dd01;
  }

  .prev-arrow {
    top: 144px;
    left: -16px;
  }

  .next-arrow {
    top: 144px;
    right: -16px;
  }

   .squirrel-avatar-box {
    width: 205px;
    height: 205px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .squirrel-avatar-box>img {
    width: 100%;
    position: relative;
  }
</style>
