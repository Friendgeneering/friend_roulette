# Developer Documentation

**Legend**

* all parameters are **required** by unless indicated otherwise.
* `?` denotes an optional parameter.

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
      success: BOOLEAN
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
    age     : INTEGER
    location: STRING
    gender  : STRING

  Response
    JSON
      success : BOOLEAN
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

### Authentication

Every socket connection requires authentication, since an attempted web socket connection implies the user intends to join a room.

The authentication is handled using the jwt given back as a response to the HTTP POST request made to `/api/auth/signUp` or `/api/auth/signIn`.

In order to authenticate a web socket connection, assign the token as a query parameter to socket.io's `connect` function like so:

```javascript
// in a component
import io from 'socket.io';

io.connect(`localhost:3001/?token=${USER_TOKEN}`);

// alternatively:
io.connect('localhost:3001', { 
  query: `token=${USER_TOKEN}` 
});
```

If unauthorized, the web socket connection will be rejected.

### General Events

These event(s) will be emitted from the server to the client at any given time, not specific to any part of the application:

Server Emits: **`err`**

```plaintext
Data
  err: STRING
```

### Connecting to a Room

Once a successful connection is established, you may request to join a room by emitting a `connectTo` event from the client and can expect a `connectTo.response` 

**`connectTo`** (client emission)

```plaintext
Data
  roomId: INTEGER
```

**`connectTo.response`** (server emission)

```plaintext
Data
  success: BOOLEAN
  err   ?: STRING
  users ?: ARRAY<OBJECT>
```

### Leaving a room

