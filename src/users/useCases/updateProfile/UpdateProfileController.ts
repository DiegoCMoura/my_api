import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateProfileUseCase } from './UpdateProfileUseCase'

export class UpdateProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateProfileUsecase = container.resolve(UpdateProfileUseCase)
    const { name, email, password, old_password } = request.body
    const user = await updateProfileUsecase.execute({
      userId: request.user.id,
      name,
      email,
      password,
      old_password,
    })
    return response.json(instanceToInstance(user))
  }
}
