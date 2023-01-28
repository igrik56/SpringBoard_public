def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    count = 0
    num = nums[0]

    for n in nums:
        freq = nums.count(n)
        if freq > count:
            count = freq
            num = n
    
    return num

print(mode([1, 2, 1]))
print(mode([2, 2, 3, 3,4,4,5,2,4,234,23,54,67,6,2,34,34,4,4,4, 2]))

