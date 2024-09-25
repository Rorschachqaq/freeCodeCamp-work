# SalonAppointmentScheduler



## sql

```bash
psql --username=freecodecamp --dbname=postgres

```



```sql
CREATE DATABASE salon;
\c salon

-- 创建 customers 表
CREATE TABLE customers(
  customer_id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  phone VARCHAR(20) UNIQUE
);

-- 创建 services 表
CREATE TABLE services(
  service_id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

-- 创建 appointments 表
CREATE TABLE appointments(
  appointment_id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(customer_id),
  service_id INT REFERENCES services(service_id),
  time VARCHAR(20)
);

INSERT INTO services (name) VALUES ('cut'), ('color'), ('perm'), ('style'), ('trim');

```



## salon.sh

```bash
#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=salon -t --no-align -c"

# 显示服务列表函数
display_services() {
  echo -e "\n~~ Welcome to My Salon, how can I help you? ~~\n"
  SERVICES=$($PSQL "SELECT service_id, name FROM services ORDER BY service_id")
  echo "$SERVICES" | while IFS="|" read SERVICE_ID SERVICE_NAME; do
    echo "$SERVICE_ID) $SERVICE_NAME"
  done
}

# 获取客户信息函数
get_customer_info() {
  echo -e "\nWhat's your phone number?"
  read CUSTOMER_PHONE

  CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE'")

  # 如果客户不存在，则插入新客户
  if [[ -z $CUSTOMER_NAME ]]; then
    echo -e "\nI don't have a record for that phone number, what's your name?"
    read CUSTOMER_NAME
    INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers (name, phone) VALUES ('$CUSTOMER_NAME', '$CUSTOMER_PHONE')")
  fi
}

# 预约处理函数
book_appointment() {
  # 获取服务时间
  echo -e "\nWhat time would you like your $SERVICE_NAME, $CUSTOMER_NAME?"
  read SERVICE_TIME

  # 获取客户 ID
  CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE'")

  # 插入预约信息
  INSERT_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments (customer_id, service_id, time) VALUES ($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")

  # 输出预约确认信息
  echo -e "\nI have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."
}

# 主流程函数
main() {
  # 显示服务列表
  display_services

  # 获取用户选择的服务 ID
  read SERVICE_ID_SELECTED

  # 检查服务是否有效
  SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id = $SERVICE_ID_SELECTED")
  if [[ -z $SERVICE_NAME ]]; then
    echo -e "\nI could not find that service. What would you like today?"
    main # 如果服务 ID 无效，重新运行主流程
  else
    # 获取客户信息
    get_customer_info

    # 处理预约
    book_appointment
  fi
}

# 调用主流程函数
main

```



