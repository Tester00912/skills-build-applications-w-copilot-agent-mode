"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.mongoUri = exports.connectToDatabase = void 0;
var database_1 = require("../database");
Object.defineProperty(exports, "connectToDatabase", { enumerable: true, get: function () { return database_1.connectToDatabase; } });
Object.defineProperty(exports, "mongoUri", { enumerable: true, get: function () { return database_1.mongoUri; } });
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(database_1).default; } });
