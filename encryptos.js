"use strict";

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class ES {
    constructor(options = {}) {
        this.dir = options.dir || './public/';
        this.file = options.file || 'es';
        this.algorithm = options.algorithm || 'aes-256-cbc';
        this.key = options.key || crypto.randomBytes(32);
    };

    encrypt(content) {
        try {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.key.slice(0, 32)), iv);
            const file = path.resolve(path.join(this.dir, String(this.file).toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')));
            fs.mkdirSync(path.dirname(file), { recursive: true });
            const encryptedData = Buffer.concat([cipher.update(content), cipher.final()]).toString('hex');
            fs.writeFileSync(file, `${iv.toString('hex')}:${encryptedData}`);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        };
    };

    decrypt() {
        try {
            const filePath = path.resolve(path.join(this.dir, String(this.file).toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')));
            const content = fs.readFileSync(filePath, 'utf8');
            const parts = content.split(':');
            if (parts.length !== 2) return false;
            const iv = Buffer.from(parts[0], 'hex');
            const encryptedText = Buffer.from(parts[1], 'hex');
            const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.key.slice(0, 32)), iv);
            return Buffer.concat([decipher.update(encryptedText), decipher.final()]).toString();
        } catch (e) {
            console.error(e);
            return false;
        };
    };
};

module.exports = ES;