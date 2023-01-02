import { createRolesController } from '@roles/useCases/createRole'
import { deleteRolesController } from '@roles/useCases/deleteRole'
import { listRolesController } from '@roles/useCases/listRoles'
import { showRolesController } from '@roles/useCases/showRole'
import { updateRolesController } from '@roles/useCases/updateRole'

import { Router } from 'express'

const rolesRoute = Router()

rolesRoute.post('/', (request, response) => {
  return createRolesController.handle(request, response)
})

rolesRoute.get('/', (request, response) => {
  return listRolesController.handle(request, response)
})

rolesRoute.get('/:id', (request, response) => {
  return showRolesController.handle(request, response)
})

rolesRoute.put('/:id', (request, response) => {
  return updateRolesController.handle(request, response)
})

rolesRoute.delete('/:id', (request, response) => {
  return deleteRolesController.handle(request, response)
})

export { rolesRoute }
