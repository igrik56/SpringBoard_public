def print_upper_words(words, must_start_with):
    '''Will take a list of words and print them one by one in uppercase
    For Example:
    # this should print "HELLO", "HEY", "YO", and "YES"

    print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
                   must_start_with={"h", "y"})
    
    '''
    
    for word in words:
         print(word.upper())

    for word in words:
        if word[0] == 'e' or word[0] == 'E':
            print(word.upper())

    for word in words:
        for char in must_start_with:
            if word[0]==char:
                print(word.upper())
        


print_upper_words(["hello", "hey", 'eggs','Earth', "goodbye", "yo", "yes"],
                   must_start_with={"h", "y"})
