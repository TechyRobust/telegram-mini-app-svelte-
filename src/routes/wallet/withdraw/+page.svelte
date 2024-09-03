<script lang="ts">
	import { IsChanged, UserInfo } from './../../../store/userinfo.ts';
  import CustomerButton from "$lib/components/Introduce/CustomerButton.svelte";
  import Title from "$lib/components/Home/Title.svelte";
  import InputCustomize from "$lib/components/Withdraw/InputCustomize.svelte";
  import SelectBox from "$lib/components/Withdraw/SelectBox.svelte";
  import { onMount } from "svelte";
  import { IsFooter, HeaderState, Squirrel_Cost } from "../../../store/store";
	import toast from 'svelte-french-toast';
  
  //This value will be squirrel coin count. You should replace this value with actual squirrel coin count.
  let squirrelCount = "";
  //This value will be user information.
  let userInfo : any = {};
  //This value will be squirrel coin cost in RUB.
  let squirrelCost = 0;
  //This value will be withdraw card number.
  let cardNumber = "";
  //This value will be selected withdraw card id.
  let selectedId = "";
   //This value will be the state of response from back-end.
  let isPassing = true;

  //This function will be called when page load.
  onMount(async () => {
    //Set header and footer state.
    $IsFooter = false;
    $HeaderState = 3;
    //Get user information from store.
    if ($UserInfo) {
      userInfo = JSON.parse($UserInfo);
    }
  });

  //Set maximum withdrawal amount.
  const setMax = () => { 
    squirrelCount = userInfo.squirrel_coin;
    squirrelCost = parseInt(squirrelCount) * parseInt($Squirrel_Cost);
  }

  //When change withdrawal amount, call this function.
  const changeCount = () => {
    if (squirrelCount > userInfo.squirrel_coin) {
      squirrelCount = userInfo.squirrel_coin;
    }
    squirrelCost = parseInt(squirrelCount) * parseInt($Squirrel_Cost);
  }

  //When selected withdrawal card, call this function.
  const onSelected = async (e) => {
    //Get detail from Selectbox.
    const receiveData = JSON.parse(e.detail);
    selectedId = receiveData.id;
    //Send request to get withdraw card number.
    const result = await fetch('/api/getWithdrawCardNumber', {
      method: 'POST',
		  headers: {
		 		'Content-Type': 'application/json'
		 		},
		 	body: JSON.stringify({cardId: receiveData.id})
    })
    //Receive response from back-end and check it/
    const jsonResult = await result.json();
    if (jsonResult.status) {
      cardNumber = jsonResult.cardNumber;
      cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
      
    } else {
      toast.error(jsonResult.content);
    }
  }

  //When confirm withdrawal, call this function.
  const conformWithdraw = async () => {
    //Some field is empty, show error message.
    if (selectedId == "" || cardNumber == "" || squirrelCount == "") {
      toast.error("Выберите банк и введите сумму Squirrel Coin.");  
    }
    else if (cardNumber != "" && cardNumber.length < 19) {
      toast.error("Номер карты должен содержать 19 цифр.");
    }
    else {
      //If you don't receive response from server still now, you can't send request.
      if (isPassing == false) {
        toast.error("Отправка запроса на сервер...");
        return;
      }
      isPassing = false;
      //Save transaction to server.
      const result = await fetch('/api/saveTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          },
        body: JSON.stringify({cardId: selectedId, transactionType: 1, cardNumber: cardNumber, withdrawAmount: squirrelCount})
      })
      //Receive result from server and check it.
      const jsonResult = await result.json();
      if (jsonResult.status) {
        userInfo.squirrel_coin = parseInt(userInfo.squirrel_coin) - parseInt(squirrelCount);
        $IsChanged = true;
        $UserInfo = JSON.stringify(userInfo);
        toast.success("Транзакция успешно выполнена.");
      }
      else {
        toast.error(jsonResult.content);
      }
      //Receive response from server.
      isPassing = true;
    }
  }

  //This is hook function to get user information when update user information.
  $:{
    if($UserInfo) {
      userInfo = JSON.parse($UserInfo);
    }
  }
</script>

<div class="withdraw-container flex flex-col gap-4">
  <Title Title="Вывод в один клик" />

  <div class="withdraw-detail-box flex flex-col">
    <div class="flex flex-col gap-4">
      <p class="withdraw-text">Выберите банк</p>
      <SelectBox on:onSelected={onSelected}/>
    </div>
    <div class="withdraw-detail-box flex flex-col">
      <p class="withdraw-text">Введите номер карты</p>
      <InputCustomize
        IsBankNumber={true}
        PlaceholderText="0000 0000 0000 0000"
        bind:InputText={cardNumber}
      />
    </div>
    <div class="withdraw-detail-box flex flex-col">
      <p class="withdraw-text">Сумма</p>
      <InputCustomize bind:InputText={squirrelCount} IsAmount={true} PlaceholderText="0" AmountText="Макс" on:onChange={changeCount} on:onClick={setMax} />
    </div>
    <div class="flex items-center h-5">
      <p class="bottom-first-text">≈ {squirrelCost}</p>
      <p class="bottom-second-text ml-1">₽</p>
    </div>
  </div>
</div>
<div class="h-16 p-2 absolute bottom-0 w-full">
  <CustomerButton on:onClick={conformWithdraw} text="Вывести" />
</div>

<style>
  .withdraw-container {
    padding: 24px 16px 0 16px;
    display: flex;
    flex-direction: column;
  }

  .withdraw-detail-box {
    width: 100%;
    height: 324px;
    gap: 16px;
  }

  .withdraw-text {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
    color: #828998;
  }

  .bottom-first-text {
    font-family: Gilroy;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
    color: #ffffff;
  }

  .bottom-second-text {
    font-family: Gilroy;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
    color: #828998;
  }
</style>
