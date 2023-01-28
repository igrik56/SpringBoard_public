def compact(lst):
    """Return a copy of lst with non-true elements removed.

        >>> compact([0, 1, 2, '', [], False, (), None, 'All done'])
        [1, 2, 'All done']
    """
    # n=0                                #works. if item was poped reset n to 0 so it restart looping
    # while n < len(lst):
    #     if not bool(lst[n]):
    #         lst.pop(n)
    #     else: n+=1

    # return lst

    # for n in range(len(lst)-1):                  #index outside the range
    #     if not bool(lst[n]):
    #         lst.pop(n)
    # return lst

    return list(filter(bool, lst))      

    # lst_new = []                        #works
    # for n in lst:
    #     if bool(n):
    #         lst_new.append(n)

    # return lst_new


print(compact([0, 1, 2, '', [], False, (), None, 'All done']))
