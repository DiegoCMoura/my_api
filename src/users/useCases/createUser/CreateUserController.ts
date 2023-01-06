import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUsecase = container.resolve(CreateUserUseCase)
    const { name, email, password, isAdmin, roleId } = request.body
    const user = await createUserUsecase.execute({
      name,
      email,
      password,
      isAdmin,
      roleId,
    })
    return response.status(201).json(user)
  }
}
