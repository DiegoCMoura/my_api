import { RolesRepository } from '@roles/repositories/RolesRepository'
import { Router } from 'express'

const rolesRoute = Router()
const rolesRepository = new RolesRepository()

rolesRoute.post('/', (request, response) => {
  const { name } = request.body

  const roleAlreadyExists = rolesRepository.findByName(name)
  if (roleAlreadyExists) {
    return response.status(400).json({ error: 'Role already exists' })
  }

  const role = rolesRepository.create({ name })

  return response.status(201).json(role)
})

rolesRoute.get('/', (request, response) => {
  const roles = rolesRepository.findAll()

  return response.json(roles)
})

export { rolesRoute }
