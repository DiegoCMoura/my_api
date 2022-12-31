import { createRolesController } from '@roles/useCases/createRole'
import { listRolesController } from '@roles/useCases/listRoles'
import { Router } from 'express'

const rolesRoute = Router()

rolesRoute.post('/', (request, response) => {
  return createRolesController.handle(request, response)
})

rolesRoute.get('/', (request, response) => {
  return listRolesController.handle(request, response)
})

export { rolesRoute }
