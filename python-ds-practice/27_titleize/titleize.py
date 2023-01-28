def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    word = [w.capitalize() for w in (phrase.lower().split(' ', phrase.count(' ')))]

    result = ' '.join([str(' '.join([str(w) for w in word]))])
    return result

print(titleize('this is awesome'))
print(titleize('oNLy cAPITALIZe fIRSt'))
