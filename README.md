# Reactober

Dieses Repository enthält den Code und die Musterlösungen des in den [Reactober-Webinaren der the native web GmbH](https://www.thenativeweb.io/techlounge/reactober) entwickelten **Halloween Party Planner**.

## Tags der Tracks

Die unterschiedlichen Code-Stände der jeweiligen Tracks und Folgen sind mit den folgenden Tags versehen:

| Track      | Folge                                            | Tag                                                                  |
| ---------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| Einführung | 03: Qualitätssicherung                           | <image src='./docs/git-tag-icon.png' height="15px"> `einfuehrung`    |
| Deep-Dive  | **vor** 01: Architektur<br/> (gedacht als Start) | <image src='./docs/git-tag-icon.png' height="15px"> `deepdive-start` |
| Deep-Dive  | 01: Architektur                                  | <image src='./docs/git-tag-icon.png' height="15px"> `deepdive-01`    |
| Deep-Dive  | 02: Plugins                                      | <image src='./docs/git-tag-icon.png' height="15px"> `deepdive-02`    |
| Deep-Dive  | 03: Go live<br/> (finaler Code-Stand)            | <image src='./docs/git-tag-icon.png' height="15px"> `deepdive-03`    |

Diese können wie folgt ausgecheckt werden:

```shell
$ git checkout <tag-name>
```

Ein Besipiel, um den Einführungskurs auszuchecken:

```shell
$ git checkout einfuehrung
```

*Hinweis: Da der Einführungskurs pro Folge im Wesentlichen nur Code hinzufügt, ist dieser nicht pro Folge unterteilt, sondern als gesamte Musterlösung getagged.*

## Setup

### Systemvoraussetzungen

- [Node.js](https://nodejs.org/en/) Version 14 (oder höher)
- [npm](https://www.npmjs.com/) Version 6 (oder höher) - wird automatisch mit Node.js installiert

### Installation

```shell
$ npm install
```

Dieser Befehl muss einmalig beziehungsweise **immer nach dem Auschecken eines Tags** durchgeführt werden, um die jeweiligen Abhängigkeiten passend zu installieren.

## Ausführung

Das Projekt basiert auf dem Tool [Create React App](https://github.com/facebook/create-react-app).

Die folgenden Befehle sind möglich:

### `$ npm start`

Startet sowohl das Frontend als auch das Mock-Backend. Diese sind dann unter den folgenden Adressen erreichbar:

- Frontend: <http://localhost:3000>
- Backend: <http://localhost:3001>

Die App wird bei Veränderungen im Code **automatisch neu geladen**.

### `$ npm test`

Führt die Tests mit [jest](https://jestjs.io/) im so genannten *Watch-Mode* aus.

Bei diesem werden nur die Dateien getestet, an denen sich seit dem letzten `git commit` etwas geändert hat. Bei Änderungen im Source-Code werden die Tests erneut ausgeführt.

Mehr Informationen (leider nur auf Englisch) finden sich in der `create-react-app`-Dokumentation unter [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

### `$ npm run build`

Erstellt einen Production-Build des Frontends im `build`-Verzeichnis.

Mehr Informationen (ebenfalls nur auf Englisch) finden sich in der `create-react-app`-Dokumentation unter [deployment](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run lint`

Führt die statische Codeanalyse mit [eslint](https://eslint.org/) und im wesentlichen anhand der [eslint-config-es](https://github.com/thenativeweb/eslint-config-es) durch.

## Hinweis: Over-Engineering

Diese App ist komplett [over-engineered](https://de.wikipedia.org/wiki/Overengineering).

Sie dient dazu, wesentliche und teils fortgeschrittene Konzepte von React-Applikationen und Praktiken anhand sehr einfacher Beispiele zu zeigen. Dementsprechend sind simple Anforderungen meistens deutlich komplexer umgesetzt, als das notwendig wäre.

**Die App und der Code sollten daher nicht als Blaupause für andere React-Applikationen dienen. Der beste Code ist der simpelste, der die aktuellen Anforderungen erfüllt!**
