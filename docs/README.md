# Developer Documentation

## REST API

### Authentication

**`/api/auth/signIn`**

```plaintext
{POST}
  Query

  Params

  Body
    username: STRING
    password: STRING

  Response
    JSON
      success: BOOL
      token ?: STRING
      err   ?: STRING
    Codes
      400: validation errors
      401: invalid username or password
      500: server error
```

**`/api/auth/signUp`**

```plaintext
{POST}
  Query

  Params

  Body
    username: STRING
    password: STRING
    email   : STRING
    age     : INT
    location: STRING
    gender  : STRING

  Response
    JSON
      success : BOOL
      token  ?: STRING
      message?: STRING
      err    ?: STRING
    Codes
      400: validation errors
      409: username already exists
      500: server error
```

## Socket.IO API
