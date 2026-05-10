import type { BuildAction } from 'remix/fetch-router'

import type { routes } from '../routes.ts'
import { BustubPage } from '../ui/bustub-page.tsx'
import { render } from '../utils/render.tsx'

export const bustub: BuildAction<'GET', typeof routes.bustub> = {
  handler({ request }) {
    return render(<BustubPage />, request)
  },
}
