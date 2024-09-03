<script>
	import { onMount } from 'svelte';
	import { IsFooter, IsHeader, IsLoading } from "../../store/store";
	
	//This will be called when page load.
	onMount(() => {
		//Set header and footer state and stop loading animation.
		$IsFooter = false;
		$IsHeader = false;
		$IsLoading = false;
	})
</script>

<div class="error-container"> 
    <h1> 404 </h1> 
    <p> 
        Oops! The page you're 
        looking for is not here. 
    </p> 
</div> 

<style>
    * { 
	margin: 0; 
	padding: 0; 
	box-sizing: border-box; 
} 

.error-container { 
	text-align: center; 
	background: none; 
	padding: 20px; 
	border-radius: 5px; 
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
} 

h1 { 
	font-size: 5rem; 
	color: white; 
    font-weight: 900;
    font-family: Gilroy;
} 

p { 
	font-size: 1.5rem; 
	color: rgba(238, 212, 212, 0.781); 
	margin-bottom: 20px; 
    font-family: Gilroy;
} 

</style>