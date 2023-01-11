import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateProfileUseCase } from './UpdateProfileUseCase'

export class UpdateProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateProfileUsecase = container.resolve(UpdateProfileUseCase)
    const { name, email, password, isAdmin, roleId } = request.body
    const user = await updateProfileUsecase.execute({
      name,
      email,
      password,
      isAdmin,
      roleId,
    })
    return response.status(201).json(instanceToInstance(user))
  }
}
