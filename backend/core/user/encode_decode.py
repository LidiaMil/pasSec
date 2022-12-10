from string import printable

HASH_CONSTANT = 'ipbrgn wrijvbhwei-q 290348239`4-n 34iptgregmda'


def add_str_encode(password: str):
    return HASH_CONSTANT + password + HASH_CONSTANT


def add_str_decode(password: str):
    return password.replace(HASH_CONSTANT, '')


def cesar_encode(password: str):
    result = ''
    for i in password:
        place = printable.find(i)
        new_place = place + 2
        if i in printable:
            result += printable[new_place]  # Задаем значения в итог
        else:
            result += i
    return result


def cesar_decode(password: str):
    result = ''
    for i in password:
        place = printable.find(i)
        new_place = place - 2  # Меняем знак + на знак -
        if i in printable:
            result += printable[new_place]
        else:
            result += i


def vernam_encode_decode(password: str):
    new_password = ""
    for letter in password:
        new_password += chr(ord(letter) ^ 3)
    return new_password


ENCODING_METHODS = {
    'add_str': add_str_encode,
    'cesar': cesar_encode,
    'vernam': vernam_encode_decode
}

DECODING_METHODS = {
    'add_str': add_str_decode,
    'cesar': cesar_decode,
    'vernam': vernam_encode_decode
}
