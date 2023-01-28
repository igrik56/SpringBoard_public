# import numpy as np
def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

>>> m1 = [
...     [1,   2],
...     [30, 40],
... ]
        >>> sum_up_diagonals(m1)
        73

>>> m2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        >>> sum_up_diagonals(m2)
        30
    """
    # matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
    to_sum =[]                             # an empty list for collection values
    for i in range(len(matrix)):           # diagonal coordinats [0][0], [1][1], [2][2].... [n][n]
        to_sum.append(matrix[i][i])        # append value of diagonal
        rev = matrix[i][::-1]              # for anti-diagonal reverse list
        to_sum.append(rev[i])              # append value of anti-diagonal
                                           # to_sum list [1, 4, 6, 7, 11, 10, 16, 13]
    return sum(to_sum)                     # return sum of all values in 

m1 = [[1,   2], [30, 40]]
m2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9],]
m3 = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]

print(sum_up_diagonals(m1))
print(sum_up_diagonals(m2))
print(sum_up_diagonals(m3))
