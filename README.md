# json-live-test

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Demo: http://mattdesl.github.io/json-live-test  
Screencast: https://www.youtube.com/watch?v=b071yBZx-hY  

Experiments with [json-live](https://github.com/mattdesl/json-live) and [budo](https://github.com/mattdesl/budo) for rapid prototyping.

```sh
git clone https://github.com/mattdesl/json-live-test
cd json-live-test
```

To run the incremental watchify server with LiveReload (browser page refresh):

```sh
npm run start
```

Now open `localhost:9966` to see the content. 

Alternatively, you can run without LiveReload but with json-live hot reloading (no page refresh). For that:

```sh
## first run the json-live server
npm run json-live

## then in another tab/process...
npm run start-json
```

With `start-json`, when you change `test.json` properties it will modify the values in runtime.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/json-live-test/blob/master/LICENSE.md) for details.
