import fs from 'fs'
import { getComponent } from './getComponent'
import express, { Request, Response } from 'express';

export async function getComponents(req: Request, res: Response) {
    try {

        let importStream = fs.createReadStream('./src/figma-components.json', { flags: 'r', encoding: 'utf-8', highWaterMark: 131072 })
        importStream.on('data', async function(chunk){
            let JSONObject = JSON.parse(chunk as string)
            // console.log('TYPOF ------------------------------------------- ', JSONObject)
            
        let components = JSONObject.meta.components 
        
        let buttons = components.filter((component: { containing_frame: { name: string } }) => component.containing_frame.name.toLowerCase().includes("button"))
        
        buttons = buttons.map((button: { node_id: any; name: any }) => { return { node_id: button.node_id, name: button.name }})
        
        let a = await getComponent("405:133")
        
        
        res.json(a)
        })
    } catch (err) {
        res.json()
    }
    

}