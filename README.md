## Project setup

```
npm install
```

### Run development server

##### RUNS ON PORT 3333

```
npm run start
```

### Watch ts files

##### RUNS ON PORT 3333

```
npm run watch
```

### Run build server

```
npm run start:build
```

### Compile typescript to javascript

```
npm run build
```

### Run tests

##### RUNS ON PORT 3334

```
npm run test
```

## Database

### Create Storefront database

##### RUNS ON PORT 4444

```
npm run create:db
```

### Drop test database

```
npm run drop:testdb
```

### Migrations UP

```
npm run migrate:up
```

### Migrations DOWN

```
npm run migrate:down
```

## Environment Variables

- PORT=3333
- ENV=dev

- POSTGRES_HOST=localhost
- POSTGRES_PORT=4444
- POSTGRES_DB=storefront
- POSTGRES_TEST_DB=storefront_test
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=4444

- PASSWORD_SECRET=my-little-unknown-secert
- SALT_ROUNDS=10

- JWT_SECRET='my-super-unknown-secert'
- JWT_EXPIRES_IN=90d
- JWT_COOKIE_EXPIRES_IN=90
