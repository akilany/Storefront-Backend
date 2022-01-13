import Client from '../database'

export type Order = {
  id?: string | number
  status: string
  user_id: number | string
}

export class OrderStore {
  async index(): Promise<Order[]> {
    const connection = await Client.connect()
    const sql = `SELECT orders.*, 
    array_agg(row_to_json(order_products)) AS products
    FROM orders
    FULL JOIN order_products ON orders.id = order_products.order_id
    GROUP BY orders.id
    `
    const results = await connection.query(sql)
    connection.release()
    return results.rows
  }

  async show(id: string | number): Promise<Order> {
    const connection = await Client.connect()
    const sql = 'SELECT * FROM orders WHERE id=($1)'
    const results = await connection.query(sql, [id])
    connection.release()
    return results.rows[0]
  }

  async create(order: Order): Promise<Order> {
    const connection = await Client.connect()
    const sql =
      'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *'
    const result = await connection.query(sql, [order.status, order.user_id])

    connection.release()
    return result.rows[0]
  }

  async update(id: number | string, order: Order): Promise<Order> {
    const connection = await Client.connect()
    const sql = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *'
    const result = await connection.query(sql, [order.status, id])

    connection.release()
    return result.rows[0]
  }

  async delete(id: number | string): Promise<Order> {
    const connection = await Client.connect()
    const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *'
    const result = await connection.query(sql, [id])

    connection.release()
    return result.rows[0]
  }
}
