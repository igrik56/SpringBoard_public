def two_list_dictionary(keys, values):
    """Given keys and values, make dictionary of those.
    
        >>> two_list_dictionary(['x', 'y', 'z'], [9, 8, 7])
        {'x': 9, 'y': 8, 'z': 7}
        
    If there are fewer values than keys, remaining keys should have value
    of None:
    
        >>> two_list_dictionary(['a', 'b', 'c', 'd'], [1, 2, 3])
        {'a': 1, 'b': 2, 'c': 3, 'd': None}
    
    If there are fewer keys, ignore remaining values:

        >>> two_list_dictionary(['a', 'b', 'c'], [1, 2, 3, 4])
        {'a': 1, 'b': 2, 'c': 3}
   """
    obj = {}
    new_val = values.copy()
    if len(keys) == len(values):
        obj = {keys[i]: values[i] for i in range(0,len(keys))}
        return obj
    elif len(keys) > len(values):
        while len(keys) != len(new_val):
                new_val.append(None)
        obj = {keys[i]: new_val[i] for i in range(0,len(keys))}
        return obj
    elif len(keys) < len(new_val):
        while len(keys) != len(new_val):
                new_val.pop()
        obj = {keys[i]: new_val[i] for i in range(0,len(keys))}
        return obj


print(two_list_dictionary(['x', 'y', 'z'], [9, 8, 7]))
print(two_list_dictionary(['a', 'b', 'c', 'd'], [1, 2, 3]))
print(two_list_dictionary(['a', 'b', 'c'], [1, 2, 3, 4]))