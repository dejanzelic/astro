#/bin/bash
aws s3 --recursive cp ../ s3://rising-stars-ctf-66b5d962324c65b/source/astro --exclude "node_modules/*" --exclude "screenshots/*" --exclude ".git/*" --exclude ".vagrant/*"
