<script>
    export let open = false;
    export let close = () => {};
</script>

{#if open}
    <div class="modal-backdrop" role="button"
         tabindex="0"
         on:click={close}
         on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? close() : null}
         aria-label="Close modal"></div>
    <div class="modal-content">
        <button class="modal-close" on:click={close}>✕</button>
        <slot />
    </div>
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.4);
        z-index: 1000;
    }
    .modal-content {
        position: fixed;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        z-index: 1001;
        min-width: 300px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    }
    .modal-close {
        position: absolute;
        top: 0.5rem; right: 0.5rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
    }
</style>