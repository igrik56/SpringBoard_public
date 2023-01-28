def remove_every_other(lst):
    """Return a new list of other item.

        >>> lst = [1, 2, 3, 4, 5]

        >>> remove_every_other(lst)
        [1, 3, 5]

    This should return a list, not mutate the original:

        >>> lst
        [1, 2, 3, 4, 5]
    """
    return [n for n in lst[::2]]


lst = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

print(remove_every_other(lst))
print(lst)