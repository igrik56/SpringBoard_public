def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """
    return all([True if type(l) == list else False for l in lst])

print(list_check([[1], [2, 3]]))
print(list_check([[1], "nope"]))