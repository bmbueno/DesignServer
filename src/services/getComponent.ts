import axios from "axios"
import { getCssValues } from "./getCssValues"
import { getCssAttributes } from "./getCssAttributes"
import { convertRuleCss } from "./convertRuleCss"
require('dotenv/config');

export async function getComponent(nodeId: string) {
    
    const response = await axios.get(`https://api.figma.com/v1/files/${process.env.FIGMA_FILE}/nodes?ids=` + nodeId, { headers: {
        "X-Figma-Token": process.env.FIGMA_TOKEN
    } })

    console.log("env: ", )

    const componentDescription = response.data.nodes[nodeId] 
    const firstGroup = Object.keys(componentDescription.componentSets)[0]
    const nameComponent = componentDescription.componentSets[firstGroup].name
    const attributes = await getCssAttributes(nameComponent)
    const cssAttributes = getCssValues(componentDescription, attributes)

    let generatedCss = ""
    for (let attribute in cssAttributes) {
        generatedCss += convertRuleCss(attribute, cssAttributes[attribute])
    }

    generatedCss = `{\n${generatedCss}}`
    console.log(generatedCss)
    
    
    return cssAttributes
}