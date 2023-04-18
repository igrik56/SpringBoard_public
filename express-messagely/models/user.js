/** User class for message.ly */
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');
const db = require('../db')


/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) {

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    
    const result = await db.query(`
    INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at)
    VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING username, password, first_name, last_name, phone`, [username, hashedPassword, first_name, last_name, phone])
    
    return result.rows[0]
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {

    const result = await db.query(`SELECT password FROM users WHERE username = $1`, [username])
    const user = result.rows[0]

    //  why this way does not work? 

    // const checkPassword = await bcrypt.compare(password, user.password)
    // return user && checkPassword

    return user && await bcrypt.compare(password, user.password)
   }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) { 

    await db.query(
      `UPDATE users 
      SET last_login_at = CURRENT_TIMESTAMP 
      WHERE username = $1`,
      [username])
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() { 
    const result = await db.query(
    `SELECT username, first_name, last_name, phone
      FROM users
      ORDER BY username
    `)
    return result.rows
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) { 
    const result = await db.query(`
      SELECT username, first_name, last_name, phone, join_at, last_login_at
      FROM users
      WHERE username = $1
    `, [username])

    return result.rows[0] 
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) { 
    const result = await db.query(
    `SELECT m.id,
            m.to_username,
            u.first_name,
            u.last_name,
            u.phone,
            m.body,
            m.sent_at,
            m.read_at
      FROM messages AS m
      JOIN users AS u ON m.to_username = u.username
      WHERE from_username = $1`,
      [username])

const resp = result.rows.map(e => ({
      id: e.id,
      to_user: {
      username: e.to_username,
      first_name: e.first_name,
      last_name: e.last_name,
      phone: e.phone,
      },
      body: e.body,
      sent_at: e.sent_at,
      read_at: e.read_at
      }))
    return resp
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) {

    const result = await db.query(
      `SELECT m.id,
              m.from_username,
              u.first_name,
              u.last_name,
              u.phone,
              m.body,
              m.sent_at,
              m.read_at
      FROM messages AS m
      JOIN users AS u ON m.from_username = u.username
      WHERE to_username = $1`,
      [username])

    const resp = result.rows.map(e => ({
      id: e.id,
      from_user: {
        username: e.from_username,
        first_name: e.first_name,
        last_name: e.last_name,
        phone: e.phone,
      },
      body: e.body,
      sent_at: e.sent_at,
      read_at: e.read_at
    }))
    
    return resp
  }
}


module.exports = User;