import { RolesRepository } from '@roles/repositories/RolesRepository'
import { createRolesController } from '@roles/useCases/createRole'
import { Router } from 'express'

const rolesRoute = Router()
const rolesRepository = new RolesRepository()

rolesRoute.post('/', (request, response) => {
  return createRolesController.handle(request, response)
})

rolesRoute.get('/', (request, response) => {
  const roles = rolesRepository.findAll()

  return response.json(roles)
})

export { rolesRoute }
