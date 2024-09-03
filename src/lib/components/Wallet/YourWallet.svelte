<script>
  import Bank from "$lib/icon/WalletIcons/Bank.svelte";
  import Translate from "$lib/icon/WalletIcons/Translate.svelte";
  import History from "$lib/icon/WalletIcons/History.svelte";
  import { goto } from "$app/navigation";

  export let YourRuble = 0

  export const goToWithdraw = () => {
    goto("/withdraw");
  };


</script>

<div class="your-wallet-container flex flex-col items-center justify-center">
  <p class="wallet-title-text">Текущий баланс</p>
  <div class="wallet-amount-box flex justify-center items-center">
    <p class="wallet-amount-text">{YourRuble} ₽</p>
  </div>
  <div class="wallet-tool-box justify-center items-center">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="wallet-tool-ele">
      <!-- svelte-ignore missing-declaration -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a href="/wallet/withdraw">
        <Bank />
      </a>
      <p class="wallet-tool-ele-text">Вывести</p>
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="wallet-tool-ele">
      <!-- svelte-ignore missing-declaration -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a href="/wallet/transfer">
        <Translate />
      </a>
      <p class="wallet-tool-ele-text">Перевести</p>
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="wallet-tool-ele">
      <!-- svelte-ignore missing-declaration -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a href="/wallet/history">
        <History />
      </a>
      <p class="wallet-tool-ele-text">История</p>
    </div>
  </div>
</div>

<style>
  .your-wallet-container {
    width: 100%;
    height: 260px;
    gap: 10px;
    padding: 32px 16px 32px 16px;
    border-radius: 8px;
    opacity: 0px;
    border: 1px solid #283454;
  }

  .wallet-title-text {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
    color: #828998;
  }

  .wallet-amount-box {
    width: 100%;
    height: 260px;
    gap: 10px;
    opacity: 0px;
  }

  .wallet-amount-text {
    font-family: Gilroy;
    font-size: 40px;
    font-weight: 600;
    line-height: 60px;
    text-align: center;
    color: #97dd01;
  }

  .wallet-tool-box {
    width: 100%;
    height: 96px;
    gap: 25px;
    display: flex;
  }

  .wallet-tool-ele {
    width: 65px;
    height: 96px;
    gap: 15px;
    opacity: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .wallet-tool-ele-text {
    font-family: Gilroy;
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;
    text-align: left;
    color: #ffffff;
  }
</style>
