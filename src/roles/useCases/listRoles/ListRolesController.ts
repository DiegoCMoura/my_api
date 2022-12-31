import { ListRolesUseCase } from './ListRolesUseCase'
import { Request, Response } from 'express'

export class ListRolesController {
  constructor(private listRolesUseCase: ListRolesUseCase) {}

  handle(request: Request, response: Response): Response {
    const roles = this.listRolesUseCase.execute()
    return response.json(roles)
  }
}
