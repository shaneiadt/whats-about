<script>
    export let url;
    export let name;
    export let tags;
</script>

<div class="bg-white rounded-md p-5 m-2 w-72 shadow-md flex flex-col">
    <h2 class="flex-grow font-medium text-lg">{name}</h2>
    <div class="mb-5 break-words">
        {#each tags as tag}
            <span class="inline-block text-xs bg-gray-100 p-2 m-1 rounded-lg">{tag}</span>
        {/each}
    </div>
    {#if url !== ""}
        <a href={url} target="_blank" class="underline">Go To Website</a>
    {/if}
</div>