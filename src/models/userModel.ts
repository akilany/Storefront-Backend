import bcrypt from 'bcrypt'
import Client from '../database'

const { PASSWORD_SECRET, SALT_ROUNDS } = process.env
const saltRounds = parseInt(JSON.stringify(SALT_ROUNDS))

export type User = {
  id?: number | string
  first_name: string
  last_name: string
  email: string
  password?: string
}

export class UserStore {
  async index(): Promise<User[]> {
    const connection = await Client.connect()
    const sql = 'SELECT id, first_name, last_name, email FROM users'
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
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email'

    const hash = await bcrypt.hash(
      (user.password as string) + PASSWORD_SECRET,
      saltRounds
    )

    const result = await connection.query(sql, [
      user.first_name,
      user.last_name,
      user.email,
      hash,
    ])

    connection.release()
    return result.rows[0]
  }

  async update(id: number | string, user: User): Promise<User> {
    const connection = await Client.connect()
    const sql =
      'UPDATE users SET first_name=$1, last_name=$2, email=$3 WHERE id=$4 RETURNING id, first_name, last_name, email'
    const result = await connection.query(sql, [
      user.first_name,
      user.last_name,
      user.email,
      id,
    ])

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
      if (
        await bcrypt.compare(
          oldPassword + PASSWORD_SECRET,
          user.password as string
        )
      ) {
        const sql =
          'UPDATE users SET password=$1 WHERE id=$2 RETURNING id, first_name, last_name, email'
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

      if (await bcrypt.compare(password + PASSWORD_SECRET, user.password)) {
        user.password = undefined
        return user
      }
    }

    return null
  }

  async delete(id: number | string): Promise<User> {
    const connection = await Client.connect()
    const sql =
      'DELETE FROM users WHERE id=($1) RETURNING id, first_name, last_name, email'

    const result = await connection.query(sql, [id])

    connection.release()
    return result.rows[0]
  }
}
