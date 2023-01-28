from wordfinder import WordFinder

class SpecialWordFinder(WordFinder):
    
    def __init__(self, name):
        super().__init__(name)
        self.garbage_val = {'', '#', '//', '##', '/'}

    def special(self):
        word = super().get_word()
        if word in self.garbage_val:
            return self.special()
        else: return word
    


sw = SpecialWordFinder('python-oo-practice/withGarbage.txt')
print(sw.special())
