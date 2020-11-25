<script>
	// Reference Material:
	// http://developer-tripadvisor.com/content-api/description/
	// https://failteireland.developer.azure-api.net/api-details#api=opendata-api-v1&operation=activities-get
	// https://www.odata.org/getting-started/basic-tutorial/
	// https://locationiq.com/docs
	import Button from './Button.svelte';
	import Card from './Card.svelte';
	import counties from './countyList';
	import fakeObj from './fakeObj';
  
	let info = [];
	let loading = true;
	let county = null;
  
	if(!navigator.geolocation) {
	  console.log('Geolocation is not supported by your browser');
	} else {
	  navigator.geolocation.getCurrentPosition(getGeoLocation, (e) =>{
		 console.error('Unable to retrieve your location', e);
	  });
	}
  
	// console.log(counties);
  
	async function getGeoLocation(position){
	  console.log(position);
	  loading = true;
	  const {coords: {latitude, longitude}} = position;
	  const ACCESS_TOKEN = 'pk.f0109d77eeb33c1442d7d57910945385';
	  const url = `https://eu1.locationiq.com/v1/reverse.php?key=${ACCESS_TOKEN}&lat=${latitude}&lon=${longitude}&format=json`;
  
	  try {
		const res = await fetch(url);
		const data = await res.json();
		// const data = fakeObj;
		const {address} = data;
  
		counties.forEach(countyName => {
		  if(address.county.includes(countyName) && !county) county = countyName;
		});
  
		loading = false;
  
		// setTimeout(() => {
		//   const data = fakeObj;
		//   const {address} = data;
	
		//   console.log(address);
	
		//   counties.forEach(countyName => {
		//     if(address.county.includes(countyName) && !county) county = countyName;
		//   });
	
		//   loading = false;
		// }, 1000);
	  } catch (error) {
		console.error(error);
	  }
	}
  
	function getActivities() {
	  loading = true;
	  const url = `https://failteireland.azure-api.net/opendata-api/v1/activities?$filter=search.ismatch(%27${county}%27,%27address/addressRegion%27)`;
  
	  fetch(url)
		.then(res => res.json())
		.then(data => {
		  console.log(data);
		  const { results } = data;
		  info = results;
		  loading = false;
		})
		.catch(e => console.error(e));
	}
  </script>
  
  <style></style>
  
  <div class="container mx-auto p-10 bg-gray-50 h-screen text-center">
	<h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">What's About</h1>
	{#if county}
	  <h2 class="text-1xl font-bold tracking-tight text-gray-900 sm:text-1xl mb-8">You are here: {county}</h2>
	{/if}
	{#if loading}
	  <img src="./loading.svg" alt="Loading" class="m-auto" />
	{:else}
	  {#if info.length >= 1}
		<div class="card-container flex flex-row justify-center sm:py-12 flex-wrap">
		  {#each info as card}
			<Card url={card.url} name={card.name} tags={card['@type']} />
		  {/each}
		</div>
	  {:else}
		<Button on:click={getActivities}>Find Attractions Near Me</Button>
	  {/if}
	{/if}
  </div>
  