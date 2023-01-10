import { v4 as uuidV4 } from 'uuid'
import { dataSource } from '@shared/typeorm'
import { hash } from 'bcryptjs'

async function create() {
  const connection = await dataSource.initialize()
  // Create role
  const roleId = uuidV4()
  await connection.query(`
  INSERT INTO roles(id, name)
  VALUES('${roleId}', 'TI')
  `)

  // Create User
  const userId = uuidV4()
  const password = await hash('1234', 10)
  await connection.query(`
  INSERT INTO users(id, name, email, password, "isAdmin", roleId)
  VALUES('${userId}', 'admin', 'a@a.com', '${password}', true, '${roleId}')
  `)

  await connection.destroy()
}

create().then(() => console.log('User admin created!'))
