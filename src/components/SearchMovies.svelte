<!--&lt;!&ndash;<form class="search">&ndash;&gt;-->
<!--&lt;!&ndash;    <label for="search_movie">Film keresése:</label>&ndash;&gt;-->
<!--&lt;!&ndash;    <input name="search_movie" type="text" />&ndash;&gt;-->
<!--&lt;!&ndash;    <button>Keresés</button>&ndash;&gt;-->
<!--&lt;!&ndash;</form>&ndash;&gt;-->

<!--&lt;!&ndash;<style>&ndash;&gt;-->
<!--&lt;!&ndash;    button{&ndash;&gt;-->
<!--&lt;!&ndash;        background-color: #555555;&ndash;&gt;-->
<!--&lt;!&ndash;        border: none;&ndash;&gt;-->
<!--&lt;!&ndash;        color: white;&ndash;&gt;-->
<!--&lt;!&ndash;        padding: 6px 15px;&ndash;&gt;-->
<!--&lt;!&ndash;        text-align: center;&ndash;&gt;-->
<!--&lt;!&ndash;        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";&ndash;&gt;-->
<!--&lt;!&ndash;        text-decoration: none;&ndash;&gt;-->
<!--&lt;!&ndash;        display: inline-block;&ndash;&gt;-->
<!--&lt;!&ndash;        font-size: 14px;&ndash;&gt;-->
<!--&lt;!&ndash;        border-radius: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->

<!--&lt;!&ndash;    input {&ndash;&gt;-->
<!--&lt;!&ndash;        width: 20%;&ndash;&gt;-->
<!--&lt;!&ndash;        border: none;&ndash;&gt;-->
<!--&lt;!&ndash;        font-size: 1rem;&ndash;&gt;-->
<!--&lt;!&ndash;        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";&ndash;&gt;-->
<!--&lt;!&ndash;        outline: none;&ndash;&gt;-->
<!--&lt;!&ndash;        color: rgb(255, 255, 255);&ndash;&gt;-->
<!--&lt;!&ndash;        background: rgb(63, 63, 63);&ndash;&gt;-->
<!--&lt;!&ndash;        border-radius: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;        padding: 0.3rem 0.1rem;&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->

<!--&lt;!&ndash;    label {&ndash;&gt;-->
<!--&lt;!&ndash;        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";&ndash;&gt;-->
<!--&lt;!&ndash;        font-weight: bold;&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->

<!--&lt;!&ndash;    .search{&ndash;&gt;-->
<!--&lt;!&ndash;        margin-top: 1rem;&ndash;&gt;-->
<!--&lt;!&ndash;        text-align: center;&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;</style>&ndash;&gt;-->

<!--<script>-->
<!--    import { goto } from '$app/navigation';-->

<!--    let searchQuery = '';-->

<!--    // Function to handle form submission-->
<!--    function performSearch() {-->
<!--        goto(`/?search_movie=${encodeURIComponent(searchQuery)}`);-->
<!--    }-->
<!--</script>-->

<!--<form class="search" on:submit|preventDefault={performSearch}>-->
<!--    <label for="search_movie">Film keresése:</label>-->
<!--    <input name="search_movie" type="text" bind:value={searchQuery} />-->
<!--    <button type="submit">Keresés</button>-->
<!--</form>-->

<!--<style>-->
<!--    button {-->
<!--        background-color: #555555;-->
<!--        border: none;-->
<!--        color: white;-->
<!--        padding: 6px 15px;-->
<!--        text-align: center;-->
<!--        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";-->
<!--        text-decoration: none;-->
<!--        display: inline-block;-->
<!--        font-size: 14px;-->
<!--        border-radius: 10px;-->
<!--    }-->

<!--    input {-->
<!--        width: 20%;-->
<!--        border: none;-->
<!--        font-size: 1rem;-->
<!--        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";-->
<!--        outline: none;-->
<!--        color: rgb(255, 255, 255);-->
<!--        background: rgb(63, 63, 63);-->
<!--        border-radius: 10px;-->
<!--        padding: 0.3rem 0.1rem;-->
<!--    }-->

<!--    label {-->
<!--        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";-->
<!--        font-weight: bold;-->
<!--    }-->

<!--    .search {-->
<!--        margin-top: 1rem;-->
<!--        text-align: center;-->
<!--    }-->
<!--</style>-->

<script>
    import { goto } from '$app/navigation';

    let searchQuery = '';

    function performSearch() {
        goto('/search/' + searchQuery);
        console.log(searchQuery);
    }
</script>

<form on:submit|preventDefault={performSearch} class="search">
    <label for="search_movie">Film keresése:</label>
    <input name="search_movie" type="text" bind:value={searchQuery} />
    <button type="submit">Keresés</button>
</form>

<style>
    button {
        background-color: #555555;
        border: none;
        color: white;
        padding: 6px 15px;
        text-align: center;
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        border-radius: 10px;
    }

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

    label {
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-weight: bold;
    }

    .search {
        margin-top: 1rem;
        text-align: center;
    }
</style>