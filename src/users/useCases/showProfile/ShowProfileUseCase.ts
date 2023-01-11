import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/user'
import { IUserRepository } from '@users/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'

type ShowProfileParams = {
  userId: string
}

@injectable()
export class ShowProfileUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute({ userId }: ShowProfileParams): Promise<User> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    return user
  }
}
