def sum_floats(nums):
    """Return sum of floating point numbers in nums.
    
        >>> sum_floats([1.5, 2.4, 'awesome', [], 1])
        3.9
        
        >>> sum_floats([1, 2, 3])
        0
    """
    # count =0
    # for n in nums:
    #     if type(n) == float:
    #         count+=n
    # return count

    return sum([n for n in nums if type(n)==float])

    # hint: to find out if something is a float, you should use the
    # "isinstance" function --- research how to use this to find out
    # if something is a float!

print(sum_floats([1.5, 2.4, 'awesome', [], 1]))
print(sum_floats([1, 2, 3]))
print(sum_floats([1, 2, 3, 7.4, (), '74.3', 4.1]))