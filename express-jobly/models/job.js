"use strict";

const db = require ('../db')
const {NotFoundError} = require ("../expressError")
const { sqlForPartialUpdate } = require("../helpers/sql");

class Job {
    static async create(data){
        const result = await db.query(
            `INSERT INTO jobs
            (title, salary, equity, company_handle)
            VALUES ($1, $2, $3, $4)
            RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
            [
                data.title,
                data.salary, 
                data.equity, 
                data.companyHandle
            ])

        const job = result.rows[0]
        return job
    }

    static async findAll({title, minSalary, hasEquity} = {}){
        let whereClauses = []
        let queryValues = []

        let query = `SELECT j.id,
                        j.title,
                        j.salary,
                        j.equity,
                        j.company_handle AS "companyHandle",
                        c.name AS "companyName"
                    FROM jobs j 
                    LEFT JOIN companies AS c ON c.handle = j.company_handle`

        if(title !== undefined){
            queryValues.push(`%${title.toLowerCase()}%`)
            whereClauses.push(`LOWER(title) LIKE $${queryValues.length}`)
        }
        if(minSalary !== undefined){
            queryValues.push(minSalary)
            whereClauses.push(`salary >= $${queryValues.length}`)
        }
        if(hasEquity === true){
            whereClauses.push(`equity IS NOT NULL AND equity > 0`)
        }
        if(whereClauses.length > 0){
            query += ` WHERE ` + whereClauses.join(` AND `)
        }

        query += ` ORDER BY title `
        const jobs = await db.query(query, queryValues)
        return jobs.rows
    }

    /** Given a job id, return data about job.
   *
   * Returns { id, title, salary, equity, company_handle }
   *
   * Throws NotFoundError if not found.
   **/

    static async get(id){
        const jobResult = await db.query(
            `SELECT id, title, salary, equity, company_handle AS "companyHandle"
            FROM jobs
            WHERE id = $1`,
            [id])

        const job = jobResult.rows[0]
        if (!job) throw new NotFoundError(`No job with id: ${id}`)

        const companyRes = await db.query(
            `SELECT handle,
                    name,
                    description,
                    num_employees AS "numEmployees",
                    logo_url AS "logoUrl"
            FROM companies
            WHERE handle = $1`, [job.companyHandle])
        
        delete job.companyHandle
        job.company = companyRes.rows[0]

        return job
    }

    static async update(id, data){
        const {setCols, values} = sqlForPartialUpdate(
            data,
            {})
        const idVarIdx = "$" + (values.length +1)

        const query = `UPDATE jobs
                        SET ${setCols}
                        WHERE id = ${idVarIdx}
                        RETURNING   id,
                                    title,
                                    salary,
                                    equity,
                                    company_handle AS "companyHandle"`

        const result = await db.query(query,[...values, id])
        const job = result.rows[0]

        if(!job) throw new NotFoundError(`No job with id: ${id}`)
        return job
    }
    
    static async remove(id){
        const result = await db.query(
            `DELETE
            FROM jobs
            WHERE id = $1
            RETURNING id`, [id])

        const job = result.rows[0]

        if(!job) throw new NotFoundError(`No job with id: ${id}`)
        
    }
}

module.exports = Job