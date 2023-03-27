const ExpressError = require("./expressError")

function numsExtract(nums, operation){
    try{
        if(Object.keys(nums).length === 0 || nums.nums === '') {
            throw new ExpressError ('nums are required', 400)
        }
    }
    catch(err){
        return err   
    }

    let lst = nums.nums.split(',')
    let numlst = []
    
    try{
        lst.forEach (e => {
            if (isNaN(e)){
                throw new ExpressError('Invalid number input!', 400)
            }
        })
    }
    catch (err){
        return err
    }
    
    lst.forEach (e => numlst.push(parseInt(e)))
    
    if (operation === 'mean'){
        let mean = numlst.reduce((a,b) => a+b, 0)/ numlst.length
        let resp = {
            operation: 'Mean',
            value: mean
            }
        return resp
    }

    else if( operation === 'median'){
        let lstSort = numlst.sort(function(a, b){return a-b})
        if (lstSort.length % 2 === 1){
            let median = lstSort[(lstSort.length + 1)/2 - 1]
            let resp = {
                operation: 'Mean',
                value: median
                }
            return resp
        }
        else{
            let median = ((lstSort[lstSort.length / 2 - 1] + lstSort[lstSort.length/2])/2)
            let resp = {
                operation: 'Mean',
                value: median
                }
            return resp
        }
    }

    else if (operation === 'mode'){
        const obj = {}

        numlst.forEach( number => {
            if( !obj[number]){
                obj[number] = 1
            }
            else obj[number] += 1
        })

        let highVal = 0
        let highValKey = -Infinity

        for (let key in obj){
            const value = obj[key]
            if(value > highVal) {
                highVal = value
                highValKey = key
            }
        }
        
        if (highVal === 1) {
            let resp = {
                operation: 'Mean',
                value: numlst
                }
            return resp             //if no mode found returns original list
        }
        else {
            let resp = {
                operation: 'Mean',
                value: Number(highValKey)
                }
            return resp
        }
    }

    else return Error(`Operator not found`, 418)
}

module.exports = {numsExtract}