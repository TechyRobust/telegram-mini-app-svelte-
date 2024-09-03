<script>
  export let StepCount = 1;
  export let Completed = 0;
  let Steps = Array.from({ length: StepCount }, (_, i) => ({
    step: i + 1,
    backgroud: i < Completed ? "#97DD01" : "#ffffff0d",
  }));
</script>

<div class="progressbar-container flex">
  {#if StepCount == 1}
    <div class="only-one-step"></div>
  {/if}
  {#if StepCount > 1}
    {#each Steps as step}
      {#if step.step == 1}
        {#if step.step <= Completed}
          <div class="first-step" style="background: #97DD01;"></div>
        {/if}
        {#if step.step > Completed}
          <div class="first-step" style="background: #ffffff0d;"></div>
        {/if}
      {/if}
      {#if step.step > 1 && step.step < StepCount}
        {#if step.step <= Completed}
          <div class="middle-step" style="background: #97DD01;"></div>
        {/if}
        {#if step.step > Completed}
          <div class="middle-step" style="background: #ffffff0d;"></div>
        {/if}
      {/if}
      {#if step.step == StepCount}
        {#if step.step <= Completed}
          <div class="last-step" style="background: #97DD01;"></div>
        {/if}
        {#if step.step > Completed}
          <div class="last-step" style="background: #ffffff0d;"></div>
        {/if}
      {/if}
    {/each}
  {/if}
</div>

<style>
  .progressbar-container {
    width: auto;
    height: 8px;
    gap: 1px;
  }

  .only-one-step {
    width: 16px;
    height: 8px;
    gap: 0px;
    border-radius: 4px;
    opacity: 0px;
  }

  .first-step {
    width: 16px;
    height: 8px;
    gap: 0px;
    border-radius: 4px 0px 0px 4px;
    opacity: 0px;
  }

  .middle-step {
    width: 16px;
    height: 8px;
    gap: 0px;
    opacity: 0px;
  }

  .last-step {
    width: 16px;
    height: 8px;
    gap: 0px;
    border-radius: 0px 4px 4px 0px;
    opacity: 0px;
  }
</style>
