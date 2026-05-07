import type { BuildAction } from 'remix/fetch-router'

import type { routes } from '../routes.ts'
import { MaintainerPage } from '../ui/maintainer-page.tsx'
import { render } from '../utils/render.tsx'

export const maintainer: BuildAction<'GET', typeof routes.maintainer> = {
  handler({ request }) {
    return render(<MaintainerPage />, request)
  },
}
