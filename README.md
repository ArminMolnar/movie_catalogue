# AN2MYC - Molnár Ármin: Filmkatalógus webalkalmazás



## Telepítés

1. Repository klónózása és dependency-k telepítése:

```bash

git clone https://github.com/ArminMolnar/movie_catalogue.git
cd movie_catalogue
npm install
```
Ez automatikusan legenerálja a szükséges Prisma klienst is

2. Ha változtatunk valamit a schema.prisma fáljban, szükséges a 

```bash

npx prisma generate
```
lefuttatása.

3. .env.example tartalmának .env fáljba átmásolása, majd az általam küldött API kulcs és adatbázis URL beillesztése
```bash
# env.example
DATABASE_URL="mongodb_url"
PUBLIC_API_KEY=api_key
```

4. Szerver futtatása:
```bash

npm run dev
```

## A projektről
A projekt egy személyes filmkatalógus webalkalmazást valósít meg.
Célja, hogy filmeket tudjak megnézendő listába helyezni, valamint már megnézett filmeket tudjak személyesen értékelni.

## Megvalósítása
A weboldalon kettő "fő" filmlista található, ezek a themoviedb.org-ról lekért listák, melyek a jelenleg népszerű, illetve a legjobbra értékelt filmeket jelenítik meg.

Mindkét listában lehetőség van filmek keresése a nevük alapján.

A filmek a poszterükön található gombra kattintva helyezhetők vagy a megnézendő listába, vagy a már megtekintett filmek listájába.

A filmek értékelésére a megtekintett filmek listájába lépve nyílik lehetőség, ahol 1-10ig terjezdő skálán lehet pontozni az adott filmet.
Pontozás után a poszter alatt megjelenik az általam adott értékelés.

## Kódszerkezet

```bash

src/
├── components/
├── lib/
│   ├── api/
│   ├── server/
│   ├── stores/
│   └── types/
├── routes/
│   ├── api/
│   ├── movieDetails/
│   ├── movies/
│   ├── search/
│   ├── +layout.svelte
│   ├── +page.svelte
│   └── +page.ts
```

### components:
Többször felhasznált komponensek:
 - HomeButton
 - OptionsButton
 - PopupMenu
 - SectionTitle
 - MovieGrid
 - MovieCard
 - SearchMovies
 - Notifications

Külső forrásból származó komponensek:
  1. StarRating, RatingWindow
-  forrás: https://www.agnosui.dev/latest/
2. Notifications
- forrás: Notification Toast Custom Store on svelte.dev playground
- twitter @kevmodrome

### lib/api
- movie.ts: API segítségével filmek lekérése TheMovieDB weboldalról
- rating.ts: filmek értékelésének mentése és lekérdezése (POST és GET kérések küldése)

### lib/server
- db.ts: Prisma kliens inicializálása

### lib/stores
- menuStore.ts: jelenleg megnyitott menü állapotának tárolása
- movieStore.ts: filmlisták betöltése, filmek hozzáadása, eltávolítása, megjelölése
- notificationStore.ts: értesítési rendszer megvalósítása
- searchQueryStore.ts: keresősáv tartalmának tárolása

### lib/types
- movie.ts
- optionsButton.ts

### routes/api/rating
- +server.ts: filmek értékelésének mentése és visszakérése (POST és GET kérések feldolgozása)

### routes/api/watchedMovieList
- filmek hozzáadása, lekérdezése, törlése a "Megtekintett filmek" a listából

### routes/api/watchList
- filmek hozzáadása, lekérdezése, törlése a "Megnézendő filmek" listából

### routes/movieDetails
- adott filmre kattintva részletes információ megjelenítése

...

## Adatbázisban tárolt adatok

### WatchedMovieItem / WatchlistItem
- movieId: film egyedi azonosítója
- title: film címe
- posterPath: film plakátjának elérési útja
- voteAverage: film átlagos értékelése
- releaseDate: film megjelenési dátuma
- overview: film leírása
- watchedAt / addedAt: hozzáadás időpontja

### MovieRating
- movieId
- rating: film egyéni értékelése

## Kommunikáció módja

### Kezdőállapot
#### 1. Külső API hívás
A főoldal vagy a legjobbra értékelt filmek oldal megnyitásakor:
- a lib/api/movie.ts függvényei lekérik az adatokat (filmek listáját) a TheMovieDB-ről 


#### 2. Filmek megjelenítése
- ezeket a filmadatokat a megfelelő +page.svelte oldalak megkapják,
- majd továbbítják a megjelenítésért felelős komponenseknek (MovieGrid.svelte, MovieCard.svelte)

### Felhasználói műveletek esetén
#### 3. Backend kommunikáció, saját API hívás
- a lib/stores/movieStore.ts függvényei (pl. addToWatchlist, markAsWatched) POST kérést küldenek a saját backend API útvonalakra (pl. routes/api/watchList/+server.ts)
- Prisma ORM segítségével tárolódnak az adatok az adatbázisban

#### 4. Store frissítése
- minden sikeres művelet során frissül a megfelelő store (watchlist, watchedMovies)
- mivel a komponensek figyelik a store-okat (\$watchlist, \$watchedMovies használatával), így a felhasználói felület automatikusan frissül, amikor változás történik


