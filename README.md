## Taller 2 - Construcción del XML by FACTURA LATAM

[title] (https://www.youtube.com/watch?v=y6aPJGUuX-g&t=58s&ab_channel=facturalatam)

**Modalidades de facturación**

1. Gratuito
2. Software propio
3. Proveedor tecnológico

### ¿Qué es XML?

1. Transmitir un archivo XML de un servidor a la DIAN. (Factura electrónica)
2. Debe tener una firma digital. (Certificado digital de la empresa que emite factura)

### Diferencias entre formatos XML y JSON

1. El protocolo SOAP usa XML

- XML es a SOAP como JSON es a REST
- XML tiene una estructura de etiquetas o nodos parecidos al HTML
- JSON es una estructura de llaves y valores

### Nodos/Tags de un XML de factura eléctronica

1. Son los diferentes componentes de una factura que contiene los datos de la facturación. Como el usuario, el producto, la fecha y el precio.

2. Estándar UBL para la validación y estructura de los datos

3. En cada factura se indica el rango de facturas asignadas al cliente del certificado. Este rango se provee por la DIAN en la solicitud de una resolución.

4. Es importante ser la habilitación para

### Herramientas para trabajar

VSCode - Editor de código
Sublime - Editor de código y archivos
Postman - Peticiones HTTP
SoapUI - Peticiones SOAP

### Flujo de la factura electrónica

1. Definición de los endpoints y payloads de la API
2. Validar los datos al realizar una petición que vienen en el JSON
3. Crear varibales e instancias a partir del DTO que entra

4. Pasar los datos a la función createXML()
5. Crear nueva instancia de un DOMDocument
6. Pasar los datos requeridos al template que corresponda (Factura, nota crédito o débito, Attached document)
7. Renderizar los datos en el DOMDocument

8. Instanciar la clase SignInvoice e inicializarla (se debe firmar la factura y la petición)
9. Instanciar la clase SendTestAsync e inicializarla

10. Asignar el contenido del archivo a enviar y firmarlo con el algoritmo XADES-EPES mediante el método sign
11. Crear y firmar la petición a enviar a la Dian mediante el método signToSend

12. Recibir el response de la Dian y adjuntarlo a la respuesta de la API

TODO -> Extract and define the Invoice Request with the required and optional data

### Envío de XML por SOAPUI

### Recepción y desempaquetado de Acuse de recibo enviado por la DIAN

### Algoritmo de firma digital XADES-EPES
