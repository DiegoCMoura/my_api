import { Router } from 'express'
import { rolesRouter } from '@roles/http/routes/roles.routes'
import { usersRouter } from '@users/http/routes/user.routes'

const routes = Router()

routes.get('/', (request, response) => {
  return response.json({ message: 'Olá devs' })
})

routes.use('/roles', rolesRouter)
routes.use('/users', usersRouter)

export { routes }
