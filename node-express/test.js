const {numsExtract} = require('./numsOperations.js')

describe('mean', () =>{
    test("finds the mean of '1,3,5,7' expect it to equal 4", () =>{
        let nums = {nums: '1,3,5,7'}
        let n = numsExtract(nums, 'mean')
        expect(n.value).toEqual(4)
    })
})

describe('median', () =>{
    test("finds the median of '1,3,5,7,8' expect it to equal 5", () =>{
        let nums = {nums: '1,3,5,7,8'}
        let n = numsExtract(nums, 'median')
        expect(n.value).toEqual(5)
    })
    test("finds the median of '1,3,5,7' expect it to equal 4", () =>{
        let nums = {nums: '1,3,5,7'}
        let n = numsExtract(nums, 'median')
        expect(n.value).toEqual(4)
    })
})

describe('mode', () =>{
    test("finds the mode of '1,3,5,7' expect it to equal [1,3,5,7]", () =>{
        let nums = {nums: '1,3,5,7'}
        let n = numsExtract(nums, 'mode')
        expect(n.value).toEqual([1,3,5,7])
    })
    test("finds the mode of '1,3,5,7,5,5' expect it to equal 5", () =>{
        let nums = {nums: '1,3,5,7,5,5'}
        let n = numsExtract(nums, 'mode')
        expect(n.value).toEqual(5)
    })
})