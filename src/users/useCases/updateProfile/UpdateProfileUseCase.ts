import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/user'
import { IUserRepository } from '@users/repositories/IUsersRepository'
import { compare, hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

type UpdateProfileDto = {
  userId: string
  name: string
  email: string
  password?: string
  old_password?: string
}

@injectable()
export class UpdateProfileUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute({
    userId,
    name,
    email,
    password,
    old_password,
  }: UpdateProfileDto): Promise<User> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    const userUpdateEmail = await this.userRepository.findByEmail(email)
    if (userUpdateEmail && userUpdateEmail.id !== userId) {
      throw new AppError('There is already one user with this email')
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)
      if (!checkOldPassword) {
        throw new AppError('Old password does not match')
      }

      user.password = await hash(password, 10)
    }
    user.name = name
    user.email = email

    return this.userRepository.save(user)
  }
}
