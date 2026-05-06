import { createRouter } from 'remix/fetch-router'

import { home } from './controllers/home.tsx'
import { docs } from './controllers/docs.tsx'
import { routes } from './routes.ts'

const INSTALL_SCRIPT_URL = 'https://raw.githubusercontent.com/nathanjmorton/zigc/main/install.sh'

export const router = createRouter()

// Asset server (dev only — skipped when VERCEL_BUILD is set)
if (!process.env.VERCEL_BUILD) {
  try {
    const { assets } = await import('./assets.ts')
    router.get(routes.assets, async ({ request }) => {
      let response = await assets.fetch(request)
      return response ?? new Response('Not Found', { status: 404 })
    })
  } catch {}
}

router.get(routes.install, async () => {
  const upstream = await fetch(INSTALL_SCRIPT_URL)
  if (!upstream.ok) {
    return new Response('Failed to fetch install script', { status: 502 })
  }
  return new Response(upstream.body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
})

router.map(routes.home, home)
router.map(routes.docs, docs)
