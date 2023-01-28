def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    obj ={}
    vowels = ['a', 'e', 'i', 'u', 'o']

    for letter in phrase.lower():
        if letter in vowels:
            if letter in obj: obj[letter] += 1
            else: obj[letter] = 1
    
    return obj

print(vowel_count('rithm school'))
print(vowel_count('HOW ARE YOU? i am great!'))