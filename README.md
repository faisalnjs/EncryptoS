# EncryptoS

Encrypt to and decrypt from a file stream. Compatible with Node.js apps.

## Requirements

- Must be using Node.js v10.12 or higher.

## Usage

Include the `encryptos` package in your Node.js application:

```javascript
const encryptos = require('encryptos');
const ES = new encryptos({
    dir: './public/',
    file: 'es',
    algorithm: 'aes-256-cbc',
    key: 'my-ultra-long-32-char-secret-key',
});

// Encrypt content and save to file
var success = ES.encrypt('super secret content');
console.log('Encryption successful:', success);

// Decrypt content from file
var decrypted = ES.decrypt();
console.log('Decrypted content:', decrypted);
```

## Tests

Run tests using Jest:

```bash
npm test
```
