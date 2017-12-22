#!/usr/bin/env bash

#update and prepare dependencies 
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y curl

if [ -f /etc/is_vagrant_vm ] 
then
	app_home="/vagrant"
else
	is_prod=true
	app_home="/var/www/astro"
fi

# Install Node
if command -v node; then
	echo "Node is already installed"
else
	curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
	apt-get install -y nodejs
fi

if [ "$is_prod" = true ]; then
	echo "Running in Prod"
	sudo apt-get install awscli -y
	mkdir -p /var/www/astro/
	aws s3 --recursive cp s3://rising-stars-ctf-66b5d962324c65b/source/astro/ /var/www/astro/
fi

if ! [ -L $app_home/node_modules ]; then
	cd $app_home && npm install 
fi

# install MySQL 
# @TODO: remove password from command
if command -v mysql; then
	echo "mysql is already installed"
else
	debconf-set-selections <<< 'mysql-server mysql-server/root_password password MySuperPassword'
	debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password MySuperPassword'
	apt-get install -y mysql-server
fi

if mysql -u root -pMySuperPassword -e "USE astro"; then
	echo "db already created"
else
	mysql -u root -pMySuperPassword < $app_home/db_create.sql
fi

if [ "$is_prod" = true ]; then
	npm install -g pm2
	pm2 start $app_home/bin/www
	iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
	iptables -t nat -I OUTPUT -p tcp -o lo --dport 80 -j REDIRECT --to-ports 8080
fi
