const express = require('express')
const db = require('../db')
const router = new express.Router()
const ExpressError = require('../expressError')
// GET /companies
// Returns list of companies, like {companies: [{code, name}, ...]}

router.get('/', async (req, res, next) => {
    try{
        const result = await db.query(`SELECT * FROM companies`)
        if (result.rows.length === 0 ){
            throw new ExpressError(`Can't get any companies`, 404)
        }
        return res.status(200).json({companies: result.rows})
    }
    catch(err){
        return next(err)
    }
})

// GET /companies/[code]
// Return obj of company: {company: {code, name, description}}

// If the company given cannot be found, this should return a 404 status response.

router.get('/:code', async (req, res, next) => {
    try{
        const { code } = req.params
        const result = await db.query(`SELECT code, name, description FROM companies WHERE code = $1`, [code])
        if (result.rows.length === 0 ){
            throw new ExpressError(`Can't get a company with ${code}`, 404)
        }
        return res.status(200).json({company: result.rows})
    }
    catch(err){
        return next(err)
    }
})

// POST /companies
// Adds a company.

// Needs to be given JSON like: {code, name, description}

// Returns obj of new company: {company: {code, name, description}}

router.post('/', async (req, res, next) => {
    try{
        const {code, name, description} = req.body

        const result = await db.query(
            `INSERT INTO companies (code, name, description)
                VALUES ($1, $2, $3)
                RETURNING *`, [code, name, description]
        )
        return res.status(201).json({company: result.rows})
    }
    catch(err){
        return next(err)
    }
})

// PUT /companies/[code]
// Edit existing company.

// Should return 404 if company cannot be found.

// Needs to be given JSON like: {name, description}

// Returns update company object: {company: {code, name, description}}

router.patch('/:code', async (req, res, next) => {
    try{
        const { code } = req.params
        const result = await db.query(`SELECT code, name, description FROM companies WHERE code = $1`, [code])
        if (result.rows.length === 0 ){
            throw new ExpressError(`Can't get a company with ${code}`, 404)
        }

        const {name, description} = req.body
        const newResult = await db.query(
            `UPDATE companies set name = $1, description = $2
                WHERE code = $3
                RETURNING *`, [name, description, code]
        )
        return res.status(200).json({company: newResult.rows[0]})
    }
    catch(err){
        return next(err)
    }
})

// DELETE /companies/[code]
// Deletes company.

// Should return 404 if company cannot be found.

// Returns {status: "deleted"}

router.delete('/:code', async (req, res, next) => {
    try{
        const result = await db.query(
            "DELETE FROM companies WHERE code = $1",
            [req.params.code]
            )
        // if (result.rows.length === 0){
        //     throw new ExpressError(`Can't get a company with ${code}`, 404)
        // }

        return res.status(200).json({status: 'deleted'})
    }
    catch(err){
        return next(err)
    }
})


module.exports = router