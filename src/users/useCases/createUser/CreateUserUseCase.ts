import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/user'
import { IUserRepository } from '@users/repositories/IUsersRepository'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

type CreateUserDto = {
  name: string
  email: string
  password: string
  isAdmin: boolean
  roleId: string
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('RolesRepository') private roleRepository: IRolesRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    isAdmin,
    roleId,
  }: CreateUserDto): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(email)
    if (userAlreadyExists) {
      throw new AppError('Email address already exists')
    }

    const role = await this.roleRepository.findById(roleId)
    if (!role) {
      throw new AppError('Role not found', 404)
    }

    const hashedPassword = await hash(password, 10)
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      role,
    })

    return user
  }
}
