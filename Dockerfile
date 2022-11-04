FROM node:16.18.0-alpine

WORKDIR /var/www/www
CMD ["npm", "i"]
CMD ["node", "main.js"]
