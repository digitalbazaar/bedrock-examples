# express-route-override

This example demonstrates how to override an express route. After

## Requirements

- npm v3+

## Installation

```
npm install
```

## Running the demo

```
npm start
```

then, direct a web browser to `https://localhost:8002/` where you will
need to accept an invalid (FOR DEVELOPMENT PURPOSES ONLY) SSL certificate.

1. Click the "Test" button to see what response body the express route reports.
2. Stop the server using CTRL+C.
3. Edit `index.js` and uncomment one of the override methods.
4. Start the server again and use the "Test" button to see the overridden
  response body.
5. Stop the server using CTRL+C.
6. Edit `index.js`, recomment the method used on step 3 and uncomment the other.
7. Start the server again and use the "Test" button to see the overridden
  response body.
