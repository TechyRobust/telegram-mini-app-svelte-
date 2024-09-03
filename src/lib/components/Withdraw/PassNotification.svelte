<script>
  import Success from "$lib/icon/WalletIcons/Success.svelte";

  export let Content = "";
</script>

<div class="success-noti-container">
  <div class="success-icon-box">
    <Success />
  </div>
  <p class="noti-text">{Content}</p>
</div>

<style>
  .success-noti-container {
    width: 100%;
    height: auto;
    padding: 16px;
    gap: 10px;
    opacity: 0px;
    border-radius: 8px;
    border: 1px solid #3c9ef5;
    background: #3c9ef533;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .noti-text {
    font-family: Gilroy;
    font-size: 17px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
    color: white;
  }

  .success-icon-box {
    min-height: 20px;
    min-width: 20px;
  }
</style>
