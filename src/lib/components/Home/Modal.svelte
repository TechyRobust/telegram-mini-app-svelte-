<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const handleOnClick = () => {
    dispatch("onClick");
  };
  const handleKeyDown = () => {
    dispatch("onKeyDown");
  };
</script>

<button
  class="modal-overlay"
  on:click={handleOnClick}
  on:keydown={handleKeyDown}
>
  <slot></slot>
</button>

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
</style>
