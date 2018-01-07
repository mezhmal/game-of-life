from random import random

cols = 10
rows = 10


def make_new_field():
    # return [[0] * cols] * rows  <--  incorrect because using references
    return [[0] * cols for i in range(rows)]


def set_random_values(field, closeness=0.5):
    return [[0 if random() > closeness else 1 for cell in row] for row in field]


def count_neighbours(field, i, j):
    result = -1 * field[i][j]
    neighbour_indexes = [-1, 0, 1]
    for n_i in neighbour_indexes:
        for n_j in neighbour_indexes:
            if (i + n_i) < 0:
                continue
            if (j + n_j) < 0:
                continue
            try:
                result += field[i+n_i][j+n_j]
            except IndexError:
                pass
    return result


def mutate(field):
    new_field = make_new_field()
    for i in range(rows):
        for j in range(cols):
            neighbours = count_neighbours(field, i, j)
            if field[i][j]:
                new_field[i][j] = 1 if neighbours == 2 or neighbours == 3 else 0
            else:
                new_field[i][j] = 1 if neighbours == 3 else 0
    return new_field


if __name__ == '__main__':
    epochs = list()
    epochs.append(set_random_values(make_new_field(), 0.3))

    while True:
        epochs.append(mutate(epochs[-1]))
        # TODO: stop if all cells died
        # TODO: stop if epoch repeats any other
        # TODO: stop if epoch repeats previous
        break

    for field in epochs:
        for row in field:
            print(row)
        print()

