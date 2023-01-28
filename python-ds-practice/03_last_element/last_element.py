def last_element(lst):
    """Return last item in list (None if list is empty.
    
        >>> last_element([1, 2, 3])
        3
        
        >>> last_element([]) is None
        True
    """
    print(lst)
    return lst[-1] if len(lst) > 0 else 'None'

print(last_element([1,2,3,4,5,6,7,89]))
print(last_element([]))