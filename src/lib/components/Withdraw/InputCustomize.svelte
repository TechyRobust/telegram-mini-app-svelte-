<script lang="ts">
	import { createEventDispatcher } from 'svelte';

  // ... rest of the code

  export let IsBankNumber = false;
  export let IsCardNumber = false;
  export let IsAmount = false;
  export let IsGeneral = false;
  export let IsDatepicker = false;
  export let AmountText = "";
  export let PlaceholderText = "";
  export let InputText = "";

  const dispatch = createEventDispatcher();
  const handleClick = () => {
    dispatch("onClick");
  };

  const handleChange = () => {
    dispatch("onChange");
  }

  function formatCardNumber() {
    // Remove non-digit characters
    let value = InputText.replace(/\D/g, "");

    // Add spaces every 4 digits
    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += value[i];
    }

    InputText = formattedValue.trimStart();
  }
</script>

{#if IsCardNumber == true}
  <div class="customer-amount-box flex justify-between items-center">
    <input
      type="text"
      class="creadit-card-input"
      bind:value={InputText}
      on:change={handleChange}
    />
    <button on:click={handleClick} class="max-text">{AmountText}</button>
  </div>
{/if}
{#if IsBankNumber == true}
  <div class="customer-input-box">
    <input
      type="text"
      class="creadit-card-input"
      maxlength="19"
      bind:value={InputText}
      on:input={formatCardNumber}
      placeholder={PlaceholderText}
    />
  </div>
{/if}
{#if IsAmount}
  <div class="customer-amount-box flex justify-between items-center">
    <input
      type="number"
      class="creadit-card-input"
      placeholder={PlaceholderText}
      bind:value={InputText}
      on:change={handleChange}
    />
    <button on:click={handleClick} class="max-text">{AmountText}</button>
  </div>
{/if}
{#if IsGeneral}
  <div class="customer-amount-box flex justify-between items-center">
    <input
      type="text"
      class="creadit-card-input"
      placeholder={PlaceholderText}
      bind:value={InputText}
    />
  </div>
{/if}
{#if IsDatepicker == true}
  <div class="customer-amount-box flex justify-between items-center">
    <input
      type="date"
      class="creadit-card-input"
      bind:value={InputText}
    />
   
  </div>
{/if}

<style>
  .customer-input-box {
    width: 100%;
    height: 52px;
    gap: 10px;
    border-radius: 8px;
    background: #ffffff0a;
    border: none;
    position: relative;
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 20px 16px 20px;
  }
  .creadit-card-input {
    width: 100%;
    font-size: 16px;
    border: none;
    border-radius: 0;
    background-color: transparent;
    color: #fff;
    text-align: left;
    letter-spacing: 2px;
  }

  .creadit-card-input::placeholder {
    color: #a1a1a1;
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
  }

  .creadit-card-input:focus {
    outline: none;
    border: none;
  }

  .customer-amount-box {
    width: 100%;
    height: 52px;
    padding: 16px 20px 16px 20px;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid #283454;
    background: #ffffff0a;
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
  }

  .max-text {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: right;
    color: #3c9ef5;
  }
</style>
