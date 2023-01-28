"""Word Finder: finds random words from a dictionary."""

from random import randint

class WordFinder:

    def __init__(self, name):
        self.name = name

    def get_word(self):
        f = open(f'{self.name}', 'r')
        lst = []

        for x in f:
            lst.append(x.strip())

        word = lst[randint(0, len(lst)-1)]
        f.close()
        return word

    
# w = WordFinder('python-oo-practice/words.txt')
# print(w.get_word())
