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

// Encrypt content
var success = ES.directEncrypt('super secret content');
console.log('Direct encryption successful:', success);

// Encrypt content and save to file
var success2 = ES.encrypt('super secret content');
console.log('Encryption successful:', success2);

// Decrypt content
var decrypted = ES.directDecrypt(ES.directEncrypt('super secret content'));
console.log('Direct decrypted content:', decrypted);

// Decrypt content from file
var decrypted2 = ES.decrypt();
console.log('Decrypted content:', decrypted2);
```

## Tests

Run tests using Jest:

```bash
npm test
```
