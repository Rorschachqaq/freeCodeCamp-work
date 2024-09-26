# NumberGuessingGame



```bash
psql --username=freecodecamp --dbname=postgres

```





## sql

```sql
CREATE DATABASE number_guess;

\c number_guess;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(22) UNIQUE NOT NULL,
  games_played INT DEFAULT 0,
  best_game INT
);

CREATE TABLE games (
  game_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id),
  guesses INT,
  secret_number INT
);

```



## bash

```bash
mkdir number_guessing_game
cd number_guessing_game

git init
git checkout -b main

touch number_guess.sh
chmod +x number_guess.sh

git add number_guess.sh
git commit -m "Initial commit"

git add .
git commit -m "feat: add shebang"

git add .
git commit -m "feat: add PSQL" 

git add .
git commit -m "feat: add func get username"

git add .
git commit -m "feat: add start games"

git add .
git commit -m "feat: add update database"
```



```bash
#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

echo "Enter your username:"
read USERNAME

USER_RESULT=$($PSQL "SELECT user_id, games_played, best_game FROM users WHERE username='$USERNAME'")

if [[ -z $USER_RESULT ]]
then
  echo "Welcome, $USERNAME! It looks like this is your first time here."
  INSERT_USER_RESULT=$($PSQL "INSERT INTO users(username) VALUES('$USERNAME')")
else
  echo "$USER_RESULT" | while IFS="|" read USER_ID GAMES_PLAYED BEST_GAME
  do
    echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
  done
fi

SECRET_NUMBER=$(( RANDOM % 1000 + 1 ))
echo "Guess the secret number between 1 and 1000:"

NUMBER_OF_GUESSES=0
while [[ $GUESS != $SECRET_NUMBER ]]
do
  read GUESS
  if [[ ! $GUESS =~ ^[0-9]+$ ]]
  then
    echo "That is not an integer, guess again:"
  else
    ((NUMBER_OF_GUESSES++))
    if [[ $GUESS -lt $SECRET_NUMBER ]]
    then
      echo "It's higher than that, guess again:"
    elif [[ $GUESS -gt $SECRET_NUMBER ]]
    then
      echo "It's lower than that, guess again:"
    fi
  fi
done

echo "You guessed it in $NUMBER_OF_GUESSES tries. The secret number was $SECRET_NUMBER. Nice job!"

USER_ID=$($PSQL "SELECT user_id FROM users WHERE username='$USERNAME'")

# 更新游戏记录
UPDATE_USER_RESULT=$($PSQL "UPDATE users SET games_played = games_played + 1 WHERE user_id = $USER_ID")

# 如果是用户的最佳游戏，更新最佳游戏记录
BEST_GAME=$($PSQL "SELECT best_game FROM users WHERE user_id = $USER_ID")
if [[ -z $BEST_GAME || $NUMBER_OF_GUESSES -lt $BEST_GAME ]]
then
  UPDATE_BEST_GAME=$($PSQL "UPDATE users SET best_game = $NUMBER_OF_GUESSES WHERE user_id = $USER_ID")
fi

# 插入新的游戏记录
INSERT_GAME_RESULT=$($PSQL "INSERT INTO games(user_id, guesses, secret_number) VALUES($USER_ID, $NUMBER_OF_GUESSES, $SECRET_NUMBER)")

```

