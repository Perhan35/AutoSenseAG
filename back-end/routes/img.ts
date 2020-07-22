/** 
 * File: img.ts 
 * Desc: middleware to handle images
 * Dev: Perhan Scudeller
 * Company: AutoSense AG
 * License: 
 */

import express = require('express');
import path = require('path');
const img : express.Application = express();

//TODO for each download, verifiy if user has access rights to this image

img.use(express.static(path.join(__dirname, '../public/img/')));

module.exports = img;