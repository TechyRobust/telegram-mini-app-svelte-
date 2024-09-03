<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let text = "";

  const handleClick = () => {
    dispatch("onClick", { name: text });
  };
</script>

<button
  class="w-full h-full customer-button flex justify-center items-center"
  on:click={handleClick}
>
  <p class="button-font-style text-center">{text}</p>
</button>

<style>
  .customer-button {
    gap: 10px;
    border-radius: 8px;
    background: linear-gradient(321.84deg, #2c4ea7 0%, #3c9ef5 100%);
    text-align: center;
  }

  .button-font-style {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    color: white;
  }
</style>
