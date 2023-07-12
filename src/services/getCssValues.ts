

  interface Objeto {
    [key: string]: any;
  }
  
 export function  getCssValues(objeto: Objeto, atributosDesejados: string[]): Objeto {
    const resultado: Objeto = {};
  
    for (const key in objeto) {
      if (objeto.hasOwnProperty(key)) {
        const valor = objeto[key];
  
        if (typeof valor === 'object' && !Array.isArray(valor)) {
          const atributosFilhos =  getCssValues(valor, atributosDesejados);
          Object.assign(resultado, atributosFilhos);
        } else if (atributosDesejados.includes(key)) {
          resultado[key] = valor;
        }
      }
    }
  
    return resultado;
  }

  export const listComponentsCss = (objetos: Objeto[], atributosDesejados: string[]) => {
    const result = objetos.map(objeto => getCssValues(objeto, atributosDesejados))

    return result
  } 

   
//   const atributosDesejados = getCssValues(arrayDeObjetos, ['id', 'nome', 'atributos.atributo1', 'atributos.atributo2']);
//   console.log(atributosDesejados);