<script lang="ts">
  import TRCUSDT from "$lib/icon/History/TRCUSDT.svelte";
  import TBank from "$lib/icon/WithdrawIcons/TBank.svelte";
  import AlfaBank from "$lib/icon/History/AlfaBank.svelte";
  import HistoryButton from "./HistoryButton.svelte";
  import Visa from "$lib/icon/WalletIcons/VISA.svelte";
	import { onMount } from "svelte";
	import CancelIcon from "$lib/icon/CancelIcon.svelte";
  import { Squirrel_Cost } from "../../../store/store";

  export let Type = "";
  export let IsProcessing = "";
  export let Text = "";
  export let WithdrawDate = "";
  export let CardNumber = "";
  export let Amount = "";
  export let CardName:any;
  export let CardAvatar = "";
  
  let IsSuccess = false;
  let IsCanceled = false;
  let IsSendding = false;
  let withdrawAmount:any;
  let unit = "₽";
  onMount(() => {
    if (IsProcessing == "1") {
      IsSendding = true;  
      Text = "в обработке"
    }
    else if (IsProcessing == "2") {
      IsSuccess = true;
      Text = "успешно"
    }
    else if (IsProcessing == "3") {
      IsCanceled = true;
      Text = "отменено"
    }
    if (Type == "1") {
      let lastNumber = CardNumber.slice(-4);
      CardNumber = `${CardNumber.slice(0, 4)} **** **** ${lastNumber}`;
      withdrawAmount = parseInt(Amount) * parseInt($Squirrel_Cost);
      unit = "₽";
    }
    else if (Type == "2") {
      let lastNumber = CardNumber.slice(-9);
      CardNumber = `${CardNumber.slice(0, 9)}****${lastNumber}`;
      withdrawAmount = Amount;
      unit = "$";
    }
    const date = new Date(parseInt(WithdrawDate));
    WithdrawDate = `${date.getMonth() + 1}.${date.getDate()} в ${date.getHours()}:${date.getMinutes()}`;
  })
</script>

<div class="tbank-container">
  <div class="tbank-information flex flex-col">
    <div class="flex justify-between">
      <div class="flex gap-2 items-center">
           <div class="w-5 h-5 flex justify-center items-center">
              <img src={CardAvatar} alt="">
            </div>
          <p class="tbank-text">{CardName}</p>
      </div>
      <div class="flex gap-1">
        <p class="tbank-amount-text">{withdrawAmount}</p>
        <p class="unit-text">{unit}</p>
      </div>
    </div>
    <div class="flex justify-between">
      <p class="history-detail-text">{CardNumber}, {WithdrawDate}</p>
      <HistoryButton
        Success={IsSuccess}
        Processing={IsSendding}
        Canceled={IsCanceled}
        {Text}
      />
    </div>
  </div>
  <div class="line-class"></div>
</div>

<style>
  .tbank-container {
    width: 100%;
    height: 74px;
    gap: 16px;
    display: flex;
    flex-direction: column;
  }

  .tbank-information {
    height: 58px;
    gap: 10px;
    display: flex;
    width: 100%;
  }

  .tbank-text {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    text-align: left;
    color: white;
  }

  .tbank-amount-text {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
    color: white;
  }

  .unit-text {
    font-family: Gilroy;
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
    color: #828998;
  }

  .history-detail-text {
    font-family: Gilroy;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    text-align: left;
    color: #828998;
  }

  .line-class {
    width: 100%;
    height: 1px;
    border: 1px solid #ffffff26;
  }
</style>
