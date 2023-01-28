def single_letter_count(word, letter):
    """How many times does letter appear in word (case-insensitively)?
    
        >>> single_letter_count('Hello World', 'h')
        1
        
        >>> single_letter_count('Hello World', 'z')
        0
        
        >>> single_letter_count("Hello World", 'l')
        3
    """
    return word.lower().count(letter)

print(single_letter_count('Hello World', 'h'))
print(single_letter_count('Hello World', 'z'))
print(single_letter_count('Hello World', 'l'))
print(single_letter_count('Hello WORLD', 'o'))