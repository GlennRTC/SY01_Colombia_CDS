# 📊 Proyecto de Integración CDS Colombia

Este proyecto contiene un conjunto de scripts y archivos de configuración utilizados para la integración de sistemas de CDS (Clinical Decision Support) en Colombia. A continuación, se describen los archivos y su propósito:

## 📁 Estructura del Proyecto

- **📄 Default Group.xml**: Archivo de configuración del grupo por defecto.
- **📄 Example_inbound_HL7.txt**: Ejemplo de mensaje HL7 entrante.
- **📄 Example_outbound_msg.json**: Ejemplo de mensaje saliente en formato JSON.
- **📜 Incoming_scripts.js**: Scripts utilizados para procesar mensajes entrantes.
- **📄 Offline Analisis.xml**: Archivo de configuración para análisis offline.
- **📜 outcoming_statistics_scripts.js**: Scripts utilizados para generar estadísticas salientes.
- **📄 README.md**: Este archivo, que proporciona una descripción general del proyecto.
- **📄 statistics.xml**: Archivo de configuración para estadísticas.
- **📄 SY01_Colombia_Phase_2.xml**: Archivo de configuración para la fase 2 de la integración en Colombia.
- **📄 Test Env.xml**: Archivo de configuración del entorno de pruebas.

## 📌 Descripción de Archivos Clave

### 📜 Incoming_scripts.js

Este archivo contiene scripts que procesan mensajes entrantes. Algunos fragmentos relevantes incluyen:

- Mapeo de códigos de plan para utilizarlos como filtro.
- Creación de objetos de atributos primarios a partir de los mensajes HL7.
- Funciones para transformar rangos de valores en los mensajes.

### 📄 SY01_Colombia_Phase_2.xml

Archivo de configuración para la fase 2 de la integración en Colombia. Contiene scripts y configuraciones específicas para el procesamiento de mensajes y la generación de atributos.

### 📄 Test Env.xml

Archivo de configuración del entorno de pruebas. Incluye scripts para el procesamiento de mensajes y la creación de objetos de atributos.

## 🚀 Uso

Para utilizar este proyecto, asegúrese de tener Mirth Connect instalado y configurado. Importe los archivos XML en Mirth Connect y ajuste las configuraciones según sea necesario para su entorno específico.

## 🤝 Contribuciones

Las contribuciones a este proyecto son bienvenidas. Por favor, envíe un pull request o informe de problemas en el repositorio correspondiente.

## 📜 Licencia
