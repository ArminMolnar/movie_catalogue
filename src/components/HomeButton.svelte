<script lang="ts">
    import {goto} from "$app/navigation";

    function goToHomePage() {
        goto('/');
    }
</script>

<button on:click={goToHomePage} class="home-page-button">← Főoldal</button>

<style>
    .home-page-button {
        color: #D9DBF1;
        font-weight: 600;
        font-size: 0.95rem;
        background-color: #0B3948;
        border: none;
        border-radius: 8px;
        padding: 10px 18px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: inline-block;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .home-page-button:hover {
        background-color: #0a2e3a;
        transform: translateY(-2px);
    }

</style>