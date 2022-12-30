import { Router } from 'express'
import { rolesRoute } from '@roles/http/routes/roles.routes'

const routes = Router()

routes.get('/', (request, response) => {
  return response.json({ message: 'Olá devs' })
})

routes.use('/roles', rolesRoute)

export { routes }
