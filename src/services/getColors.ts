import fs from 'fs'
import { Request, Response } from 'express';

export function getColors(req: Request, res: Response) {
    let importStream = fs.createReadStream('./src/figma-components.json', { flags: 'r', encoding: 'utf-8', highWaterMark: 131072 })
    importStream.on('data', function(chunk){
        let JSONObject = JSON.parse(chunk as string)
        console.log('TYPOF ------------------------------------------- ', JSONObject)

        let components = JSONObject.meta.components 
        console.log(components)


        
    })

    // importStream.on('end', function(item){
    //     // console.log(item)
    // })

    res.json({'test': 'ok'})
}