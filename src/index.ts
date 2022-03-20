import { MongoConnection } from './database/MongoConnection';
import express from 'express';
import { URLController } from './controller/URLController';

const api = express();
const port = 5000

api.use(express.json())
const database = new MongoConnection
database.connect()

const urlController = new URLController()
api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)


api.listen(port, () => console.log(`Express linstening ${port}`));