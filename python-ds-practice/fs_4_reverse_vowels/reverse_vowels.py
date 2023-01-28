def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """

    check = 'aeiouAEIOU'


    lst = list(s)
    lst_v = [x for x in lst if x in check]
    # lst_v[::-1]

    x=0
    while x < len(lst):
        if lst[x] in check:
            if len(lst_v) != 0:
                lst[x] = lst_v.pop()
            else: return ''.join(lst)
        x+=1
    return ''.join(lst)

print(reverse_vowels("Hello!"))
print(reverse_vowels("Tomatoes!"))
print(reverse_vowels("Reverse Vowels In A String!"))
print(reverse_vowels("why try, shy fly?"))