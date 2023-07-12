import { ColorTranslator } from "colortranslator"


const tradution: {[key: string]: string} = {
    cornerRadius: "border-radius",
    strokeWeight: "border-width",
    strokeAlign: "border-style",
    paddingLeft: "padding-left",
    paddingRight: "padding-right",
    paddingTop: "padding-top",
    paddingBottom: "padding-bottom",
    background: "background-color"
}

const borderStyles: {[key: string]: string} = {
    INSIDE: "inset",
    OUTSIDE: "outset"
}

const convertColor = (figmaBackground: { type: string, color: colorFigma}[]) => {
    let hexColor = ""
    if (figmaBackground.length > 0 && figmaBackground[0].type == "SOLID") {
        let color = figmaBackground[0].color
        hexColor = (new ColorTranslator({r: color.r * 255, g: color.g * 255, b: color.b * 255, a: color.a})).HEX

        return hexColor
    }
    return ""
}

type colorFigma = {r: number, g: number, b: number, a: number}

export const convertRuleCss = (rule: string, value: string & { type: string, color: colorFigma }[]) => {
    
    switch(rule) {
        case "fill":
        case "fills":
        case "cornerSmoothing":
        case "name": return ``
        case "width":
        case "height": return `${rule}: ${parseInt(value)}px;\n`
        case "strokeAlign": return `${tradution[rule]}: ${borderStyles[value]};\n`
        case "background": return `${tradution[rule]}: ${convertColor(value)};\n`
        case "paddingLeft":
        case "paddingRight":
        case "paddingTop":
        case "paddingBottom":
        case "cornerRadius":
        case "strokeWeight": return `${tradution[rule]}: ${parseInt(value)}px;\n`
    }

    return `${rule}: ${value};\n`
}