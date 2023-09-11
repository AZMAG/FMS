# FMS

MAG's Internal Website for viewing Freeway Management System data.

![MAG Logo](http://geo.azmag.gov/maps/images/maglogo_black.png)
![FMS Logo](http://geo.azmag.gov/maps/images/fms-logo.png)

## Table of Contents

1. [Introduction](#introduction)
2. [Keywords](#keywords)
3. [Version](#version)
4. [Credits](#credits)
5. [Site URLs](#site-urls)
6. [Technologies](#technologies)
7. [Getting Started](#getting-started)
    - [Client Setup](#client-setup)
    - [Server Setup](#server-setup)
8. [Disclaimer](#disclaimer)
9. [Licensing](#licensing)

## Introduction

The Freeway Management System (FMS) uses pairs of in-road sensors to detect the speed and density of traffic flow. This MAG application uses that data to help analyze traffic information.

## Keywords

`fms`, `freeway`, `management`, `detectors`, `corridor`, `state`, `Arizona`, `MAG`, `maps`

## Version

### version | 0.0.0

-   **Updated**: 2000-00-00
-   **Created**: 2000-00-00

Releases will be numbered with the following format:

-   **MAJOR**: When you make incompatible API changes (bumps the major, resets minor and patch).
-   **MINOR**: When you add functionality in a backwards-compatible manner (bumps the minor, resets patch).
-   **PATCH**: When you make backwards-compatible bug fixes and miscellaneous changes (bumps only the patch).

## Credits

This project is made possible by the Maricopa Association of Governments (MAG) and the MAG member agencies.

## Site URLs

## Technologies

A list of technologies used within the project:

-   [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/)
-   [React](https://reactjs.org/)
-   [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
-   [HTML5](https://www.w3.org/TR/html5/)
-   [CSS3](https://www.w3.org/TR/CSS/)
-   [Sass](https://sass-lang.com/)
-   [Node-Sass](https://github.com/sass/node-sass)
-   [Bootstrap](https://getbootstrap.com/)
-   [KendoReact](https://www.telerik.com/kendo-react-ui/components/)
-   [Font Awesome](https://fontawesome.com/)
-   [ESLint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [npm](https://www.npmjs.com/)
-   [Visual Studio Code](https://code.visualstudio.com/)

## Getting Started

Follow the steps below to get the FMS project up and running on your local machine.

### Client Setup

1. Navigate to the `client` directory in your terminal:
   cd client
2. Install project dependencies:
   npm install
3. Start the development server:
   npm run dev

The client application should now be running locally at [http://localhost:3000](http://localhost:3000).

### Server Setup

1. Navigate to the `server` directory in your terminal:
   cd server

2. Open the solution file in Visual Studio.

3. Build and run the server project in Visual Studio's debugging mode.

The server should now be up and running. You can access it through the client application.

## Publishing the project

1.  Update the doc config api url.
    apiUrl: "http://localhost:56118/",
    // apiUrl: "http://magdevarcgis/fms/",

2.  Run the following command to build the project.
    npm run build

3.  Copy the build folder to the server folder "\\magdevarcgis\arcgisvirtualroot\fms"

4.  In visual studio, publish the server project to the server by right clicking the project and selecting publish.

## Disclaimer

-   [DISCLAIMER](DISCLAIMER.md)

## Licensing

Copyright 2023 Maricopa Association of Governments (MAG)

This project is licensed under the MIT license.

-   [LICENSE](LICENSE)

[(Back to top)](#Keywords)
