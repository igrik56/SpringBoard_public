def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    # list(num1).sorted()
    # list(num2).sorted()
    lst1 = [n for n in str(num1)]
    lst2 = [n for n in str(num2)]
    lst2.sort()
    lst1.sort()

    return lst1 == lst2

print(same_frequency(551122, 221515))
print(same_frequency(321142, 3212215))
print(same_frequency(1212, 2211))