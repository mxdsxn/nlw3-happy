import { Router } from 'express'

import orphanagesRoute from './orphanages'

const routes = Router()
routes.use(orphanagesRoute)

export default routes