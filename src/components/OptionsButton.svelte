<script lang="ts">
    import type { MenuItem, Position } from "$lib/types";
    import { onMount } from 'svelte';
    import PopupMenu from './PopupMenu.svelte';
    import { currentlyOpenMenu } from '$lib/stores/menuStore';

    export let menuId: string;
    export let menuItems: MenuItem[];

    let showMenu = false;
    let menuPos: Position = { x: 0, y: 0 };
    let optionsButton: HTMLButtonElement | null = null;
    let buttonContainer: HTMLDivElement | null = null;

    function openMenu(event: MouseEvent) {
        event.stopPropagation();
        event.preventDefault();

        if ($currentlyOpenMenu && $currentlyOpenMenu !== menuId) {
            window.dispatchEvent(new CustomEvent('close-all-menus', {
                detail: { exceptId: menuId }
            }));
        }

        if (optionsButton && buttonContainer) {
            const rect = optionsButton.getBoundingClientRect();
            const containerRect = buttonContainer.getBoundingClientRect();

            menuPos = {
                x: rect.left - containerRect.left,
                y: rect.bottom - containerRect.top + 5
            };

            $currentlyOpenMenu = menuId;
            showMenu = true;
        }
    }

    function closeMenu() {
        showMenu = false;
        if ($currentlyOpenMenu === menuId) {
            $currentlyOpenMenu = null;
        }
    }

    function handleWindowClick() {
        if (showMenu) {
            closeMenu();
        }
    }

    function handleCloseMenu(event: CustomEvent) {
        if (event.detail.exceptId !== menuId && showMenu) {
            showMenu = false;
        }
    }

    onMount(() => {
        window.addEventListener('close-all-menus', handleCloseMenu as EventListener);
        return () => { window.removeEventListener('close-all-menus', handleCloseMenu as EventListener);
        };
    });


</script>

<svelte:window on:click={handleWindowClick}/>

<div class="button-container" bind:this={buttonContainer} style="position: relative;">
    <button
            class="options"
            bind:this={optionsButton}
            on:click={openMenu}
    >
        ...
    </button>

    <PopupMenu
            show={showMenu}
            pos={menuPos}
            menuItems={menuItems}
            close={closeMenu}
    />
</div>

<style>
    .button-container {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 10;
    }

    .options {
        position: absolute;
        top: 15px;
        right: 15px;
        z-index: 100;
        background-color: darkslategray;
        color: white;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        font-size: 18px;
        cursor: pointer;
        outline: 1px solid gray;
        box-shadow: gray 1px 1px 1px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
