def partition(lst, fn):
    """Partition lst by predicate.
     
     - lst: list of items
     - fn: function that returns True or False
     
     Returns new list: [a, b], where `a` are items that passed fn test,
     and `b` are items that failed fn test.

        >>> def is_even(num):
        ...     return num % 2 == 0
        
        >>> def is_string(el):
        ...     return isinstance(el, str)
        
        >>> partition([1, 2, 3, 4], is_even)
        [[2, 4], [1, 3]]
        
        >>> partition(["hi", None, 6, "bye"], is_string)
        [['hi', 'bye'], [None, 6]]
    """
    # def is_even(num):
    #     return num % 2 == 0

    # def is_string(el):
    #     return isinstance(el, str)

    lst_true = []
    lst_false = []

    if fn == is_even:
        for n in lst:
            if is_even(n):
                lst_true.append(n)
            else: lst_false.append(n)
    
        return [lst_true, lst_false]

    elif fn == is_string:
        for n in lst:
            if is_string(n):
                lst_true.append(n)
            else: lst_false.append(n)
        
        return [lst_true, lst_false]

    else: return 'Invalid function name'

    
def is_even(num):
        return num % 2 == 0

def is_string(el):
        return isinstance(el, str)

print(partition([1, 2, 3, 4], is_even))
print(partition(["hi", None, 6, "bye"], is_string))