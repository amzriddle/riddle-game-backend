nest new riddle-game

## criar user
nest g resource user

## add banco de dados
npm install prisma --save-dev

npx prisma init
npx prisma generate

nest g module prisma
nest g service prisma

## add auth
nest g resource auth

npm i class-validator

npm install --save @nestjs/passport @nestjs/jwt passport passport-jwt
npm install --save-dev @types/passport-jwt

