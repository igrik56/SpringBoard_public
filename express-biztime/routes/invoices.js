const express = require('express')
const db = require('../db')
const router = new express.Router()
const ExpressError = require('../expressError')

// GET /invoices
// Return info on invoices: like {invoices: [{id, comp_code}, ...]}

router.get('/', async (req, res, next) => {
    try{
        const result = await db.query(`SELECT id, comp_code FROM invoices`)
        if (result.rows.length === 0 ){
            throw new ExpressError(`Can't get any invoices`)
        }
        return res.status(200).json({invoices: result.rows})
    }
    catch(err){
        return next(err)
    }
})

// GET /invoices/[id]
// Returns obj on given invoice.

// If invoice cannot be found, returns 404.

// Returns {invoice: {id, amt, paid, add_date, paid_date, company: {code, name, description}}}

router.get('/:id', async (req, res, next) => {
    try{
        const { id } = req.params
        const result = await db.query(`SELECT id, amt, paid, add_date, paid_date, code, name, description
                                        FROM invoices  
                                        JOIN companies 
                                        ON companies.code = invoices.comp_code
                                        WHERE id = $1` , [id])
        if (result.rows.length === 0 ){
            throw new ExpressError(`Can't get invoice with ${id}`)
        }
        return res.status(200).json({invoice: result.rows})
    }
    catch(err){
        return next(err)
    }
})

// POST /invoices
// Adds an invoice.

// Needs to be passed in JSON body of: {comp_code, amt}

// Returns: {invoice: {id, comp_code, amt, paid, add_date, paid_date}}

router.post('/', async (req, res, next) => {
    try{
        const {comp_code, amt} = req.body

        const result = await db.query(
            `INSERT INTO invoices (comp_code, amt)
                VALUES ($1, $2)
                RETURNING *`, [comp_code, amt]
        )
        return res.status(201).json(result.rows[0])
    }
    catch(err){
        return next(err)
    }
})

// PUT /invoices/[id]
// Updates an invoice.

// If invoice cannot be found, returns a 404.

// Needs to be passed in a JSON body of {amt}

// Returns: {invoice: {id, comp_code, amt, paid, add_date, paid_date}}

router.patch('/:id', async (req, res, next) => {
    try{
        const { id } = req.params
        const result = await db.query(`SELECT * 
                                        FROM invoices 
                                        WHERE id = $1`, [id])
        if (result.rows.length === 0 ){
            throw new ExpressError(`Can't get an invoice with ${id}`)
        }

        const {amt} = req.body
        const newResult = await db.query(
            `UPDATE invoices 
                SET amt = $1
                WHERE id = $2
                RETURNING *`, [amt, id]
        )
        return res.status(200).json({invoice: newResult.rows[0]})
    }
    catch(err){
        return next(err)
    }
})

// DELETE /invoices/[id]
// Deletes an invoice.

// If invoice cannot be found, returns a 404.

// Returns: {status: "deleted"}

// Also, one route from the previous part should be updated:

router.delete('/:id', async (req, res, next) => {
    try{
        const result = await db.query(
            "DELETE FROM invoices WHERE id = $1",
            [req.params.id]
            )

        if (result.rows.length === 0 ){
            throw new ExpressError(`Can't get a company with ${req.params.id}`)
        }
        return res.status(200).json({status: 'deleted'})
    }
    catch(err){
        return next(err)
    }
})

// GET /companies/[code]
// Return obj of company: {company: {code, name, description, invoices: [id, ...]}}

// If the company given cannot be found, this should return a 404 status response.

router.get('/companies/:code', async (req, res, next) => {
    try{
        const result = await db.query(
            `SELECT *
                FROM companies  
                RIGHT JOIN invoices 
                ON companies.code = invoices.comp_code
                WHERE code = $1`, [req.params.code]
        )
        if (result.rows.length === 0 ){
            throw new ExpressError(`Can't get a company with ${req.params.code}`)
        }

        return res.status(200).json({company: result.rows})
    }
    catch(err){
        return next(err)
    }
})

module.exports = router
