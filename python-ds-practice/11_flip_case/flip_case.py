def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    lst = []

    for n in phrase:
        if n.lower() == to_swap.lower():
            lst.append(n.swapcase())
        else: lst.append(n)

    return ''.join(lst)


print(flip_case('Aaaahhh', 'a'))
print(flip_case('AaAahhh', 'A'))
print(flip_case('Aaaahhh', 'h'))
