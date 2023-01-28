def three_odd_numbers(nums):
    """Is the sum of any 3 sequential numbers odd?"

        >>> three_odd_numbers([1, 2, 3, 4, 5])
        True

        >>> three_odd_numbers([0, -2, 4, 1, 9, 12, 4, 1, 0])
        True

        >>> three_odd_numbers([5, 2, 1])
        False

        >>> three_odd_numbers([1, 2, 3, 3, 2])
        False
    """
    lst = []
    if len(nums[-3::-1]) >= 3:

        for n in range(len(nums)):
            if n+2 < len(nums) and (nums[n]+nums[n+1]+nums[n+2])%2==1:
                return True
    
    return False

print(three_odd_numbers([1, 2, 3, 4, 5]))
print(three_odd_numbers([0, -2, 4, 1, 9, 12, 4, 1, 0]))
print(three_odd_numbers([5, 2, 1]))
print(three_odd_numbers([1, 2, 3, 3, 2]))      
        
