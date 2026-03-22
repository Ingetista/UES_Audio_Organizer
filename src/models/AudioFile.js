// src/models/AudioFile.js

/*
Este archivo define la clase base AudioFile, que representa qué es un archivo de audio genérico.
*/

const fs = require('fs');

class AudioFile {
    constructor(nombre, extension, rutaOriginal) {
        this.nombre = nombre;
        this.extension = extension;
        this.rutaOriginal = rutaOriginal;
        this.stats = fs.statSync(rutaOriginal);
        this.sizeMB = (this.stats.size / (1024 * 1024)).toFixed(2);
    }

    obtenerInfo() {
        return `${this.nombre}.${this.extension} | Tamaño: ${this.sizeMB} MB`;
    }
}

module.exports = AudioFile;