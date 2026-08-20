# Space Clicker

Kosmiczna gra typu clicker, w której rozwijasz wydobycie rzadkiego surowca — Stellarium. Wydobywaj ręcznie, wzmacniaj swoją moc i buduj flotę jednostek, która pracuje także automatycznie.

## Rozgrywka

1. Klikaj **Wydobywaj**, aby zdobywać Stellarium.
2. Kupuj ulepszenia wydobycia, aby zwiększać zysk z każdego kliknięcia.
3. Rozwijaj flotę wydobywczą. Każda jednostka dodaje produkcję na sekundę oraz premię do ręcznego wydobycia.
4. Odblokowuj kolejne, potężniejsze jednostki, gdy zgromadzisz wymagane zasoby.

Postęp, wybrany motyw i stan floty są zapisywane lokalnie w przeglądarce. Przycisk **Resetuj postęp** usuwa ten zapis.

## Najważniejsze elementy

- 12 rozwijanych jednostek floty — od Sondy Zbieracza po Kolektor Kwazara;
- automatyczne wydobycie Stellarium;
- rosnący koszt kolejnych poziomów i jednostek;
- jasny oraz ciemny motyw interfejsu;
- responsywny interfejs dostępny z klawiatury.

## Uruchomienie lokalne

Wymagany jest Node.js.

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod adresem wyświetlonym przez Vite. Do sprawdzenia wersji produkcyjnej użyj:

```bash
npm run build
npm run preview
```

## Dostępne polecenia

| Polecenie | Opis |
| --- | --- |
| `npm run dev` | Uruchamia serwer deweloperski. |
| `npm run build` | Tworzy produkcyjny build w katalogu `dist`. |
| `npm run preview` | Lokalnie podgląda produkcyjny build. |
| `npm run lint` | Sprawdza kod ESLintem. |

## Wdrożenie

Każdy push do gałęzi `main` lub `master` uruchamia GitHub Actions, buduje aplikację i publikuje ją pod adresem [space-clicker.mwozniczka.net](https://space-clicker.mwozniczka.net). Konfiguracja procesu znajduje się w [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

Do działania wdrożenia potrzebne są sekrety repozytorium: `SSH_HOST`, `SSH_USERNAME`, `SSH_PORT` oraz `SSH_PRIVATE_KEY`.

## Technologie

- React i Vite
- Framer Motion
- Lucide
- localStorage

## Licencja

Projekt jest udostępniony na warunkach licencji [MIT](LICENSE).
