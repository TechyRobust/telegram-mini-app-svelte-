<script>
  import { createEventDispatcher } from "svelte";

  export let btnText = "";
  export let IsActive = false;
  export let Step = 0;

  const dispatch = createEventDispatcher();
  let activeClass = "";
  $: {
    if (IsActive) {
      activeClass = "coin-btn-active";
    } else {
      activeClass = "";
    }
  }

  const handleClick = () => {
    dispatch("onClick");
  };
</script>

<button
  class="coin-btn flex justify-center items-center {activeClass}"
  on:click={handleClick}
>
  <slot></slot>
  {btnText}
</button>

<style>
  .coin-btn {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    border: 1px solid #283454;
    background: #ffffff0a;
    text-align: center;
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
    color: #828998;
  }

  .coin-btn-active {
    background: #3c9ef533;
    border: 1px solid #3c9ef5;
    color: white;
  }
</style>
