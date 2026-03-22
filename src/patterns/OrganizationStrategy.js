const fs = require('fs');
const path = require('path');

class OrganizationStrategy {
    organizar(audioFile, directorioBase) {
        throw new Error("Método no implementado");
    }
}

// Estrategia A: Organizar por Formato (Carpetas FLAC, MP3, etc.)
class FormatOrganizationStrategy extends OrganizationStrategy {
    organizar(audioFile, directorioBase) {
        const destino = path.join(directorioBase, audioFile.extension.toUpperCase());
        if (!fs.existsSync(destino)) fs.mkdirSync(destino, { recursive: true });
        
        const nuevaRuta = path.join(destino, `${audioFile.nombre}.${audioFile.extension}`);
        fs.renameSync(audioFile.rutaOriginal, nuevaRuta);
        return `[FORMATO] Movido ${audioFile.nombre} a carpeta /${audioFile.extension.toUpperCase()}`;
    }
}

// Estrategia B: Organizar por Tamaño (Pequeños < 10MB, Grandes > 10MB)
class SizeOrganizationStrategy extends OrganizationStrategy {
    organizar(audioFile, directorioBase) {
        const categoria = audioFile.sizeMB > 10 ? "GRANDES_HIFI" : "PEQUENOS_COMPRIMIDOS";
        const destino = path.join(directorioBase, categoria);
        if (!fs.existsSync(destino)) fs.mkdirSync(destino, { recursive: true });

        const nuevaRuta = path.join(destino, `${audioFile.nombre}.${audioFile.extension}`);
        fs.renameSync(audioFile.rutaOriginal, nuevaRuta);
        return `[TAMANO] ${audioFile.nombre} categorizado como ${categoria}`;
    }
}

module.exports = { FormatOrganizationStrategy, SizeOrganizationStrategy };