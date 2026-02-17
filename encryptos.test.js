const crypto = require('crypto');
const encryptos = require('./encryptos.js');

describe('EncryptoS Tests', () => {
    const key = crypto.randomUUID();
    const content = crypto.randomUUID();

    const ES = new encryptos({
        dir: './public/',
        file: 'es',
        algorithm: 'aes-256-cbc',
        key,
    });

    test('Constructor', () => {
        expect(ES.dir).toBe('./public/');
        expect(ES.file).toBe('es');
        expect(ES.algorithm).toBe('aes-256-cbc');
        expect(ES.key).toBe(key);
    });

    test('Direct Encrypt', async () => {
        var success = ES.directEncrypt(content);
        expect(success).toBeTruthy();
    });

    test('Encrypt', async () => {
        var success = ES.encrypt(content);
        expect(success).toBeTruthy();
    });

    test('Direct Decrypt', async () => {
        var success = ES.directDecrypt(ES.directEncrypt(content));
        expect(success).toEqual(content);
    });

    test('Decrypt', async () => {
        expect(ES.decrypt()).toEqual(content);
    });
});