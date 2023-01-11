import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ShowProfileUseCase } from './ShowProfileUseCase'

export class ShowProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showProfileUsecase = container.resolve(ShowProfileUseCase)
    const user = await showProfileUsecase.execute({
      userId: request.user.id,
    })
    return response.json(instanceToInstance(user))
  }
}
