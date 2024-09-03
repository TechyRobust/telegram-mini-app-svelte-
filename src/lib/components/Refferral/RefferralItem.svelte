<script lang="ts">
  import Money from "$lib/icon/ComponentIcons/BoosterCoin.svelte";
  import { onMount } from "svelte";

  export let UserAvatar = "";
  export let NickName = "";
  export let ChatID = "";
  export let InviteDate = "";
  export let Income = 0;

  let date : any = "";

  onMount(() => {
    const inviteDate = new Date(parseInt(InviteDate));
    date = inviteDate.getDate() + "." + (inviteDate.getMonth() + 1) + "." + inviteDate.getFullYear();
  })
  
</script>

<div class="item-box">
  <div class="item-info">
    <div class="flex gap-4">
      <div class="user-avatar">
        <img
          src={UserAvatar}
          alt=""
        />
      </div>
      <div class="user-detail gap-1 flex flex-col">
        <p class="user-id-text">{NickName} #{ChatID}</p>
        <p class="date-text">{date}</p>
      </div>
    </div>
    <div class="flex gap-2 flex-col">
      <div class="flex gap-2">
        <p class="ref-amount-text">{Income}</p>
        <Money />
      </div>
      <p class="income-text">доход</p>
    </div>
  </div>
  <div class="line-class"></div>
</div>

<style>
  .item-box {
    width: 100%;
    height: 62px;
    gap: 16px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .item-info {
    width: 100%;
    height: 46px;
    gap: 10px;
    display: flex;
    justify-content: space-between;
  }

  .user-avatar {
    width: 46px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 50%;
  }

  .user-avatar > img {
    position: relative;
    height: 100%;
    width: auto;
    max-width: none !important;
  }

  .user-id-text {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    text-align: left;
    color: white;
  }

  .date-text {
    font-family: Gilroy;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    text-align: left;
    color: #828998;
  }

  .ref-amount-text {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
    color: white;
  }

  .income-text {
    font-family: Gilroy;
    font-size: 13px;
    font-weight: 300;
    line-height: 16px;
    text-align: right;
    color: #828998;
  }

  .line-class {
    width: 100%;
    height: 1px;
    border: 1px solid #ffffff26;
  }
</style>
