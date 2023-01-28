"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start):
        self.start = start
        self.a = self.start - 1

    def generate(self):
        self.a += 1
        return self.a

    def reset(self):
        self.a = self.start - 1

serial = SerialGenerator(100)

print(f'{serial.start} this is start')
print(serial.generate())
print(serial.generate())
print(serial.generate())
print(serial.generate())
print(serial.reset())
print(serial.generate())