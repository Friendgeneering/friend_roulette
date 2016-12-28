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
      200: success
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
      200: success
      400: validation errors
      409: username already exists
      500: server error
```

## Socket.IO API

**Authentication**

Every socket connection requires authentication, since an attempted web socket connection implies the user intends to join a room.

The authentication is handled using the jwt given back as a response to the HTTP POST request made to `/api/auth/signUp` or `/api/auth/signIn`.

In order to authenticate a web socket connection, assign the token as a query parameter to socket.io's `connect` function like so:

```javascript
// in a component
import io from 'socket.io';

io.connect(`localhost:3001/?token=${USER_TOKEN}`);
```

If unauthorized, the web socket connection will be rejected.
