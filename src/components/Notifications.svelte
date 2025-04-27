<script>
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import {notifications} from "$lib/stores/notificationStore.js";

    export let themes = {
        success: "#339646",
        warning: "#a80b0b",
        default: "#aaaaaa",
    };
</script>

<div class="notifications">
    {#each $notifications as notification (notification.id)}
        <div
                animate:flip
                class="toast"
                style="background: {themes[notification.type]};"
                transition:fly={{ y: 30 }}
        >
            <div class="content">{notification.message}</div>
        </div>
    {/each}
</div>

<style>
    .notifications {
        position: fixed;
        top: 10px;
        left: 0;
        right: 0;
        margin: 0 auto;
        padding: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        pointer-events: none;
    }

    .toast {
        flex: 0 0 auto;
        margin-bottom: 10px;
    }

    .content {
        padding: 10px;
        display: block;
        color: white;
        font-weight: 500;
    }
</style>
