import { createRouter } from 'remix/fetch-router'

import { home } from './controllers/home.tsx'
import { docs } from './controllers/docs.tsx'
import { bustub } from './controllers/bustub.tsx'
import { maintainer } from './controllers/maintainer.tsx'
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

router.get(routes.copyScript, () => {
  return new Response(COPY_JS, {
    headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
  })
})

router.map(routes.home, home)
router.map(routes.docs, docs)
router.map(routes.bustub, bustub)
router.map(routes.maintainer, maintainer)

const COPY_JS = `
document.addEventListener('click', function(e) {
  var el = e.target.closest('[data-copy]');
  if (!el) return;
  var text = el.getAttribute('data-copy');
  navigator.clipboard.writeText(text).then(function() {
    var span = el.querySelector('.copy-feedback');
    if (!span) {
      span = document.createElement('span');
      span.className = 'copy-feedback';
      span.style.cssText = 'position:absolute;top:8px;right:12px;font-size:11px;color:var(--accent);transition:opacity 150ms ease;pointer-events:none;';
      el.appendChild(span);
    }
    span.textContent = 'Copied!';
    span.style.opacity = '1';
    setTimeout(function() { span.style.opacity = '0'; }, 1500);
  });
});
`
