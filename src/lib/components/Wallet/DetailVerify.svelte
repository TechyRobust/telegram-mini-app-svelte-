<script>
  import { createEventDispatcher } from "svelte";
  import CancelIcon from "$lib/icon/CancelIcon.svelte";
  import Modal from "../Home/Modal.svelte";
  import InputCustomize from "../Withdraw/InputCustomize.svelte";
  import CustomerButton from "../Introduce/CustomerButton.svelte";
  import ConformSelectBox from "./ConformSelectBox.svelte";
	import toast from "svelte-french-toast";

  export let IsOpen = false;

  let selectedNumber = 0;
  let cardNumber = "";
  let cardOwner = "";

  const dispatch = createEventDispatcher();
  const handleClick = () => {
    dispatch("onClose");
  };
  const handleConform = () => {
    if (cardNumber.length < 19 || cardOwner.length < 3) {
      toast.error("Пожалуйста, заполните все поля");
    }
    else {
      dispatch("onConform", JSON.stringify({selectedId: selectedNumber, cardNumber: cardNumber, cardOwner: cardOwner  }));
      cardNumber = "";
      cardOwner = "";
    }
  };
</script>

{#if IsOpen}
  <Modal on:onClick={handleClick} on:onKeyDown={handleClick}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="verify-container"
      on:click|stopPropagation
      on:keydown|stopPropagation
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="flex w-full justify-between">
        <p class="verify-text">Верификация личности</p>
        <div class=" flex" on:click={handleClick}>
          <CancelIcon />
        </div>
      </div>
      <div class="user-detail-box">
        <div class="line-class"></div>
        <p class="user-info-title-text">
          Выберите способ через который вы будете выводить средства
        </p>
        <div class="w-full relative">
          <ConformSelectBox bind:SelectNumber={selectedNumber} />
        </div>
        <p class="user-info-title-text">Номер карты</p>
        <InputCustomize
          IsBankNumber={true}
          PlaceholderText="0000 0000 0000 0000"
          bind:InputText={cardNumber}
        />
        <p class="user-info-title-text">Владелец карты</p>
        <InputCustomize IsGeneral={true} PlaceholderText="Ivan Ivanov" bind:InputText={cardOwner}/>
        <CustomerButton text="Оплатить 499 ₽" on:onClick={handleConform} />
        <p class="noti-text">Проверка данных, в среднем занимает 5-15 минут</p>
      </div>
    </div>
  </Modal>
{/if}

<style>
  .verify-container {
    width: 293px;
    height: 528px;
    padding: 20px;
    gap: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #19233e;
  }

  .verify-text {
    font-family: Gilroy;
    font-size: 17px;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
    color: #ffffff;
  }

  .user-detail-box {
    width: 253px;
    height: 528px;
    gap: 16px;
    display: flex;
    flex-direction: column;
  }

  .line-class {
    width: 100%;
    height: 1px;
    border: 1px solid #ffffff26;
  }

  .user-info-title-text {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
    color: #828998;
  }

  .noti-text {
    font-family: Gilroy;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    text-align: center;
    color: #828998;
  }
</style>
