<script>
  export let Text = "";
  export let Success = false;
  export let Canceled = false;
  export let Processing = false;
  let backgroundColor = "";
  if (Success == true) {
    backgroundColor = "success";
  } else if (Canceled == true) {
    backgroundColor = "canceled";
  } else if (Processing == true) {
    backgroundColor = "processing";
  }

  $:{
     if (Success == true) {
      backgroundColor = "success";
    } else if (Canceled == true) {
      backgroundColor = "canceled";
    } else if (Processing == true) {
      backgroundColor = "processing";
    }
  }
</script>

<button class="success-btn-container {backgroundColor}">
  <p class="btn-text">{Text}</p>
</button>

<style>
  .success-btn-container {
    width: auto;
    height: auto;
    padding: 3px 8px 3px 8px;
    gap: 10px;
    color: white;
    border-radius: 4px;
  }

  .btn-text {
    font-family: Gilroy;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    text-align: center;
    color: #ffffff;
  }

  .success {
    background: #689900;
  }

  .canceled {
    background: #828998;
  }

  .processing {
    background: #3c9ef5;
  }
</style>
