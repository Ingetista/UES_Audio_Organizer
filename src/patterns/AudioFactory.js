
/*
La función de AudioFactory es actuar como un selector inteligente. 
Evita tener que usar New para cada tipo de archivo de audio. 
En su lugar, simplemente le das el nombre del archivo y la fábrica se encarga de crear la instancia correcta (FLAC o MP3) 
según la extensión del archivo. Esto hace que el código sea más limpio y fácil de mantener, 
especialmente si en el futuro se quieren agregar más formatos de audio.
*/

// src/patterns/AudioFactory.js
const AudioFile = require('../models/AudioFile');

class FlacFile extends AudioFile {
    constructor(nombre, ruta) {
        super(nombre, 'flac', ruta); // Pasamos la ruta al padre
        this.bitrate = '1411 kbps (Lossless)';
    }
}

class Mp3File extends AudioFile {
    constructor(nombre, ruta) {
        super(nombre, 'mp3', ruta);
        this.bitrate = '320 kbps (Lossy)';
    }
}

class AudioFactory {
    static crearAudio(nombreArchivo, rutaCompleta) {
        const partes = nombreArchivo.split('.');
        const extension = partes.pop().toLowerCase();
        const nombre = partes.join('.');

        if (extension === 'flac') return new FlacFile(nombre, rutaCompleta);
        if (extension === 'mp3') return new Mp3File(nombre, rutaCompleta);
        
        throw new Error(`Formato .${extension} no soportado`);
    }
}

module.exports = AudioFactory;