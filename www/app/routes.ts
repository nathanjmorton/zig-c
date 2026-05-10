import { get, route } from 'remix/fetch-router/routes'

export const routes = route({
  assets: get('/assets/*path'),
  home: '/',
  docs: '/docs',
  maintainer: '/maintainer',
  bustub: '/bustub',
  install: get('/install.sh'),
  copyScript: get('/copy.js'),
})
