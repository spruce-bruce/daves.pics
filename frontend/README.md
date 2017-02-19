# frontend-template

## Setup

`npm install`

You may need to change the location of the backend API in `package.json` if you're not using our Dockerized backend template. By default, all requests that aren't recognized by the dev server will be proxied to `http://api:9000`. Requires node >= 4.

## Usage

`npm start`

### Environment Variables

Environment variables must be prefixed with `REACT_APP_`. By default, `REACT_APP_ENV` determines the environment used to generate `config.js`.

### Redux Dev Tools

Redux Dev Tools are available in development mode and can be accessed with `ctrl + h` and moved with `ctrl + q`.

## Testing

`npm test`

Jest will look for test files with any of the following popular naming conventions:

* Files with `.js` suffix in `__tests__` folders.
* Files with `.test.js` suffix.
* Files with `.spec.js` suffix.

The `.test.js` / `.spec.js` files (or the `__tests__` folders) can be located at any depth under the `src` top level folder.

## Deployment

`npm run build` to output a build folder or `npm run dist` to output a ZIP.

## Organization
```
├── public                    # Static assets that will be compiled into the final build
├── src                       # App code that will be bundled by react-scripts/webpack
│   ├── client.js             # HTTP client configuration
│   ├── common                # Common module contains code shared by other top level modules
│   │   └── utils
│   ├── config.js             # App-wide config
│   ├── index.js              # Entry point, bootstraps React, Redux
│   ├── reducers.js           # Reducers from each module are rolled up into top level
│   ├── routes.js             # Routes from each module are rolled up into top level
│   └── style-guide           # Each functional module of the app is self-contained
│       ├── StyleGuidePage.js
│       ├── actions.js
│       ├── reducers.js
│       └── *                 # Modules can be sensibly nested
└── styles                    # Stylesheets that will be bundled into `/src/index.css`
    └── index.styl            # Stylus entry point
```

## Learn More

This template is based on `react-scripts`. See the latest [README](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) for more information.
