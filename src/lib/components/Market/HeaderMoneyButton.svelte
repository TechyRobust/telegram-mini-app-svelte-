<script>
  import Money from "$lib/icon/ComponentIcons/BoosterCoin.svelte";
  import Booster from "$lib/icon/ComponentIcons/Booster.svelte";
  import Tron from "$lib/icon/ComponentIcons/Tron.svelte";

  export let Text = "";
  export let Type = 1;
</script>

<button class="money-button flex justify-center items-center">
  <p class="money-number">{Text}</p>
  {#if Type == 1}
    <Money />
  {/if}
  {#if Type == 2}
    <div class="w-5 h-5">
      <Booster />
    </div>
  {/if}
  {#if Type == 3}
  <div class="w-5 h-5">
    <Tron />
  </div>
  {/if}
</button>

<style>
  .money-button {
    width: 100%;
    height: 100%;
    gap: 10px;
    border-radius: 4px;
    background: #ffffff0a;
    border: 1px solid #283454;
    padding: 6px;
  }

  .money-number {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
    color: white;
  }
</style>
