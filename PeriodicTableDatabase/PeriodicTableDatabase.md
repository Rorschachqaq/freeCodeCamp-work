# PeriodicTableDatabase



```bash
psql --username=freecodecamp --dbname=postgres
```



## sql

```sql
DELETE FROM properties WHERE atomic_number = 1000;
DELETE FROM elements WHERE atomic_number = 1000;

ALTER TABLE properties RENAME COLUMN weight TO atomic_mass;
ALTER TABLE properties RENAME COLUMN melting_point TO melting_point_celsius;
ALTER TABLE properties RENAME COLUMN boiling_point TO boiling_point_celsius;

ALTER TABLE elements ALTER COLUMN symbol SET NOT NULL;
ALTER TABLE elements ADD UNIQUE (symbol);
ALTER TABLE elements ALTER COLUMN name SET NOT NULL;
ALTER TABLE elements ADD UNIQUE (name);
ALTER TABLE properties ALTER COLUMN melting_point_celsius SET NOT NULL;
ALTER TABLE properties ALTER COLUMN boiling_point_celsius SET NOT NULL;

ALTER TABLE properties ADD FOREIGN KEY (atomic_number) REFERENCES elements(atomic_number);

CREATE TABLE types (
  type_id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL
);

-- 插入三种元素类型
INSERT INTO types (type) VALUES ('metal'), ('nonmetal'), ('metalloid');

-- 添加 type_id 列并建立外键约束
ALTER TABLE properties ADD COLUMN type_id INT;
ALTER TABLE properties ADD FOREIGN KEY (type_id) REFERENCES types(type_id);

-- 更新 properties 表中的 type_id 值
UPDATE properties SET type_id = (SELECT type_id FROM types WHERE type = properties.type);

ALTER TABLE properties ALTER COLUMN type_id SET NOT NULL;

-- 删除旧的 type 列
ALTER TABLE properties DROP COLUMN type;

UPDATE elements SET symbol = INITCAP(symbol);


ALTER TABLE properties ALTER COLUMN atomic_mass TYPE DECIMAL;
UPDATE properties SET atomic_mass = TRIM(TRAILING '0' FROM atomic_mass::TEXT)::DECIMAL;

INSERT INTO elements (atomic_number, name, symbol) VALUES (9, 'Fluorine', 'F'), (10, 'Neon', 'Ne');

INSERT INTO properties (atomic_number, atomic_mass, melting_point_celsius, boiling_point_celsius, type_id)
VALUES (9, 18.998, -220, -188.1, (SELECT type_id FROM types WHERE type = 'nonmetal')),
       (10, 20.18, -248.6, -246.1, (SELECT type_id FROM types WHERE type = 'nonmetal'));


```



## bash

```bash
mkdir periodic_table
cd periodic_table
git init

git checkout -b main
echo "periodic_table.sql" > .gitignore
git add .
git commit -m "Initial commit"

touch element.sh
chmod +x element.sh
git add element.sh
git commit -m "feat: add element query script"

git add .
git commit -m "feat: add shebang"

git add .
git commit -m "feat: add PSQL"

git add .
git commit -m "feat: add func1"

git add .
git commit -m "feat: add func"
```





### element.sh

```bash
#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

# 检查是否提供参数
if [[ -z $1 ]]
then
  echo "Please provide an element as an argument."
  exit
fi

# 根据参数查询元素信息
if [[ $1 =~ ^[0-9]+$ ]]
then
  ELEMENT=$($PSQL "SELECT atomic_number, name, symbol, type, atomic_mass, melting_point_celsius, boiling_point_celsius FROM elements INNER JOIN properties USING(atomic_number) INNER JOIN types USING(type_id) WHERE atomic_number=$1")
else
  ELEMENT=$($PSQL "SELECT atomic_number, name, symbol, type, atomic_mass, melting_point_celsius, boiling_point_celsius FROM elements INNER JOIN properties USING(atomic_number) INNER JOIN types USING(type_id) WHERE symbol='$1' OR name='$1'")
fi

# 检查是否找到元素
if [[ -z $ELEMENT ]]
then
  echo "I could not find that element in the database."
else
  # 提取数据并格式化输出
  echo "$ELEMENT" | while IFS="|" read ATOMIC_NUMBER NAME SYMBOL TYPE MASS MELTING BOILING
  do
    echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MELTING celsius and a boiling point of $BOILING celsius."
  done
fi

```

