import fs from 'fs'

export async function getCssAttributes(type: string) {
    let JSONObject: { [key: string]: string } = {}

    const objectString = fs.readFileSync("./types.json", "utf8")
    JSONObject = JSON.parse(objectString);
    const attributes: any = JSONObject[type];

    return attributes
}