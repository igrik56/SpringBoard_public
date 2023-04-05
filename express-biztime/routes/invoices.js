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
            throw new ExpressError(`Can't get any invoices`, 404)
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
        const invoicesResult = await db.query(`SELECT id, amt, paid, add_date, paid_date, comp_code FROM invoices WHERE id = $1` , [id])

        if (invoicesResult.rows.length === 0 ){
            throw new ExpressError(`Can't get invoice with ${id}`, 404)
        }

        const companyResult = await db.query(`SELECT * FROM companies WHERE code = $1`, [invoicesResult.rows[0].comp_code])

        delete invoicesResult.rows[0].comp_code
        const invoice = invoicesResult.rows[0]
        invoice.company = companyResult.rows[0]

        return res.status(200).json({invoice: invoice})
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
        let {amt, paid} = req.body;
        let id = req.params.id;
        let paidDate = null;

        const currResult = await db.query(
            `SELECT paid
                FROM invoices
                WHERE id = $1`,
            [id]);

        if (currResult.rows.length === 0) {
        throw new ExpressError(`No such invoice: ${id}`, 404);
        }

        const currPaidDate = currResult.rows[0].paid_date;

        if (!currPaidDate && paid) {
        paidDate = new Date();
        }
        else if (!paid) {
        paidDate = null
        } 
        else {
        paidDate = currPaidDate;
        }

        const result = await db.query(
            `UPDATE invoices
                SET amt=$1, paid=$2, paid_date=$3
                WHERE id=$4
                RETURNING id, comp_code, amt, paid, add_date, paid_date`,
            [amt, paid, paidDate, id]);

        return res.json({"invoice": result.rows[0]});
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
        const companyResult = await db.query(
            `SELECT *
                FROM companies
                WHERE code = $1`, [req.params.code]
        )
        if (companyResult.rows.length === 0 ){
            throw new ExpressError(`Can't get a company with ${req.params.code}`, 404)
        }

        const invoicesResult = await db.query(`SELECT * FROM invoices WHERE comp_code = $1`, [companyResult.rows[0].code])

        const output = companyResult.rows[0]
        output.invoice = invoicesResult.rows

        return res.status(200).json({company: output})
    }
    catch(err){
        return next(err)
    }
})

module.exports = router
