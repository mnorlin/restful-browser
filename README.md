# REST-HAL client

Simple app to explore a RESTful API, expected to be built with JSON, [HAL](https://stateless.group/hal_specification.html), [HAL-Forms](https://rwcbook.github.io/hal-forms/) and [HTTP Problem Details API](https://datatracker.ietf.org/doc/html/rfc7807).

## Configuration

Modify the _proxy_ property in [package.json](package.json), to point to your API. If the API is behind a login page, you can configure a Bearer Authentication token and the name of a CSRF-Cookie in [.env](.env).

Run `npm install` and then `npm start` to start exploring the API, just input the relative URI of your endpoint in the browser, eg. `http://localhost:3000/api/users`;
