<script lang="ts">
    import {createRating, type RatingProps} from '@agnos-ui/svelte-headless';
    import {callWidgetFactory} from '@agnos-ui/svelte-headless/config';

    let { rating = $bindable(), ...props } = $props();

    const {
        state,
        api: {setRating, setHoveredRating, leave},
    } = callWidgetFactory({
        factory: createRating,
        widgetName: 'rating',
        get props() {
            return {...props, rating};
        },
        enablePatchChanged: true,
        events: {
            onRatingChange: (value: number) => {
                rating = value;
            },
        },
    });
</script>

<div class="rating">
    {#each state.stars as { index } (index)}
        <button
                type="button"
            class="star"
            onmouseenter={() => setHoveredRating(index + 1)}
            onmouseleave={leave}
            onclick={() => setRating(index + 1)}
            aria-label={`${state.ariaLabel} star ${index + 1}`}
            style="cursor:pointer; font-size:2rem; color:orange;"
    >
      {index + 1 <= state.visibleRating ? '★' : '☆'}
        </button>
    {/each}
</div>

<style>
    .rating {
        display: flex;
        gap: 0.2em;
    }

    .star {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        font-size: 2rem;
        color: orange;
        cursor: pointer;
        line-height: 1;
        transition: color 0.15s;
        outline: none;
    }

    .star:focus,
    .star:hover {
        color: darkorange;
    }

    .star:active {
        color: #c97a00;
    }
</style>

