// Importa as extensões do jest-dom
require('@testing-library/jest-dom');
// Polyfill para TextEncoder/TextDecoder
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;