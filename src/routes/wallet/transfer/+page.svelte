<script lang="ts">
	import { IsChanged, UserInfo } from './../../../store/userinfo.ts';
  import CustomerButton from "$lib/components/Introduce/CustomerButton.svelte";
  import Title from "$lib/components/Home/Title.svelte";
  import InputCustomize from "$lib/components/Withdraw/InputCustomize.svelte";
  import SelectBox from "$lib/components/Withdraw/SelectBox.svelte";
  import { onMount } from "svelte";
  import { IsFooter, HeaderState, IsLoading, Squirrel_Cost } from "../../../store/store";
	import toast from "svelte-french-toast";
  
  //This value will be the wallet address selected by the user to withdraw squirrel coin.
  let walletAddress : any = "";
  //This value will be the count of squirrel coin selected by the user to withdraw.
  let squirrelCount = "";
  //This value will be the user's information.
  let userInfo : any = {};
  //This value will be the cost of squirrel coin.
  let squirrelCost = 0.0;
  //This value will be the selected id.
  let selectedId = "";
  //This value will be the cost of withdrawing squirrel coin in rub.
  let rubCost = 0.0;
  //This value will be the state of response from back-end.
  let isPassing = true;
  //This function will be called when transfer page load.
  //Get user's information and get the cost of withdrawing squirrel coin in rub.
  onMount(async () => {
    //Set transfer page header and footer state.
    $IsFooter = false;
    $HeaderState = 3;
    //Stop loading animation.
    $IsLoading = false;
    //Get user's information from store.
    if ($UserInfo) {
      userInfo = JSON.parse($UserInfo);
    }
    //Get the current exchange rate of USD to RUB.
    const usdRate = await fetch('https://open.er-api.com/v6/latest/RUB');
    const jsonRate = await usdRate.json();
    rubCost = jsonRate.rates.USD;
  });

  //Set maximum squirrel coin count.  
  const setMax = () => { 
    squirrelCount = userInfo.squirrel_coin;
    squirrelCost = parseInt(squirrelCount) * parseInt($Squirrel_Cost) * parseFloat(rubCost);
  }

  //When change squirrel coin count, this will be called and get the count of squirrel coin.
  const changeCount = async () => {
    if (squirrelCount > userInfo.squirrel_coin) {
      squirrelCount = userInfo.squirrel_coin;
    }
   
    squirrelCost = parseFloat(squirrelCount) * parseInt($Squirrel_Cost) * parseFloat(rubCost);
  }

  //When selected wallet address, this will be called.
   const onSelected = async (e) => {
    const receiveData = JSON.parse(e.detail);
    selectedId = receiveData.id;
  }

  //When confirm withdraw, this will be called and save transaction.
  const conformWithdraw = async () => {
    //If any field is empty, show error message.  
    if (selectedId == "" || walletAddress == "" || squirrelCount == "") {
      toast.error("Выберите банк и введите сумму Squirrel Coin.");  
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
        body: JSON.stringify({cardId: selectedId, transactionType: 2, cardNumber: walletAddress, withdrawAmount: squirrelCount, usdtCost: squirrelCost})
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

  //Paste wallet address from clipboard.
  const pasteNumber = () => {
    navigator.clipboard.readText().then((text) => {
        walletAddress = text;
      },
      (error) => {
        toast.error("Не удалось скопировать адрес кошелька");
      }
    )
  }

  //This is hook function to get user information when update it.
  $:{
    if($UserInfo) {
      userInfo = JSON.parse($UserInfo);
    }
  }
</script>

<div class="transfer-container flex flex-col gap-4">
  <Title Title="Вывод в один клик" />
  <div class="flex flex-col justify-between transfer-info-box">
    <div class="transfer-detail-box flex flex-col">
      <div class="flex flex-col gap-4">
        <p class="transfer-text">Перевод на кошелек</p>
        <SelectBox WithdrawType={2}  on:onSelected={onSelected}/>
      </div>
      <div class="transfer-detail-box flex flex-col">
        <p class="transfer-text">Адрес кошелька</p>
        <InputCustomize bind:InputText={walletAddress} IsCardNumber={true} AmountText="Вставить" on:onClick={pasteNumber} />
      </div>
      <div class="transfer-detail-box flex flex-col">
        <p class="transfer-text">Сумма</p>
        <InputCustomize IsAmount={true} bind:InputText={squirrelCount} PlaceholderText="0" AmountText="Макс"  on:onChange={changeCount} on:onClick={setMax} />
      </div>
      <div class="flex items-center h-5">
        <p class="bottom-first-text">≈ {squirrelCost}</p>
        <p class="bottom-second-text ml-1">USDT</p>
      </div>
    </div>
  </div>
</div>
<div class="h-16 p-2 absolute bottom-0 w-full">
  <CustomerButton text="Вывести" on:onClick={conformWithdraw} />
</div>

<style>
  .transfer-container {
    padding: 24px 16px 0 16px;
    display: flex;
    flex-direction: column;
  }

  .transfer-info-box {
    max-height: calc(100vh - 233px);
    min-height: calc(100vh - 233px);
    overflow-y: auto;
  }

  .transfer-detail-box {
    width: 100%;
    height: 324px;
    gap: 16px;
  }

  .transfer-text {
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
