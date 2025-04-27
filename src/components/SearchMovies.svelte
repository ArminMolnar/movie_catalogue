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
        goto('/');
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
        <button type="button" class="clear-button" on:click= {clearSearchField}>×</button>
    </div>
</div>

<style>
    .search {
        margin-top: 1rem;
        text-align: center;
        position: relative;
    }

    input {
        width: 20%;
        font-size: 1rem;
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 600;
        color: #0B3948;
        background: #D9DBF1;
        border: 2px solid #416165;
        border-radius: 10px;
        padding: 0.5rem 2rem 0.5rem 1rem;
        outline: none;
        transition: all 0.3s ease;
    }

    input:focus {
        border-color: #0B3948;
        box-shadow: 0 0 0 2px rgba(11, 57, 72, 0.2);
    }

    .clear-button {
        position: absolute;
        right: 39%;
        top: 50%;
        transform: translateY(-50%);
        background-color: #416165;
        color: #D9DBF1;
        border: none;
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
        font-size: 0.9rem;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }

    .clear-button:hover {
        background-color: #0B3948;
        transform: translateY(-50%) scale(1.1);
    }

    .clear-button:active {
        transform: translateY(-50%) scale(0.95);
    }
</style>
