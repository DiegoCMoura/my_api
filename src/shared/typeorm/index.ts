import { Role } from '@roles/entities/Role'
import { User } from '@users/entities/user'
import { DataSource } from 'typeorm'
import { CreateRolesTable1672451901934 } from './migrations/1672451901934-CreateRolesTable'
import { CreateUsersTable1672748678003 } from './migrations/1672748678003-CreateUsersTable'
import { AddRoleIdToUsersTable1672748886775 } from './migrations/1672748886775-AddRoleIdToUsersTable'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role, User],
  migrations: [
    CreateRolesTable1672451901934,
    CreateUsersTable1672748678003,
    AddRoleIdToUsersTable1672748886775,
  ],
})
