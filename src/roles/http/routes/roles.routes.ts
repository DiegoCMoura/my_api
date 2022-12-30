import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'

const rolesRoute = Router()

const roles = []

rolesRoute.post('/', (request, response) => {
  const { name } = request.body

  const role = {
    id: uuidv4(),
    name,
    created_at: new Date(),
  }

  roles.push(role)

  return response.status(201).json(role)
})

export { rolesRoute }
