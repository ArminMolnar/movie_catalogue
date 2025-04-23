<script lang="ts">
    import {goto} from '$app/navigation';
    import {searchQuery} from '$lib/stores/searchQueryStore';
    import {onDestroy} from 'svelte';

    let timeout: ReturnType<typeof setTimeout> | undefined;

    function handleSearchInput() {
        clearTimeout(timeout);
        if ($searchQuery.trim().length >= 2) {
            timeout = setTimeout(() => {
                const encoded = encodeURIComponent($searchQuery.trim());
                goto(`/search/${encoded}`);
            }, 500);
        }
    }

    function clearSearchField() {
        clearTimeout(timeout);
        $searchQuery = '';
    }

    onDestroy(() => {
        clearTimeout(timeout);
    });
</script>

<div class="search">
    <div class="search-container">
        <input
                name="search_movie"
                type="text"
                placeholder="Keresés..."
                bind:value={$searchQuery}
                on:input={handleSearchInput}
        />
        <button type="button" class="clear-button" on:click={clearSearchField}>×</button>
    </div>
</div>


<style>
    input {
        width: 20%;
        border: none;
        font-size: 1rem;
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        outline: none;
        color: rgb(255, 255, 255);
        background: rgb(63, 63, 63);
        border-radius: 10px;
        padding: 0.3rem 0.1rem;

    }

    .search {
        margin-top: 1rem;
        text-align: center;
    }

    .clear-button{
        background-color: gray;
        color: white;
        border-radius: 0.5rem;
        font-size: 100%;
        cursor: pointer;
        line-height: 1.2rem;

    }
</style>
