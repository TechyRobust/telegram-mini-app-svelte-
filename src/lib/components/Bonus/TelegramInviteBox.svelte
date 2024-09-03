<script>
  import ImproveButton from "../Market/ImproveButton.svelte";
  import { createEventDispatcher } from "svelte";
  import CopyToClipboard from "svelte-copy-to-clipboard";
	import toast from "svelte-french-toast";

  export let Url = "";
  
  let copyUrl = ""
  export let Count = 0;

  const dispatch = createEventDispatcher();

  const handleDetail = () => {
    dispatch("onDetail");
  }

  $: {
    if (Url != "" || Url != undefined) {
      copyUrl = "https://t.me/mini_squirrel_coin_bot?" + Url;
    }
  }
</script>

<CopyToClipboard on:copy={() => toast.success("Copied!!!")}
  text={copyUrl}
  let:copy>
  <div class="bonus-type-container flex justify-between">
    <div class="url-type-box gap-2 flex flex-col">
      <div class="url-input-box"><span>{Url}</span></div>
      <div class="recommend-count-text flex gap-1">
        <p class="first">У вас:</p>
        <p class="second">{Count} реферелала</p>
      </div>
    </div>
    <div class="type-btn-group-box flex flex-col">
      <ImproveButton Text="Копировать" on:onClick={copy}/>
      <ImproveButton Text="Подробнее" on:onClick={handleDetail}/>
    </div>
  </div>
</CopyToClipboard>

<style>
  .bonus-type-container {
    width: 100%;
    height: 102px;
    padding: 16px;
    gap: 10px;
    border-radius: 8px;
    opacity: 0px;
    border: 1px solid #283454;
    background: #ffffff0a;
  }

  .type-btn-group-box {
    width: 127px;
    height: 70px;
    gap: 10px;
    opacity: 0px;
  }

  .url-type-box {
    width: 100%;
    height: 70px;
    gap: 10px;
    opacity: 0px;
  }

  .url-input-box {
    display: flex;
    width: 100%;
    height: 40px;
    padding: 6px 10px 6px 10px;
    gap: 0px;
    border-radius: 4px;
    justify-content: flex-start;
    align-items: center;
    background: #ffffff0d;
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
    text-align: left;
    color: white;
  }

  .recommend-count-text > .first {
    font-family: Gilroy;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
    color: #828998;
  }

  .recommend-count-text > .second {
    font-family: Gilroy;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
    color: #ffffff;
  }
</style>
