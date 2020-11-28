<script>
    import { fly } from 'svelte/transition';

    export let url;
    export let name;
    export let tags;
    export let lat;
    export let long;

    function getStaticMap() {
        const ACCESS_TOKEN = 'pk.f0109d77eeb33c1442d7d57910945385';
        return `https://maps.locationiq.com/v2/staticmap?key=${ACCESS_TOKEN}&center=${lat},${long}&zoom=16&size=300x300&format=png&maptype=roadmap&markers=icon:large-blue-cutout|${lat},${long}`;
	}
</script>

<div in:fly="{{ y: 100, duration: 500 }}" class="bg-white rounded-md p-5 m-2 w-72 shadow-md flex flex-col">
    <h2 class="flex-grow font-medium text-lg">{name}</h2>
    <div class="mb-5 break-words">
        {#each tags as tag}
            <span class="inline-block text-xs bg-gray-100 p-2 m-1 rounded-lg">{tag}</span>
        {/each}
    </div>
    <div class="rounded-md overflow-hidden mb-2">
        <img src={getStaticMap()} alt={name} />
    </div>
    {#if url !== ""}
        <a href={url} target="_blank" class="underline">Go To Website</a>
    {/if}
</div>