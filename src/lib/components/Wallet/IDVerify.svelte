<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import CancelIcon from "$lib/icon/CancelIcon.svelte";
  import Modal from "../Home/Modal.svelte";
  import InputCustomize from "../Withdraw/InputCustomize.svelte";
  import CustomerButton from "../Introduce/CustomerButton.svelte";
	import toast from "svelte-french-toast";

  export let IsOpen = false;

  let verifyName : any = "";
  let verifySurname : any = "";
  let verifyDateOfBirth = "";
  let verifyCity = "";

  const dispatch = createEventDispatcher();
  const handleClick = () => {
    dispatch("onClose");
  };
  const handleConform = () => {
    if(verifyName.length < 3 || verifySurname.length < 3 || verifyCity.length < 1 || verifyDateOfBirth == "") {
      toast.error("Пожалуйста, заполните все поля");
    }
    else {
      dispatch("onConform", JSON.stringify({name: verifyName, surname: verifySurname, bith: verifyDateOfBirth, city:verifyCity}));
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
        <p class="user-info-title-text">Имя</p>
        <InputCustomize IsGeneral={true} bind:InputText={verifyName} PlaceholderText="Иван" />
        <p class="user-info-title-text">Фамилия</p>
        <InputCustomize IsGeneral={true} PlaceholderText="Иванов" bind:InputText={verifySurname}/>
        <p class="user-info-title-text">Дата рождения</p>
        <InputCustomize IsDatepicker={true} PlaceholderText="01.01.1980" bind:InputText={verifyDateOfBirth} />
        <p class="user-info-title-text">Город</p>
        <InputCustomize IsGeneral={true} PlaceholderText="Москва" bind:InputText={verifyCity} />
        <CustomerButton on:onClick={handleConform} text="Оплатить 499 ₽" />
        <p class="noti-text">Проверка данных, в среднем занимает 5-15 минут</p>
      </div>
    </div>
  </Modal>
{/if}

<style>
  .verify-container {
    width: 293px;
    height: 612px;
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
