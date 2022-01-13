# API REQUIREMENTS

## API Endpoints

### Users

##### Index route: **'/api/users'** **[GET]** **REQUIRE TOKEN**

##### SHOW route: **'/api/users/:id'** **[GET]** **REQUIRE TOKEN**

##### CREATE route: **'/api/users'** **[POST]** **REQUIRE TOKEN**

##### UPDATE route: **'/api/users/:id'** **[PATCH]** **REQUIRE TOKEN**

##### DELETE route: **'/api/users/:id'** **[DELETE]** **REQUIRE TOKEN**

##### CHANGE USER PASSWORD route: **'/api/users/:id/change-password'** **[PATCH]** **REQUIRE TOKEN**

##### GET USER ORDERS route: **'/api/users/:id/orders/:status'** **[GET]** **REQUIRE TOKEN**

##### SIGNUP route: **'/api/users/signup'** **[POST]** **NO TOKEN**

##### LOGIN route: **'/api/users/login'** **[POST]** **NO TOKEN**

### Products

##### Index route: **'/api/products'** **[GET]** **NO TOKEN**

##### SHOW route: **'/api/products/:id'** **[GET]** **NO TOKEN**

##### GET BY CATEGORY route: **'/api/products/category/:category'** **[GET]** **NO TOKEN**

##### CREATE route: **'/api/products'** **[POST]** **REQUIRE TOKEN**

##### UPDATE route: **'/api/products/:id'** **[PATCH]** **REQUIRE TOKEN**

##### DELETE route: **'/api/products/:id'** **[DELETE]** **REQUIRE TOKEN**

### Orders

##### Index route: **'/api/orders'** **[GET]** **REQUIRE TOKEN**

##### SHOW route: **'/api/orders/:id'** **[GET]** **REQUIRE TOKEN**

##### CREATE route: **'/api/orders'** **[POST]** **REQUIRE TOKEN**

##### UPDATE route: **'/api/orders/:id'** **[PATCH]** **REQUIRE TOKEN**

##### DELETE route: **'/api/orders/:id'** **[DELETE]** **REQUIRE TOKEN**

##### GET ORDER PRODUCTS route: **'/api/orders/:id/products'** **[GET]** **REQUIRE TOKEN**

##### ADD PRODUCT TO ORDER route: **'/api/orders/:id/products'** **[POST]** **REQUIRE TOKEN**

#### \* A valid JWT token can be obtained by either login or signup a new user.

## Database Schema

### User

| Field          |          Type           |
| -------------- | :---------------------: |
| **id**         |       **Serial**        |
| **first_name** |    **varchar(250)**     |
| **last_name**  |    **varchar(250)**     |
| **email**      | **varchar(320) UNIQUE** |
| **password**   |        **text**         |

### Product

| Field        |       Type        |
| ------------ | :---------------: |
| **id**       |    **Serial**     |
| **name**     | **varchar(250)**  |
| **price**    | **NUMERIC(15,0)** |
| **category** | **VARCHAR(250)**  |

### Order

| Field       |              Type               |
| ----------- | :-----------------------------: |
| **id**      |           **Serial**            |
| **status**  |         **VARCHAR(15)**         |
| **user_id** | **BIGINT REFERENCES users(id)** |

### Order_Products

| Field          |                Type                |
| -------------- | :--------------------------------: |
| **id**         |             **Serial**             |
| **quantity**   |            **integer**             |
| **order_id**   |  **bigint REFERENCES orders(id)**  |
| **product_id** | **bigint REFERENCES products(id)** |
