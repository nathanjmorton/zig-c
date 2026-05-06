import { createRouter } from 'remix/fetch-router'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { assets } from './assets.ts'
import { home } from './controllers/home.tsx'
import { docs } from './controllers/docs.tsx'
import { routes } from './routes.ts'

export const router = createRouter()

router.get(routes.assets, async ({ request }) => {
  let response = await assets.fetch(request)
  return response ?? new Response('Not Found', { status: 404 })
})

router.get(routes.install, () => {
  const script = readFileSync(resolve(import.meta.dirname, '../../install.sh'), 'utf-8')
  return new Response(script, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
})

router.map(routes.home, home)
router.map(routes.docs, docs)
