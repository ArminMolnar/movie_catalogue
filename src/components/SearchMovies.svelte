<form class="search">
    <label for="search_movie">Film keresése:</label>
    <input name="search_movie" type="text" />
    <button>Keresés</button>
</form>

<style>
    button{
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

    .search{
        margin-top: 1rem;
        text-align: center;
    }
</style>