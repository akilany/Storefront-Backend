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

.._ PORT=3333
.._ ENV=dev

.._ POSTGRES_HOST=localhost
.._ POSTGRES_PORT=4444
.._ POSTGRES_DB=storefront
.._ POSTGRES_TEST_DB=storefront_test
.._ POSTGRES_USER=postgres
.._ POSTGRES_PASSWORD=4444

.._ PASSWORD_SECRET=my-little-unknown-secert
.._ SALT_ROUNDS=10

.._ JWT_SECRET='my-super-unknown-secert'
.._ JWT_EXPIRES_IN=90d
..\* JWT_COOKIE_EXPIRES_IN=90
