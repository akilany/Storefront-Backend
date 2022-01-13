import Client from '../database'
import { Product } from '../models/productModel'

export default class DashboardStore {
  async productsByCategory(category: string): Promise<Product[]> {
    const connection = await Client.connect()
    const sql = 'SELECT * FROM products WHERE category=$1'
    const results = await connection.query(sql, [category])
    connection.release()
    return results.rows
  }

  async userOrders(
    id: number | string,
    status: string
  ): Promise<
    {
      id: string | number
      first_name: string
      last_name: string
      order_id: number | string
      status: string
    }[]
  > {
    const connection = await Client.connect()
    const sql =
      'SELECT users.id, first_name, last_name, orders.id as order_id, status FROM users INNER JOIN orders ON users.id = orders.user_id WHERE users.id = $1 AND orders.status = $2'

    const result = await connection.query(sql, [id, status])

    connection.release()
    return result.rows
  }

  async orderProducts(id: number | string): Promise<
    {
      id: string | number
      quantity: number
      order_id: string | number
      product_id: string | number
    }[]
  > {
    const connection = await Client.connect()
    const sql = 'SELECT * FROM order_products WHERE order_id=($1)'
    const result = await connection.query(sql, [id])
    connection.release()
    return result.rows
  }

  async addProduct(
    orderId: string | number,
    quantity: number,
    productId: string | number
  ): Promise<{
    id: string | number
    quantity: number
    order_id: string | number
    product_id: string | number
  }> {
    const connection = await Client.connect()
    const sql =
      'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *'
    const result = await connection.query(sql, [quantity, orderId, productId])
    connection.release()
    return result.rows[0]
  }
}
