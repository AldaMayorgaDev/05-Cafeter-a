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

function css(done){
    //Compilar sass
    //Paso 1: identificar archivo
    //Paso 2: Compilar SASS
    //Paso 3: Guardar el archivo .css

  
    src('./src/scss/app.scss') //Buscar el archivo
       /*  .pipe(sass({ outputStyle: 'compressed'})) //Ya que encontro el archivo lo compila y lo devuelve en un formato minificado. */
        .pipe(sass({ outputStyle: 'expanded'})) //Ya que encontro el archivo lo compila y lo devuelve en un formato expandido .
        .pipe(postcss([ autoprefixer() ]) )
        .pipe(dest('build/css')) //Ya una vez compilado Guarda el archivo .css
    done();
}

/* Tarea Watch */
function dev(){
   /*  //watch('ruta del Archivo a vigilar', funcion a Ejecutar si algo pasa en ese archivo)
    watch('./src/scss/app.scss', css); */
    watch('./src/scss/**/*.scss',css); /* Comodin para escuchar todos los archivos .scss en todos los subdirectorios*/
}

exports.css = css;
exports.dev = dev;

/* tareas por default -> son tareas que se ejecutan en terminal sin escribir su nombre, colo con el comando gulp*/

exports.default = series(css, dev);


/* Series- Ejecuta las funciones en serie*/
/* Ejemplo: exports.default = series(css, dev) ---> ejecuta primero css y al finalizar ejecuta dev*/

/* Parallel- Ejecuta las funciones al mismo tiempo/
/* Ejemplo: exports.default = parallel(css, dev) ---> ejecuta css y dev al mismo tiempo*/