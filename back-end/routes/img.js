"use strict";
/**
 * File: img.ts
 * Desc: middleware to handle images
 * Dev: Perhan Scudeller
 * Company: AutoSense AG
 * License:
 */
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var img = express();
//TODO for each download, verifiy if user has access rights to this image
img.use(express.static(path.join(__dirname, '../public/img/')));
module.exports = img;
