<style>

    :global(body){
        background-color:black;
    }
    .container {
        width: 80%;
        margin: auto;
        background-color: gray;
        border-radius: 12px;
        padding-bottom: 1rem;
        overflow: hidden;
        padding-top: 0;

    }

    .navbar {
        width: 50%;
        background-color: #333;
        border-radius: 0 0 12px 12px;
        margin: auto;
        overflow: hidden;

    }

    .navbar ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
    }

    .navbar ul li {
        flex: 1;
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        border-right: 1px solid #666;

    }

    .navbar ul li a {
        display: block;
        color: white;
        padding: 14px 20px;
        text-decoration: none;

    }

    .navbar ul li a:hover {
        background-color: #555;
    }
</style>


<div class="container">
    <nav class="navbar">
        <ul>
            <li><a href="/">Népszerű</a></li>
            <li><a href="/movieList">Megtekintett filmek</a></li>
            <li><a href="/watchList">Megnézendő filmek</a></li>
        </ul>
    </nav>
    <slot />
</div>