// src/index.js
const fs = require('fs');
const path = require('path');
const AudioFactory = require('./patterns/AudioFactory');
const { 
    FormatOrganizationStrategy, 
    SizeOrganizationStrategy 
} = require('./patterns/OrganizationStrategy'); 

class LibraryManager {
    constructor(folderPath) {
        this.folderPath = folderPath;
        this.biblioteca = [];
        this.strategy = new FormatOrganizationStrategy(); // Estrategia por defecto
    }

    setStrategy(nuevaEstrategia) {
        this.strategy = nuevaEstrategia;
    }

    escanearYProcesar() {
        console.log(`\n🔍 Escaneando directorio: ${this.folderPath}...`);
        
        if (!fs.existsSync(this.folderPath)) {
            console.error("La carpeta 'entradas' no existe. Créala y añade archivos.");
            return;
        }

        const archivos = fs.readdirSync(this.folderPath);

        archivos.forEach(archivo => {
            const rutaCompleta = path.join(this.folderPath, archivo);
            
            // Saltamos carpetas, solo queremos archivos
            if (fs.lstatSync(rutaCompleta).isDirectory()) return;

            try {
                // 1. FACTORY METHOD: Identifica y crea el objeto técnico
                const audio = AudioFactory.crearAudio(archivo, rutaCompleta);
                this.biblioteca.push(audio);
                console.log(`Identificado: ${audio.obtenerInfo()}`);
            } catch (error) {
                console.log(`Ignorado: ${archivo} (${error.message})`);
            }
        });

        this.organizar();
    }

    organizar() {
        console.log(`\n🚀 Iniciando organización real en disco...`);
        this.biblioteca.forEach(pista => {
            // 2. STRATEGY: Mueve los archivos según la lógica elegida
            const resultado = this.strategy.organizar(pista, this.folderPath);
            console.log(resultado);
        });
        // Limpiamos la biblioteca después de mover para evitar duplicados
        this.biblioteca = [];
    }
}

// --- EJECUCIÓN ---
const miOrganizador = new LibraryManager(path.join(__dirname, '../entradas'));

// Organizar por Formato
miOrganizador.setStrategy(new FormatOrganizationStrategy());
miOrganizador.escanearYProcesar();


/* Para probar la otra estrategia de organización, remplazar las dos líneas anteriores por: 

miOrganizador.setStrategy(new SizeOrganizationStrategy());
miOrganizador.escanearYProcesar();

*/
