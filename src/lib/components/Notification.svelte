<script>
  import Crown from "$lib/icon/MarketIcons/Crown.svelte";
  import Warning from "$lib/icon/MarketIcons/Warning.svelte";
  import { createEventDispatcher } from "svelte";

  export let Title = "";
  export let Content = "";
  export let ConformText = "";
  export let IsCrown = false;
  export let IsWarning = false;

  const dispatch = createEventDispatcher();
  const handleClick = () => {
    dispatch("onConfirm");
  };
</script>

<div class="notification-container flex flex-col p-4 justify-center gap-4">
  <div class="flex gap-4 justify-center items-center">
    {#if IsWarning == true}
      <Warning />
    {/if}
    <p class="notification-title">{Title}</p>
  </div>
  <p class="notification-content">{Content}</p>
  <button
    class="notification-conform items-center px-4 py-5 flex justify-between"
    on:click={handleClick}
  >
    {#if IsCrown == true}
      <div class="w-5">
        <Crown />
      </div>
    {/if}
    <div class="conform-text">{ConformText}</div>
    {#if IsCrown == true}
      <div class="w-5">
        <Crown />
      </div>
    {/if}
  </button>
</div>

<style>
  .notification-container {
    width: 100%;
    height: auto;
    border-radius: 8px;
    border: 1px solid #283454;
    background: #ffffff0a;
  }

  .notification-title {
    font-family: Gilroy;
    font-size: 17px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
    color: white;
  }

  .notification-content {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
    color: white;
  }

  .notification-conform {
    width: 100%;
    height: auto;
    border-radius: 8px;
    background: linear-gradient(90deg, #3c9ef5 0%, #97dd01 100%);
    color: white;
  }

  .conform-text {
    font-family: Gilroy;
    width: 100%;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
    color: white;
  }
</style>
