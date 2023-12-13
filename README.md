# Driver Management Front End

## About 

This is a front end project(dmfe) for Bus Driver Management System which is the assignment of database course in Xidian University.

[Vue](https://vuejs.org) & [Vuetify](https://vuetifyjs.com/) are used.

[DMBE](https://github.com/ruitianzhong/dmbe) is the related project written in [Go](https://go.dev/) for back end .

Copyright © 2023-Present [Ruitian Zhong](https://zrt.ink)


## Configuration

### API baseURL

Modify the axios.defaults.baseURL in [api/config.js](./src/api/config.js) according to your need.

For example, if you are using https://example.com for [DMBE](https://github.com/ruitianzhong/dmbe),
you can configure defaults.baseURL like this

```javascript
axios.defaults.baseURL = 'https://example.com';
```

If you are just testing on your machine, and [DMBE](https://github.com/ruitianzhong/dmbe) has been set up on your machine which is listening on port 8080, you can configure like this:

```javascript
axios.defaults.baseURL = 'http://localhost:8080';
```
## Project setup

```)
# yarn
yarn

# npm
npm install

# pnpm
pnpm install

# pnpm
bun install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev

# bun
bun run dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build

# bun
bun run build
```

### Lints and fixes files

```
# yarn
yarn lint

# npm
npm run lint

# pnpm
pnpm lint

# bun
bun run lint
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).
