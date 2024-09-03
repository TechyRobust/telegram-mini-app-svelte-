<script>
  import Checked from "$lib/icon/BonusIcons/Checked.svelte";
  import Money from "$lib/icon/ComponentIcons/BoosterCoin.svelte";
  import { createEventDispatcher } from "svelte";

  export let BonusCost = 100;
  export let BonusChecked = false;
  export let IsPossible = false;
  export let Title = "";

  const dispatch = createEventDispatcher();
  const handleClick = () => {
    dispatch("onClick");
  };
</script>

{#if IsPossible == true}
<button on:click={handleClick} class="bonus-container flex-col flex justify-center items-center">
  {#if BonusChecked == true}
    <Checked />
  {/if}
  {#if BonusChecked == false}
    <p class="bonus-date">{Title}</p>
  {/if}
  <div class="bonus-cost-box flex justify-center items-center">
    <p class="bonus-cost-text mr-1">{BonusCost}</p>
    <Money />
  </div>
</button>
{/if}
{#if IsPossible == false}
<button class="bonus-container-impossible flex-col flex justify-center items-center">
  {#if BonusChecked == true}
    <Checked />
  {/if}
  {#if BonusChecked == false}
    <p class="bonus-date">{Title}</p>
  {/if}
  <div class="bonus-cost-box flex justify-center items-center">
    <p class="bonus-cost-text mr-1">{BonusCost}</p>
    <Money />
  </div>
</button>
{/if}


<style>
  .bonus-container {
    width: 75px;
    height: 75px;
    padding: 6px;
    gap: 4px;
    border-radius: 4px;
    opacity: 0px;
    background: #3c9ef533;
    border: 1px solid #3c9ef5;
  }

  .bonus-cost-box {
    width: auto;
    height: 20px;
    gap: 4px;
  }

  .bonus-cost-text {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
    color: white;
  }

  .bonus-date {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
    color: #828998;
  }

  .bonus-container-impossible {
    width: 75px;
    height: 75px;
    padding: 6px;
    gap: 4px;
    border-radius: 4px;
    opacity: 0px;
    background: #FFFFFF0A;
    border: 1px solid #283454
  }

</style>
