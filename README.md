# Thème astral gratuit — Astroguide.net

Calculateur de thème natal fonctionnant entièrement dans le navigateur
(positions planétaires, nœuds, ascendant, maisons, dignités, aspects, export).

## Licence

Ce projet est distribué sous licence **GNU AGPL-3.0** (voir le fichier `LICENSE`).

Il repose sur la **Swiss Ephemeris** de Dieter Koch et Alois Treindl
(© Astrodienst AG, Suisse — https://www.astro.com/swisseph/),
disponible en double licence AGPL / licence professionnelle.
Ce projet retient la voie **AGPL**.

## Composant tiers

Les calculs sont assurés par le wrapper WebAssembly **swisseph-wasm** (auteur : prolaxu),
sous licence **GPL-3.0-or-later**.

- Version utilisée : **0.1.0**
- Code source : **https://github.com/prolaxu/swisseph-wasm**
- Chargement : à l'exécution, depuis le CDN jsDelivr
  (`https://cdn.jsdelivr.net/npm/swisseph-wasm@0.1.0/`).

Le module WebAssembly n'est donc pas copié dans ce dépôt : il est chargé depuis le CDN,
et son code source complet — ainsi que les instructions de compilation du source C
vers WebAssembly — est disponible publiquement à l'adresse ci-dessus, pour la version indiquée.

## Confidentialité

Tout le calcul s'effectue localement dans le navigateur du visiteur.
Aucune donnée de naissance n'est transmise à un serveur.
