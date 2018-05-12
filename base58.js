/* base58 encoding and decoding functions from coligo.io's url shortener app
 * https://github.com/coligo-io/url-shortener-node-mongo-express/blob/master/base58.js
 * used under MIT License - Copyright (c) 2016 coligo
 */
const alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
const base = alphabet.length;

function encode(num) {
  let encoded = '';
  
  while (num) {
    const remainder = num % base;
    num = Math.floor(num / base);
    
    encoded = alphabet[remainder].toString() + encoded;
  }
  return encoded;
}

function decode(str) {
  let decoded = 0;
  
  while(str) {
    const alphaIndex = alphabet.indexOf(str[0]);
    const power = str.length - 1;
    
    decoded += alphaIndex * Math.pow(base, power);
    str = str.substring(1);
  }
  return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;