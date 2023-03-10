import { dataSource } from '@shared/typeorm'
import { User } from '@users/entities/user'
import { Repository } from 'typeorm'
import {
  CreateUserDto,
  IUserRepository,
  PaginateParams,
  UsersPaginateProperties,
} from './IUsersRepository'

export class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = dataSource.getRepository(User)
  }

  async create({
    name,
    email,
    password,
    isAdmin,
    role,
  }: CreateUserDto): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      isAdmin,
      role,
    })
    return this.repository.save(user)
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user)
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<UsersPaginateProperties> {
    const [users, count] = await this.repository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.role', 'role')
      .skip(skip)
      .take(take)
      .getManyAndCount()
    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: users,
    }

    return result
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id })
  }

  async findByName(name: string): Promise<User | null> {
    return this.repository.findOneBy({ name })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email })
  }

  async delete(user: User): Promise<void> {
    await this.repository.remove(user)
  }
}
