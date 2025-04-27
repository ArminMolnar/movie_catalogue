<script lang="ts">
    import type {Position, MenuItem} from "$lib/types/optionsButton";

    export let show: boolean = false;
    export let pos: Position = {x: 0, y: 0};
    export let menuItems: MenuItem[] = [];
    export let close: () => void;

    let menu = {h: 0, w: 0};

    function getMenuDimension(node: HTMLElement) {
        menu = {
            h: node.offsetHeight,
            w: node.offsetWidth
        };
    }
</script>

{#if show}
    <nav use:getMenuDimension
         style="position: absolute; top:{pos.y}px; left:{pos.x}px; z-index:1000;">
        <div class="navbar">
            <ul>
                {#each menuItems as item}
                    {#if item.name === "hr"}
                        <hr>
                    {:else}
                        <li>
                            <button on:click={() => {
                                item.onClick?.();
                                close(); }}>
                                <i class={item.class}></i>{item.displayText}
                            </button>
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
    </nav>
{/if}

<style>
    .navbar {
        border: 1px solid dimgray;
        width: 250px;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
    }

    ul {
        margin: 6px;
        padding: 0;
    }

    li {
        list-style-type: none;
    }

    button {
        font-size: 1rem;
        color: #222;
        width: 100%;
        height: 30px;
        text-align: left;
        border: 0;
        background-color: white;
    }

    button:hover {
        background-color: #eee;
        border-radius: 5px;
    }

    i {
        display: inline-block;
        width: 20px;
        text-align: center;
        margin-right: 10px;
    }

    hr {
        border: none;
        border-bottom: 1px solid antiquewhite;
        margin: 5px 0;
    }
</style>
