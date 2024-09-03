<script>
  import { createEventDispatcher } from "svelte";

  export let Text = "";

  const dispatch = createEventDispatcher();
  const handleClick = () => {
    dispatch("onClick");
  };
</script>

<button
  on:click={handleClick}
  class="improve-btn-container flex justify-center items-center"
>
  <slot></slot>
  <p class="improve-btn-text">{Text}</p>
</button>

<style>
  .improve-btn-container {
    width: 100%;
    height: 30px;
    gap: 0px;
    border-radius: 4px;
    opacity: 0px;
    background: linear-gradient(321.84deg, #2c4ea7 0%, #3c9ef5 100%);
  }

  .improve-btn-text {
    font-family: Gilroy;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    text-align: center;
    color: white;
  }
</style>
