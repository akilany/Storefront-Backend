import bcrypt from 'bcrypt'
import Client from '../database'

const { PASSWORD_SECRET, SALT_ROUNDS } = process.env
const saltRounds = parseInt(JSON.stringify(SALT_ROUNDS))

export type User = {
  id?: number | string
  name: string
  email: string
  password: string
}

export class UserStore {
  async index(): Promise<User[]> {
    const connection = await Client.connect()
    const sql = 'SELECT * FROM users'
    const results = await connection.query(sql)
    connection.release()
    return results.rows
  }

  async show(id: string | number): Promise<User> {
    const connection = await Client.connect()
    const sql = 'SELECT * FROM users WHERE id=($1)'
    const results = await connection.query(sql, [id])
    connection.release()
    return results.rows[0]
  }

  async create(user: User): Promise<User> {
    const connection = await Client.connect()
    const sql =
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *'

    const hash = await bcrypt.hash(user.password + PASSWORD_SECRET, saltRounds)

    const result = await connection.query(sql, [user.name, user.email, hash])

    connection.release()
    return result.rows[0]
  }

  async update(id: number | string, user: User): Promise<User> {
    const connection = await Client.connect()
    const sql = 'UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *'
    const result = await connection.query(sql, [user.name, user.email, id])

    connection.release()
    return result.rows[0]
  }

  async updatePassword(
    id: string | number,
    oldPassword: string,
    newPassword: string
  ): Promise<User | null> {
    const connection = await Client.connect()
    // Get User Data
    const user = await this.show(id)
    if (user) {
      //@ts-ignore
      if (await bcrypt.compare(oldPassword + PASSWORD_SECRET, user.password)) {
        const sql = 'UPDATE users SET password=$1 WHERE id=$2 RETURNING *'
        const hash = await bcrypt.hash(
          newPassword + PASSWORD_SECRET,
          saltRounds
        )

        const result = await connection.query(sql, [hash, id])

        connection.release()
        return result.rows[0]
      }
    }

    return null
  }

  async auth(email: string, password: string): Promise<User | null> {
    const connection = await Client.connect()
    const sql = 'SELECT * FROM users WHERE email=($1)'
    const result = await connection.query(sql, [email])

    if (result.rows.length) {
      const user = result.rows[0]

      if (await bcrypt.compare(password + PASSWORD_SECRET, user.password))
        return user
    }

    return null
  }

  async delete(id: number | string): Promise<User> {
    const connection = await Client.connect()
    const sql = 'DELETE FROM users WHERE id=($1) RETURNING *'

    const result = await connection.query(sql, [id])

    connection.release()
    return result.rows[0]
  }
}
