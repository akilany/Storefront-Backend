import Client from '../database'

export type Product = {
  id?: number | string
  name: string
  price: number
  category?: string
}

export class ProductStore {
  async index(): Promise<Product[]> {
    const connection = await Client.connect()
    const sql = 'SELECT * FROM products'
    const results = await connection.query(sql)
    connection.release()
    return results.rows
  }

  async show(id: string | number): Promise<Product> {
    const connection = await Client.connect()
    const sql = 'SELECT * FROM products WHERE id=($1)'
    const results = await connection.query(sql, [id])
    connection.release()
    return results.rows[0]
  }

  async create(product: Product): Promise<Product> {
    const connection = await Client.connect()
    const sql =
      'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *'
    const result = await connection.query(sql, [
      product.name,
      product.price,
      product.category,
    ])

    connection.release()
    return result.rows[0]
  }

  async update(id: number | string, product: Product): Promise<Product> {
    const connection = await Client.connect()
    const sql =
      'UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING *'
    const result = await connection.query(sql, [
      product.name,
      product.price,
      product.category,
      id,
    ])

    connection.release()
    return result.rows[0]
  }

  async delete(id: number | string): Promise<Product> {
    const connection = await Client.connect()
    const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'
    const result = await connection.query(sql, [id])

    connection.release()
    return result.rows[0]
  }
}
