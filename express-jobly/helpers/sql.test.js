const {sqlForPartialUpdate} = require ('./sql')

describe('json to sql conversion', function (){
    test('convert json object to sql query input', function (){

        const jsonObj = {
            firstName: "Anna",
            age: 36
        }
        const jsToSql = {
            firstName: 'firstName'
        }

        const result = sqlForPartialUpdate(jsonObj, jsToSql)
        expect(result.setCols).toEqual('"firstName"=$1, "age"=$2')
        expect(result.values).toEqual(['Anna', 36])
    })
})