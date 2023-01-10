import { inject, injectable } from 'tsyringe'
import { compare } from 'bcryptjs'
import jwtConfig from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/user'
import { IUserRepository } from '@users/repositories/IUsersRepository'
import { sign } from 'jsonwebtoken'

type CreateLoginDto = {
  email: string
  password: string
}

type IResponse = {
  user: User
  token: string
}

@injectable()
export class CreateLoginUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute({ email, password }: CreateLoginDto): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordConfirmed = await compare(password, user.password)
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const token = sign({}, jwtConfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
    })

    return {
      user,
      token,
    }
  }
}
