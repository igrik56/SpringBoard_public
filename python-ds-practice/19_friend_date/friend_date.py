def friend_date(a, b):
    """Given two friends, do they have any hobbies in common?

    - a: friend #1, a tuple of (name, age, list-of-hobbies)
    - b: same, for friend #2

    Returns True if they have any hobbies in common, False is not.

        >>> elmo = ('Elmo', 5, ['hugging', 'being nice'])
        >>> sauron = ('Sauron', 5000, ['killing hobbits', 'chess'])
        >>> gandalf = ('Gandalf', 10000, ['waving wands', 'chess'])

        >>> friend_date(elmo, sauron)
        False

        >>> friend_date(sauron, gandalf)
        True
    """
    a_hob =a[2]
    b_hob = b[2]
    for hob1 in a_hob:
        # if type(lst1) == list:
            for hob2 in b_hob:
                # if type(lst2) == list:        
                    # return bool(set(lst1).intersection(set(lst2)))    
                if hob2 == hob1:
                     return True
                    # for i in lst1:
                    #     for j in lst2:
                    #         if i == j:
                    #             return(True)
    return False
                
    # for name, age, hobbies in a:
# 





elmo = ('Elmo', 5, ['hugging', 'being nice'])
sauron = ('Sauron', 5000, ['killing hobbits', 'chess'])
gandalf = ('Gandalf', 10000, ['waving wands', 'chess'])

print(friend_date(elmo, sauron))
print(friend_date(sauron, gandalf))