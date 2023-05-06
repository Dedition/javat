# client

_Required: locally installed version of npm/node_

To start the react client, run the following:

```shell
npm install
npm start
```

## Notes

- The client creates a reverse proxy to the api, and all api calls can be made like so: `fetch('/api/...')`

  - Because of this, it is probably best to start either (not both!) the go api or the python api before starting the react client.

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
