# 🎵 UES - Gestor y Organizador de Audio Hi-Fi

Este proyecto es una herramienta de automatización para la gestión de bibliotecas de audio. Permite escanear un directorio de entrada, identificar formatos de audio (Lossless y Lossy) y organizarlos físicamente en el disco duro aplicando distintos criterios de clasificación.

## 📐 Arquitectura y Patrones de Diseño Aplicados

El sistema está construido sobre Node.js utilizando principios de diseño de software para garantizar su escalabilidad y fácil mantenimiento:

* **Factory Method:** Aísla la lógica de creación de los objetos de audio. El sistema detecta la extensión del archivo y delega a la fábrica (`AudioFactory`) la instanciación de clases específicas (`FlacFile`, `Mp3File`, `WavFile`), permitiendo agregar nuevos formatos en el futuro sin modificar el núcleo del procesador.
* **Strategy:** Desacopla el algoritmo de organización del gestor principal. Permite intercambiar dinámicamente el comportamiento del sistema para organizar los archivos por **Formato** (creando subcarpetas como `/FLAC` o `/MP3`) o por **Tamaño** (categorizando entre archivos pesados y ligeros).

## 🚀 Requisitos Previos

* [Node.js](https://nodejs.org/) (Versión LTS recomendada - v24 o superior).

## 🛠️ Instrucciones de Uso

1.  Clona este repositorio en tu máquina local.
2.  Abre una terminal en la raíz del proyecto.
3.  Crea una carpeta llamada `entradas` en el directorio principal:
    ```bash
    mkdir entradas
    ```
4.  Copia tus archivos de audio (`.flac`, `.mp3`, `.wav`) desordenados dentro de la carpeta `entradas`.
5.  Ejecuta la aplicación:
    ```bash
    node src/index.js
    ```
6.  Observa la consola y revisa la carpeta `entradas` para ver los archivos organizados automáticamente.

> **Nota:** La estrategia de organización puede cambiarse modificando la instancia pasada a `setStrategy()` en el archivo `index.js`.