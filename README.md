# furry-eureka
A vue js frontend app for [Taurus]()

# Installation

Install dependencies,
```
$ npm install
```

Build the bundle,
```
$ npm run build
```

Start the server

```
$ npm start
```

For development the included `webpack-dev-server` can be started by running,

```
$ npm run dev
```

# Internals

The app has two parts

- An express server which serves the static files from the `/dist` folder. The server also serves two api endpoints, acting as a proxy between the frontend app and the main taurus app. The express formats the data for ease of use at the Vue side.
- A VueJs front end which gets the different stock ratios and plot them on the different charts.