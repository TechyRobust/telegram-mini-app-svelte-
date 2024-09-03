<script lang="ts">
  import CoinButton from "$lib/components/Home/CoinButton.svelte";
  import Title from "$lib/components/Home/Title.svelte";
  import PaymentType from "$lib/components/History/PaymentType.svelte";
  import { IsFooter, HeaderState } from "../../../store/store";
  import { onMount } from "svelte";

  export let data;
  //This value will be transaction histories.
  //including bank and trc etc.
  let transactionHistories: any = [];
  //These values are top button state in wallet page.
  let isFirstActive = true;
  let isSecondActive = false;

  //This function will be called when history page load.
  onMount(async () => {
    //Set header and footer state.
    $IsFooter = false;
    $HeaderState = 3;
    //Get transaction histories from server.
    transactionHistories = JSON.parse(data.transactionHistory);
  });

  //Move top button state.
  const moveStep = (step) => {
    if (step == 1) {
      isFirstActive = true;
      isSecondActive = false;
    }
    else {
      isFirstActive = false;
      isSecondActive = true;
    }
  }
</script>

<div class="payment-history-container flex flex-col gap-4">
  <Title Title="История" />
  <div class="history-type-btn-group flex justify-center items-center">
    <CoinButton IsActive={isFirstActive} btnText="Вывод" on:onClick={() => moveStep(1)}/>
    <CoinButton IsActive={isSecondActive} btnText="Перевод" on:onClick={() => moveStep(2)}/>
  </div>
  <div class="history-detail-group">
    {#if isFirstActive == true}
     {#each transactionHistories as item}
        {#if item.type == 1}
          <PaymentType IsProcessing={`${item.withdraw_state}`} Type={item.type} CardAvatar={item.image_url} WithdrawDate={item.withdraw_date} CardName={item.name} CardNumber={item.card_number} Amount={item.withdraw_amount} />
        {/if}
    {/each} 
    {/if}
    {#if isSecondActive == true}
      {#each transactionHistories as item}
          {#if item.type == 2}
            <PaymentType IsProcessing={`${item.withdraw_state}`} Type={item.type} CardAvatar={item.image_url} WithdrawDate={item.withdraw_date} CardName={item.name} CardNumber={item.card_number} Amount={item.withdraw_amount} />
          {/if}
      {/each}
    {/if}
  </div>
</div>

<style>
  .payment-history-container {
    padding: 24px 16px 0 16px;
    display: flex;
    flex-direction: column;
  }

  .history-type-btn-group {
    width: 100%;
    height: 40px;
    gap: 11px;
  }

  .history-detail-group {
    width: 100%;
    height: calc(100vh - 203px);
    gap: 16px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
</style>
