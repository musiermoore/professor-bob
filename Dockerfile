FROM node:16.18.0-alpine

WORKDIR /var/www/html
CMD ["npm", "i"]
CMD ["node", "main.js"]
