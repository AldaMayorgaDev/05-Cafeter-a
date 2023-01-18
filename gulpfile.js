/* En este archivo van todas las tareas que realizara Gulp */

/* Las tareas son funciones en JavaScript 

function nombreTarea(done){
    // Codigo a ejecutar
    done(); //Para indicar que se finaliza la tarea
}
*/


/* function Tarea(done){
    console.log('Desde mi primer tarea');
    done();
}
 */

/* Exportar tareas

    exports.nombreConElQueSeLLamaraTarea = nombreTarea;
*/
/* exports.primerTarea = Tarea; */




/*** Rutina para compilar archivos SASS ***/ 
const {src, dest, watch, series, parallel} = require ('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

function css(done){
    //Compilar sass
    //Paso 1: identificar archivo
    //Paso 2: Compilar SASS
    //Paso 3: Guardar el archivo .css

  
    src('./src/scss/app.scss') //Buscar el archivo
       /*  .pipe(sass({ outputStyle: 'compressed'})) //Ya que encontro el archivo lo compila y lo devuelve en un formato minificado. */
       .pipe(sourcemaps.init()) // Inicia source map, siempre debe ir antes de compilar
        .pipe(sass({ outputStyle: 'expanded'})) //Ya que encontro el archivo lo compila y lo devuelve en un formato expandido .
        .pipe(postcss([ autoprefixer(), cssnano() ]) )
        .pipe(sourcemaps.write('.')) //Indicamos en donde queremos escribir el sourcemaps
        .pipe(dest('build/css')) //Ya una vez compilado Guarda el archivo .css
    done();
}

/* Tarea Watch */

function dev(){
   /*  //watch('ruta del Archivo a vigilar', funcion a Ejecutar si algo pasa en ese archivo)
    watch('./src/scss/app.scss', css); */
    watch('./src/scss/**/*.scss',css); /* Comodin para escuchar todos los archivos .scss en todos los subdirectorios*/
    watch('./src/img/**/*',imagenes);
}


/* Tareas para imagenes más ligeras*/
const imagemin = require('gulp-imagemin');
function imagenes(done){
    src('./src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'));
    done();   
}

/* Tarea para convertir imagenes a .webp*/
const webp = require('gulp-webp');
function toWebp(){
    const opciones= {
        quality: 50
    }
    return src('./src/img/**/*.{png,jpg}') // De todas las imagenes solo selecionara .png y jpg
    .pipe(webp(opciones))
    .pipe(dest('build/img'));

}

/* Tarea para convertir imagenes a .avif */
const avif = require('gulp-avif');
function toAvif(){
    const opciones= {
        quality: 50
    }
    return src('./src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'));
}








exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.toWebp = toWebp;
exports.toAvif = toAvif;

/* tareas por default -> son tareas que se ejecutan en terminal sin escribir su nombre, colo con el comando gulp*/

exports.default = series(imagenes, toWebp, toAvif, css, dev);


/* Series- Ejecuta las funciones en serie*/
/* Ejemplo: exports.default = series(css, dev) ---> ejecuta primero css y al finalizar ejecuta dev*/

/* Parallel- Ejecuta las funciones al mismo tiempo/
/* Ejemplo: exports.default = parallel(css, dev) ---> ejecuta css y dev al mismo tiempo*/