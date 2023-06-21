// npm install axios
// npm install xml2js
// npm install xmlbuilder2
// npm install express
// npm install swagger-ui-express
// npm install swagger-jsdoc
// npm install nodemon

const fs = require("fs");
const axios = require("axios");
const { parseStringPromise, XMLBuilder } = require("xml2js");
const { create } = require("xmlbuilder2");

async function generarFacturaElectronica(datosFactura) {
  try {
    // Paso 1: Generar el XML de la factura utilizando los datos proporcionados
    const xmlFactura = generarXMLFactura(datosFactura);

    // Paso 2: Enviar la factura electrónica a la DIAN
    const respuestaDIAN = await enviarFacturaDIAN(xmlFactura);

    // Paso 3: Procesar la respuesta de la DIAN
    const resultado = procesarRespuestaDIAN(respuestaDIAN);

    return resultado;
  } catch (error) {
    console.error("Error al generar la factura electrónica:", error);
    throw error;
  }
}

// function generarXMLFactura(datosFactura) {
//   const builder = new Builder();

//   const xmlFactura = builder.buildObject({
//     // Estructura del XML de la factura
//     // ...completa con los datos de la factura
//   });

//   return xmlFactura;
// }

function generarXMLFactura(datosFactura) {
  const builder = create();

  // Crear la estructura del XML de la factura
  const xmlFactura = builder
    .ele("Factura") // Etiqueta raíz
    .ele("Cliente") // Etiqueta del cliente
    .ele(
      "Nombre",
      datosFactura.nombreItem ? datosFactura.nombreItem.replace(/\s/g, "_") : ""
    ) // Etiqueta del nombre del cliente con su valor
    .up() // Volver al nivel anterior
    .ele("Items") // Etiqueta de los items de la factura
    .ele("Item") // Etiqueta de un item
    .ele("Nombre", datosFactura.nombreItem.replace(/\s/g, "_")) // Reemplazar espacios por guiones bajos
    .ele("Cantidad", datosFactura.cantidadItem) // Etiqueta de la cantidad del item con su valor
    .end({ pretty: true }); // Finalizar y obtener el XML como una cadena formateada

  return xmlFactura;
}

// Generate a timestamp-based stamp for the filename
const timestamp = new Date().getTime();
const filename = `factura_${timestamp}.xml`;

// Write the XML to the file with the timestamp-based filename
fs.writeFileSync(filename, xmlFactura);

console.log(`XML factura has been written to '${filename}'`);

async function enviarFacturaDIAN(xmlFactura) {
  const urlDIAN = "URL_DEL_SERVICIO_WEB_DE_LA_DIAN";

  const headers = {
    // Configura los encabezados necesarios (p. ej., autorización, contenido, etc.)
  };

  const respuesta = await axios.post(urlDIAN, xmlFactura, { headers });
  return respuesta.data;
}

async function procesarRespuestaDIAN(xmlRespuesta) {
  const parsedResponse = await parseStringPromise(xmlRespuesta);

  // Procesa la respuesta y extrae la información relevante
  // ...completa con el procesamiento necesario

  return resultado;
}

const datos = {
  nombreCliente: "Prueba",
  nombreItem: "Prueba_Item", // Modified item name
  cantidadItem: 1,
};
const xmlFactura = generarXMLFactura(datos);

// generarFacturaElectronica(datosFactura)
//   .then((resultado) => {
//     console.log("Factura generada correctamente:", resultado);
//   })
//   .catch((error) => {
//     console.error("Error al generar la factura electrónica:", error);
//   });
