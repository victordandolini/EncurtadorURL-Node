import { URLModel } from "../database/Model/URL";
import { Request, Response } from "express";
import shortId from 'shortid'
import { config } from "../config/Constants";

export class URLController {
    public async shorten(req: Request, res: Response): Promise<void> {
        //Verificar se a URL já não existe
        const { originURL }  = req.body
        const url = await URLModel.findOne({ originURL})
        if (url) {
            res.json(url)
            return
        } 
       
        //Criar o hash para URL
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        
        //Salvar URL no DB
        const newURL = await URLModel.create({hash, shortURL, originURL})
        
        //Retornar a URL
        res.json({newURL})

    }
    public async redirect(req: Request, res: Response): Promise<void> {
        //Pegar o hash da URL
        const {hash} = req.params

        //Encontrar a URL original pelo hash
        const url = await URLModel.findOne({hash})
        
        //Redirecionar para a URL original a partir do que encontramos no DB
        if (url) {
            res.redirect(url.originURL)
            return
        }

        res.status(404).json({error: 'URL not Found'})

    }
}