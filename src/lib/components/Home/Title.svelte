<script>
  import Line from "$lib/icon/MarketIcons/Line.svelte";

  export let Title = "";
</script>

<div class="flex items-stretch gap-2">
  <div class="line-box flex justify-center items-center">
    <Line />
  </div>
  <div><div class="title-text">{Title}</div></div>
  <div class="line-box flex justify-center items-center">
    <Line />
  </div>
</div>

<style>
  .title-text {
    font-family: Gilroy;
    font-size: 17px;
    font-weight: 100%;
    line-height: 24px;
    text-align: center;
    color: white;
    flex-grow: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: Gilroy;
    font-size: 17px;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
  }
</style>
