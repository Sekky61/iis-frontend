# Frontend Aukce

Autoři: Michal Majer, Petr Pouč, Michal Řezník

Pracuje s backendem: [Repozitář s backendem](https://github.com/Sekky61/iis-backend)

## Instalace
Požadavky stejně jako u backendu, node a npm
```
npm install
```

### Development
```
npm run serve
```

Pro komunikaci s backendem je potřeba nastavit proměnné prostředí

Jednou možností je založit soubor .env.development a vložit
`VUE_APP_BACKEND_URL=http://localhost:3000`

### Production
Master větev se sama deployne na hosting
```
npm run build
```
