# angular-icdc-generated-project

## Descriptif

> Template projet Angular

## Prérequis

* python >= 2.7 < 3
* npm >= 5
* Nodejs >= 8
* git

## Stack technique

* Angular v8+
* Webpack v4+
* Typescript 3.1.3
* Tests unitaires : Mocha, Chai, Sinon
* Ngx-translate * <a href="https://github.com/ngx-translate/core">docs</a>
* Tests IHM : Protractor (avec Mocha, Chai, Sinon)
* Angular cli : 8.1.1

## Progressive Web Apps

Le sous-générateur (yo icdc:pwa) est disponible pour convertir une application Angular en une application PWA.
On se base sur les plugins suivants :

* Workbox webpack Plugins * <a href="https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#configuration">docs</a>
* Webpack pwa manifest Plugin * <a href="https://github.com/arthurbergmz/webpack-pwa-manifest">docs</a>

La configuration de ces plugins est externalisée dans les fichiers : manifest-config.js et sw-config.js.



## Documentation

* <a href="https://forge-confluence.serv.cdc.fr/pages/viewpage.action?pageId=239960144">Environnement de développement</a>
* <a href="https://forge-confluence.serv.cdc.fr/display/CCMTA/Application+web">Détails des fichiers générés</a>
* <a href="https://forge-confluence.serv.cdc.fr/pages/viewpage.action?pageId=239960167">Tests unitaires avec Mocha, Chai et Sinon</a>

## Principales commandes

### Lancement

```
npm start
```

Déployer le projet sur le serveur de développement local, l'apllication est disponible sur : http://localhost:3000

### Build

```
npm run build:dev
```

Lance la construction webpack vers le répertoire dist (en mode dev.)

```
npm run build:prod
```

Lance la construction webpack optimisée pour la production vers le répertoire dist

```
npm run build:package
```

Construire un artéfact optimisé pour la production et prêt à être déployé sur un serveur de production via l'outils FUSION

### Angular cli

```
ng generate component mon-super-composant
```

ou

```
npm run ng generate component mon-super-composant
```

Génère un composant Angular dans le répertoire courant.
Changer *component* par (directive, pipe, service, class, guard, interface, enum, module)

<a href="https://angular.io/cli">Wiki Angular cli</a>

### Tests

```
npm run test
```

Lance les tests unitaires avec Mocha


```
npm run e2e
```

Lance les tests IHM protractor


```
npm run ci
```

Lance les tests unitaires + IHM + la qualimétrie


```
npm run test:watch
```

Lance les tests unitaires avec le mode watch 

```
npm run test:server
```

Lance les tests unitaires en mode serveur sur le port 8888 (http://localhost:8888, utile pour débugger ses TU)

### Clean

```
npm run clean:dist
```

Purge du répertoire des livrables (dist)

```
npm run clean:all
```

Purge des tous les répertoires de travaux : doc, coverage, dist, reports


### Qualimétrie

```
npm run docs
```

Lance la construction de la doc <a href="http://typedoc.org/">typedoc</a>

```
npm run lint
```

Lance l'analyse tslint + codelyzer. Les régles sont dans le fichier tslint.json


### Serveur local

```
npm run server:dev
```

Lance un serveur webpack-dev-server avec les sources en mode "dev" 

```
npm run server:prod
```

Lance un serveur http local avec les sources en mode "prod"
