<script>
  import TRXCoin from "./../../icon/WalletIcons/TRXCoin.svelte";
  import SquirrelCoin from "$lib/icon/WalletIcons/SquirrelCoin.svelte";

  export let IsTRXCoin = false;
  export let IsSquirrelCoin = false;
  export let CoinName = "";
  export let CoinAmount = 0;
  export let CoinValue = 0;
</script>

<div class="coin-container">
  {#if IsTRXCoin == true}
      <TRXCoin />
  {/if}
  {#if IsSquirrelCoin == true}
      <SquirrelCoin />
  {/if}
  <div class="coin-information">
    <p class="coin-text">{CoinName}</p>
    <div class="d-flex gap-1 flex-col">
      <p class="coin-amount-text">{CoinAmount}</p>
      <p class="coin-value-text">{CoinValue} ₽</p>
    </div>
  </div>
</div>

<style>
  .coin-container {
    width: 100%;
    height: 82px;
    padding: 16px;
    gap: 10px;
    border-radius: 8px;
    opacity: 0px;
    border: 1px solid #283454;
    background: #ffffff0a;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .coin-information {
    width: 100%;
    height: 40px;
    gap: 16px;
    opacity: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .coin-text {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
    color: white;
  }

  .coin-amount-text {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: right;
    color: #3c9ef5;
  }

  .coin-value-text {
    font-family: Gilroy;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    text-align: right;
    color: #828998;
  }
</style>
