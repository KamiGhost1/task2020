# Перед использованием 

Установите:
MySQL:
```
sudo apt install mysql-server
```
NodeJS:
```sh
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```
PM2:
```
sudo npm i pm2
```
# Установка
установите необходимые пакеты для ноды:
   ```
   npm i
   ```
создайте базу
   ```
   mysql> create database task;
   ```
импортируйте образ базы 
   ```
   mysql -u root -p task < task.sql
   ```
создайте пользователя
   ```
   mysql> create user "server"@"localhost" identified by "server";
   mysql> GRANT ALL PRIVILEGES ON task . * TO 'server'@'localhost';
   ```
# тестирование
   ```
   npm test
   ```
# запуск
   ```
   pm2 start index.js
   ```

# остановка
```
pm2 stop all
pm2 delete all
```
