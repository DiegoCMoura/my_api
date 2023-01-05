import { IUserRepository } from '@users/repositories/IUsersRepository'
import { UserRepository } from '@users/repositories/UserRepository'
import { container } from 'tsyringe'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
