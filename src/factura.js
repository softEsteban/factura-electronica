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
  const root = create({
    version: "1.0",
    encoding: "utf-8",
    standalone: "no",
  })
    .ele("Invoice", {
      xmlns: "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
      "xmlns:cac":
        "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
      "xmlns:cbc":
        "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
      "xmlns:ext":
        "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2",
      "xmlns:sts": "dian:gov:co:facturaelectronica:Structures-2-1",
      "xmlns:xades": "http://uri.etsi.org/01903/v1.3.2#",
      "xmlns:xades141": "http://uri.etsi.org/01903/v1.4.1#",
      "xmlns:ds": "http://www.w3.org/2000/09/xmldsig#",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "xsi:schemaLocation":
        "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2     http://docs.oasis-open.org/ubl/os-UBL-2.1/xsd/maindoc/UBL-Invoice-2.1.xsd",
    })
    .ele("ext:UBLExtensions")
    .ele("ext:UBLExtension")
    .ele("ext:ExtensionContent")
    .ele("sts:DianExtensions")
    .ele("sts:InvoiceControl")
    .ele("sts:InvoiceAuthorization")
    .txt("18760000001")
    .up()
    .ele("sts:AuthorizationPeriod")
    .ele("cbc:StartDate")
    .txt("2019-01-19")
    .up()
    .ele("cbc:EndDate")
    .txt("2030-01-19")
    .up()
    .up()
    .ele("sts:AuthorizedInvoices")
    .ele("sts:Prefix")
    .txt("SETP")
    .up()
    .ele("sts:From")
    .txt("990000000")
    .up()
    .ele("sts:To")
    .txt("995000000")
    .up()
    .up()
    .up()
    .ele("sts:InvoiceSource")
    .ele("cbc:IdentificationCode", {
      listAgencyID: "6",
      listAgencyName: "United Nations Economic Commission for Europe",
      listSchemeURI:
        "urn:oasis:names:specification:ubl:codelist:gc:CountryIdentificationCode-2.1",
    })
    .up()
    .up()
    .ele("sts:SoftwareProvider")
    .ele("sts:ProviderID", {
      schemeAgencyID: "195",
      schemeAgencyName:
        "CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)",
      schemeID: "4",
      schemeName: "31",
    })
    .txt("800197268")
    .up()
    .ele("sts:SoftwareID", {
      schemeAgencyID: "195",
      schemeAgencyName:
        "CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)",
    })
    .txt("56f2ae4e-9812-4fad-9255-08fcfcd5ccb0")
    .txt("CO")
    .up()
    .up()
    .ele("sts:SoftwareSecurityCode", {
      schemeAgencyID: "195",
      schemeAgencyName:
        "CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)",
    })
    .txt(
      "a8d18e4e5aa00b44a0b1f9ef413ad8215116bd3ce91730d580eaed795c83b5a32fe6f0823abc71400b3d"
    );
  //TODO - SoftwareSecurityCode -> AuthorizationProvider

  // convert the XML tree to string
  const xml = root.end({ prettyPrint: true });
  console.log(xml);
  return xml;
}

generarXMLFactura();
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

// Generate a timestamp-based stamp for the filename
const timestamp = new Date().getTime();
const filename = `factura_${timestamp}.xml`;

// Write the XML to the file with the timestamp-based filename
fs.writeFileSync(filename, xmlFactura);

console.log(`XML factura has been written to '${filename}'`);
