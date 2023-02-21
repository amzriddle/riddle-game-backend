## Documentation: PRISMA

## add banco de dados
npm install prisma --save-dev

npx prisma init
npx prisma generate


## Most used commands
```bash
# migrate schema changes
$ npx prisma migrate dev

# view database
$ npx prisma studio

# help
$ npx prisma --help
```

## Migration
```bash
# migrate schema changes
$ npx prisma migrate dev

# migrate roll back
$ npx prisma migrate resolve --rolled-back "20201127134938_added_bio_index"
```

more information: https://www.prisma.io/docs/guides/database/production-troubleshooting#failed-migration
