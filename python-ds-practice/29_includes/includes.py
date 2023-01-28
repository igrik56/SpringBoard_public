def includes(collection, sought, start=None):
    """Is sought in collection, starting at index start?

    Return True/False if sought is in the given collection:
    - lists/strings/sets/tuples: returns True/False if sought present
    - dictionaries: return True/False if *value* of sought in dictionary

    If string/list/tuple and `start` is provided, starts searching only at that
    index. This `start` is ignored for sets/dictionaries, since they aren't
    ordered.

        >>> includes([1, 2, 3], 1)
        True

        >>> includes([1, 2, 3], 1, 2)
        False

        >>> includes("hello", "o")
        True

        >>> includes(('Elmo', 5, 'red'), 'red', 1)
        True

        >>> includes({1, 2, 3}, 1)
        True

        >>> includes({1, 2, 3}, 1, 3)  # "start" ignored for sets!
        True

        >>> includes({"apple": "red", "berry": "blue"}, "blue")
        True
    """
    if type(collection) == list or type(collection) == tuple or type(collection) == set or type(collection) == str:
        if not start:
            for c in collection:
                if c == sought:
                    return True
            return False
        elif type(collection) == set and start:
            start = None
            for c in collection:
                if c == sought:
                    return True
            return False
        else: 
            for c in range (start, len(collection)):
                if collection[c] == sought:
                    return True
            return False
        
    if type(collection) == dict:
            for c in collection.values():
                if c == sought:
                    return True
            return False
                

print(includes([1, 2, 3], 1))
print(includes([1, 2, 3], 1, 2))
print(includes("hello", "o"))
print(includes(('Elmo', 5, 'red'), 'red', 1))
print(includes({1, 2, 3}, 1, 3))
print(includes({"apple": "red", "berry": "blue"}, "blue"))