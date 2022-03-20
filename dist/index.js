"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoConnection_1 = require("./database/MongoConnection");
const express_1 = __importDefault(require("express"));
const URLController_1 = require("./controller/URLController");
const api = (0, express_1.default)();
const port = 5000;
api.use(express_1.default.json());
const database = new MongoConnection_1.MongoConnection;
database.connect();
const urlController = new URLController_1.URLController();
api.post('/shorten', urlController.shorten);
api.get('/:hash', urlController.redirect);
api.listen(port, () => console.log(`Express linstening ${port}`));
//# sourceMappingURL=index.js.map