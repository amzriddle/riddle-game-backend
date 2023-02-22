# Documentation: nest

## instalar CLI do nestjs
npm install -g @nestjs/cli

caso nao possa instalar o CLI, usar o `npx` antes do comando

## criar novo projeto
nest new project-name

## criar CRUD
`nest g resource user`

ou criar separado

```
nest g controller user
nest g module user
nest g service user
```

can also create: middleware, interface, class, filter, guard, ...
read more: https://docs.nestjs.com/cli/usages



LINK DOCUMENTACAO OFICIAL: https://docs.nestjs.com/