# Thème astral gratuit — Astroguide-logiciel

Calculateur de thème natal fonctionnant entièrement dans le navigateur.

## Licence
Ce projet est distribué sous licence **GNU AGPL-3.0**.

Il utilise la **Swiss Ephemeris** de Dieter Koch et Alois Treindl
(© Astrodienst AG, Suisse — https://www.astro.com/swisseph/),
disponible en double licence AGPL / licence professionnelle.
Ce projet retient la voie **AGPL**.

## Composant tiers
Calculs assurés via le wrapper WebAssembly **swisseph-wasm** (prolaxu),
licence GPL-3.0-or-later — https://github.com/prolaxu/swisseph-wasm
Version utilisée : 0.1.0 (copie incluse dans /swisseph-wasm).

## Reconstruire le WebAssembly
Le module .wasm est fourni par le wrapper ci-dessus ; les instructions
de compilation du source C vers WebAssembly figurent dans son dépôt.
