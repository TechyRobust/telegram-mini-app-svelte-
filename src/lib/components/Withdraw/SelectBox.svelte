<script lang="ts">
	import VISA from '$lib/icon/WalletIcons/VISA.svelte';
  import DropDownIcon from "./../../icon/WithdrawIcons/DropDownIcon.svelte";
  import { Dropdown, DropdownItem } from "flowbite-svelte";
  import TBank from "$lib/icon/WithdrawIcons/TBank.svelte";
  import AlfaBank from "$lib/icon/History/AlfaBank.svelte";
  import Trcusdt from '$lib/icon/History/TRCUSDT.svelte';
  import { WithdrawInfo } from '../../../store/store';
	import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  export let WithdrawType = 1;

  let isOpen = false;
  let cardType = 0;
  let cardText = "";
  let withdrawInfo : any;
  let cardAvatar = "";

  const dispatch = createEventDispatcher();
  const handleClicked = (type :any, text:any, id:any, url:any) => {
    cardType = type;
    cardText = text;
    isOpen = false;
    cardAvatar = url;
    dispatch('onSelected', JSON.stringify({ type: type, text: text, id: id }));
  };

  onMount(() => {
    if($WithdrawInfo) {
      withdrawInfo = JSON.parse($WithdrawInfo);
      if (WithdrawType == 1) {
        withdrawInfo = withdrawInfo.filter((item) => {
          return item.type == 1 && item.isConform == true; 
        });
      }
      else if (WithdrawType == 2){
        withdrawInfo = withdrawInfo.filter((item) => {
          return item.type == 2; 
        });
      }
    }
  })
</script>

<div class="flex">
  <button
    type="button"
    class="select-box flex justify-between items-center states-button"
  >
    <div class="flex gap-3">
         <div class="w-5 h-5 flex justify-center items-center">
            <img src={cardAvatar} alt="">
          </div>
        <p class="type-text">{cardText}</p>
    </div>
    <DropDownIcon />
  </button>
  <Dropdown triggerdBy=".states-button" classContainer="w-full" bind:open={isOpen}>
    {#each withdrawInfo as info}
      <DropdownItem class="flex w-full" on:click={() => handleClicked(info.svg_type, info.name, info.id, info.image_url)}>
        <div class=" select-box-item justify-between items-center states-button">
          <div class="flex gap-3">
               <div class="w-5 h-5 flex justify-center items-center">
                <img src={info.image_url} alt="">
              </div>
              <p class="type-text">{info.name}</p>
          </div>
        </div>
      </DropdownItem>
    {/each}
  </Dropdown>
</div>

<style>
  .select-box {
    width: 100%;
    height: 52px;
    padding: 16px 20px 16px 20px;
    gap: 10px;
    border-radius: 8px;
    background: #ffffff0a;
    border: 1px solid #283454;
  }

  .select-box-item {
    width: 100%;
    height: 52px;
    padding: 16px 20px 16px 20px;
    gap: 10px;
    background-color: rgb(19, 11, 11);
    border-bottom: 1px solid #283454;
    z-index: 3;
  }

  .type-text {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
    color: #ffffff;
  }
</style>
