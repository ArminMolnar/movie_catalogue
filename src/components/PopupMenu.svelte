<script lang="ts">
    import type {Position, MenuItem} from "$lib/types";

    export let show: boolean = false;
    export let pos: Position = {x: 0, y: 0};
    export let menuItems: MenuItem[] = [];
    export let close: () => void;

    let menu = {h: 0, w: 0};

    function getContextMenuDimension(node: HTMLElement) {
        menu = {
            h: node.offsetHeight,
            w: node.offsetWidth
        };
    }
</script>

{#if show}
    <nav use:getContextMenuDimension style="position: absolute; top:{pos.y}px; left:{pos.x}px; z-index:1000;">
        <div class="navbar" id="navbar">
            <ul>
                {#each menuItems as item}
                    {#if item.name === "hr"}
                        <hr>
                    {:else}
                        <li>
                            <button on:click={() => { item.onClick?.(); close(); }}>
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
        display: inline-flex;
        border: 1px dimgray solid;
        width: 250px;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        flex-direction: column;
    }

    .navbar ul {
        margin: 6px;
        padding-left: 0;
    }

    ul li {
        display: block;
        list-style-type: none;
        width: 1fr;
    }

    ul li button {
        font-size: 1rem;
        color: #222;
        width: 100%;
        height: 30px;
        text-align: left;
        border: 0;
        background-color: white;
    }

    ul li button:hover {
        color: black;
        text-align: left;
        border-radius: 5px;
        background-color: #eee;
    }

    ul li button i {
        padding: 0 5px 0 5px;
    }

    hr {
        border: none;
        border-bottom: 1px solid antiquewhite;
        margin: 5px 0;
    }
</style>
