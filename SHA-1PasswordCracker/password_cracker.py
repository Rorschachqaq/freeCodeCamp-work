import hashlib

def crack_sha1_hash(hash, use_salts=False):
    # 读取密码列表
    with open('top-10000-passwords.txt', 'r') as file:
        passwords = file.read().splitlines()

    # 如果使用盐值，读取盐值列表
    salts = []
    if use_salts:
        with open('known-salts.txt', 'r') as file:
            salts = file.read().splitlines()

    # 对每个密码进行哈希比较
    for password in passwords:
        # 将密码进行 SHA-1 哈希
        hashed_password = hashlib.sha1(password.encode()).hexdigest()
        # 如果哈希值与传入的哈希值匹配，返回密码
        if hashed_password == hash:
            return password

        # 如果使用盐值，进行带盐的哈希比较
        if use_salts:
            for salt in salts:
                # 将盐值分别加在密码前后
                salted_password1 = salt + password
                salted_password2 = password + salt

                # 对加盐的密码进行 SHA-1 哈希
                hashed_salted1 = hashlib.sha1(salted_password1.encode()).hexdigest()
                hashed_salted2 = hashlib.sha1(salted_password2.encode()).hexdigest()

                # 如果其中一个哈希匹配，返回密码
                if hashed_salted1 == hash or hashed_salted2 == hash:
                    return password

    # 如果密码不在数据库中，返回提示信息
    return "PASSWORD NOT IN DATABASE"



