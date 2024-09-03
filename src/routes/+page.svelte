<script>
  import CustomerButton from "$lib/components/Introduce/CustomerButton.svelte";
  import { IsFooter, IsHeader, IsLoading } from "../store/store";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  onMount(async () => {
    $IsFooter = false;
    $IsHeader = false;
		$IsLoading = false;
  });


  let selectedPage = 0;
  const introDatas = [
    {
      img: "/1.png",
      first: true,
      checked: "active",
    },
    {
      img: "/2.png",
      first: false,
      checked: "",
    },
    {
      img: "/3.png",
      first: false,
      checked: "",
    },
    {
      img: "/4.png",
      first: false,
      checked: "",
    },
  ];
  let dataLen = Array.from({ length: introDatas.length }, (_, i) => i + 1);

  const prevClicked = () => {
    if (selectedPage > 0) {
      introDatas[selectedPage].checked = "";
      selectedPage--;
      introDatas[selectedPage].checked = "active";
    }
  };

  const nextClicked = () => {
    if (selectedPage < introDatas.length - 1) {
      introDatas[selectedPage].checked = "";
      selectedPage++;
      introDatas[selectedPage].checked = "active";
    } else {
      $IsLoading = true;
      goto("/home");
    }
  };

  const goToPage = (/** @type {number} */ sel) => {
    selectedPage = sel - 1;
    introDatas.forEach((e) => {
      e.checked = "";
    });
    introDatas[selectedPage].checked = "active";
  };
</script>

<div class="h-full p-4 w-full grow flex flex-col">
  <div class="height-90 slider-container">
    {#each introDatas as data}
      {#if data.first == true}
        <img class="slide {data.checked}" src={data.img} alt="aa" />
      {/if}
      {#if data.first != true}
        <img class="slide {data.checked}" src={data.img} alt="aa" />
      {/if}
    {/each}
    <div class="slide-controls">
      {#each dataLen as len}
        <button
          class={introDatas[len - 1].checked}
          on:click={() => goToPage(len)}
        ></button>
      {/each}
    </div>
  </div>
  <div class="flex justify-center align-middle height-10">
    <div class="my-2 flex w-full gap-x-2">
      {#if introDatas[selectedPage].first != true}
        <CustomerButton text="Назад" on:onClick={prevClicked} />
      {/if}
      <CustomerButton text="Продолжить" on:onClick={nextClicked} />
    </div>
  </div>
</div>

<style>
  .height-90 {
    min-height: 90%;
    max-height: 90%;
  }
  .height-10 {
    min-height: 10%;
    max-height: 10%;
  }

  /* Start Slider Control CSS */

  .slider-container {
    width: 100%;
    max-width: 800px;
    height: 400px;
    position: relative;
    overflow: hidden;
  }

  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .slide.active {
    opacity: 1;
    position: relative;
  }

  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .slide-controls {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    z-index: 1;
  }

  .slide-controls button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #333;
    margin: 0 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }

  .slide-controls button.active {
    background-color: #fff;
  }

  /* End Slider Control CSS */
</style>
