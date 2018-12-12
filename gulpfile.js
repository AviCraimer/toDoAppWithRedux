const gulp = require('gulp');

// In GULP 4.x the series and parallel functions are used instead of array notation to run tasks. There is no longer a dependency argument in tasks, instead you can run dependencies using series.
const {series} = gulp;
const {parallel} = gulp;

//HTML bundling and pre-processing
const fileInclude = require('gulp-file-include');

//Image optimizaiton
const imageMin = require('gulp-imagemin');

//Sass - CSS
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');

// browswerSync - live server
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

// Javascript bundling, transpiling and minification
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourceMaps = require('gulp-sourcemaps');
const babelify = require('babelify');

//Error handling and general utility
const notify = require('gulp-notify'); //Error Messages
const plumber = require('gulp-plumber'); //Error Handling, might not be using this
const concat = require('gulp-concat'); //Concatenates files, might not be using it
const del = require('del'); //Delete files
const rename = require('gulp-rename'); //Rename files


//****____****//

//This global variable determines whether the Scripts will be minified or not. This effects the html include variables as well as the js task. It should be set to false. Use the "gulp prod" command to generate minified JS for production.
let minifyScripts = false;

// Returns functions that delete files from dist
const clean =  function (foldername) {
    if (foldername) {
        //Delete files in the given folder within dist (minus the excluded ones)
        let cleanFolder = () =>{
            //Paths to files or directories to exclude from cleaning during watch updates
            //Don't forget to add the exclaimation mark before the paths!
            let excludePaths = [
                '!./dist/js/babel-polyfill.min.js'
            ];
            return  del(['./dist/' + foldername + '/**/*'].concat(excludePaths))} ;
        //Returns a function that can be run as a gulp task
        return cleanFolder;
    } else {
        //Delete all files in dist
        let cleanAll = () => {
            //Paths to files or directories to exclude from cleaning triggered by the initial gulp command
            //Don't forget to add the exclaimation mark before the paths!
            let excludePaths = ['!./dist/images/**/*', '!./dist/images'];
            return del(['./dist/**/*'].concat(excludePaths));
        };
        //Returns a function that can be run as a gulp task
        return cleanAll;
    }
};

//To clear out dist from command line run $ gulp cleanTask
gulp.task('cleanTask', series(clean()) );

// Data to be inserted into HTML file
var includeVariables = {
    "appJsSrc": (minifyScripts)  ? './js/app.min.js' : './js/app.js' //Src attribute for main app script

};

//compiles html files and inserts the template variables
gulp.task('html', function(){
	return gulp.src('app/includes/index.html')
		.pipe(fileInclude({
			prefix: '@@',
			basepath: '@file',
			context: includeVariables
		}))
		// .pipe(htmlreplace({
		// 	css: 'css/styles.min.css'
		// }))
		.pipe(gulp.dest('dist/'));
});



//Used to minify the polyfill, this only needs to be run once, it takes 3 seconds so shouldn't be part of the build every time. Polyfill is kept separate from the app.min.js, so that it is only loaded if it is needed (for IE).
gulp.task('polyfillMinify', () => {
    return browserify('./app/js/babel-polyfill.js', {debug: false})
        .transform('babelify', {
            presets: [
                [ "@babel/preset-env", {
                  "targets": {
                    "browsers": ["ie >= 11" ]
                  }
                }]
              ],
            sourceMaps: false
        })
        .bundle()
        .pipe(source('bable-polyfill.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
});

//Copies the polyfill to the dist/js folder.
const copyPolyfill = () => {
    return gulp.src('./app/js/babel-polyfill.min.js')
        .pipe(gulp.dest('./dist/js'))
}


const scriptFn = function () {
    const bundledScript = browserify({
        entries: './app/js/app.js',
        debug: true})
        .transform('babelify', {
            presets: [
                [ "@babel/preset-env", {
                "targets": {
                    "browsers": ["ie >= 11" ]
                }
                }],
                [ "@babel/preset-react", {
                    "targets": {
                        "browsers": ["ie >= 11" ]
                    }
                }]
            ],
            plugins: ["@babel/plugin-proposal-object-rest-spread"],
            sourceMaps: true

        })
        .bundle()
        .on('error', notify.onError({
            message: "Error: <%= error.message %>",
            title: 'Error in JS 💀'
        }))
        .pipe(source('app.js'))
        .pipe(buffer());
        if (minifyScripts) {
            return bundledScript
            .pipe(rename('app.min.js'))
            .pipe(sourceMaps.init({loadMaps: true}))
            .pipe(uglify())
            .pipe(sourceMaps.write('./'))
            .pipe(gulp.dest('./dist/js'));
        } else {
            return bundledScript.pipe(gulp.dest('./dist/js'));
        }
}


// JS Debug task uses Browserify to compile the app.js without minification
gulp.task('js', scriptFn);

//Sets Node to production environment for React production build
//Note, the basic template app.js file in non-production build is 2.8MB and in prod build, app.min.js is 168KB
gulp.task('apply-prod-environment', function(done) {
    process.stdout.write("Setting NODE_ENV to 'production'" + "\n");
    process.env.NODE_ENV = 'production';
    if (process.env.NODE_ENV != 'production') {
        throw new Error("Failed to set NODE_ENV to production!!!!");
    } else {
        process.stdout.write("Successfully set NODE_ENV to production" + "\n");
    }
    return done();
});

//Compile Sass
gulp.task('styles', ()=> {
    return gulp.src('./app/sass/styles.scss')
        .pipe(sourceMaps.init({loadMaps: true}))
        .pipe(sass().on('error', sass.logError) )
        .pipe(autoprefixer({ browsers: 'last 2 versions' }))
		.pipe(cssnano())
		.pipe(sourceMaps.write('./'))
        .pipe(gulp.dest('dist/css'))
} );


//Starts the browser-sync server
gulp.task('browserSyncInit', function(){
	browserSync.init({
		server: {
			baseDir: './dist'
			//proxy: 'localhost:8888',
			// directory: true
		}
	})
});

//Copies files from app/data to dist/data
//The data folder should be used for any static files that are not images, e.g., JSON, audio, video, etc. You can make separate folders inside the app/data folder for different types of files.
gulp.task('data', () => {
    return gulp.src('./app/data/**/*')
        .pipe(gulp.dest('./dist/data'))
})


//Reloads the browser and ensures that Gulp detects when the task is complete.
gulp.task('bsReload', (done) => {
    browserSync.reload();
    done();
});

// To optimize images and copy images from app to dist folder
//This doesn't run with the default gulp script, run => gulp images to optimize and copy
//****Need to test whether this works with nested folders
gulp.task('images', series(clean('images'), function imageMinTask () {
    return gulp.src('./app/images/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('./dist/images'))
    })
);



gulp.task('watch', () => {
    gulp.watch('./app/sass/**/*.scss', series(clean('css'),  'styles', 'bsReload'));
    gulp.watch('./app/js/**/*.js', series(clean('js'), 'js', 'bsReload' ));
    gulp.watch('./app/includes/**/*.html', series( 'html', 'bsReload'));
    gulp.watch('./app/data/**/*', series( clean('data'), 'data', 'bsReload'));
    //Comment this line in if you want gulp to watch for changes in the images.
    // gulp.watch('./app/images/**', series('images', 'bsReload'));
});



//***GULP DEFAULT TASK***
//Note this task doesn't copy images, to copy and optimize images, run 'gulp images' or 'gulp prod'

gulp.task('default', series(clean(), parallel('styles', 'js', copyPolyfill, 'html', 'data'), parallel('browserSyncInit', 'watch') ) );

//***GULP PROD TASK***
//This task generates production-ready dist folder including image optimization, minified JS, and React production build
gulp.task('prod', series(
    parallel (
        'apply-prod-environment',
        clean(),
        (done) => {
    includeVariables.appJsSrc = './js/app.min.js';
    minifyScripts = true;
    return done();
    }),
    parallel('styles', 'js', copyPolyfill, 'html', 'images', 'data'),
    parallel('browserSyncInit', 'watch')  )
);




///Working on a way to automatically generate React components
gulp.task('createReactComponents', () => {
    const toFillPaths = [
        './app/js/reactComponents/*'

    ];


});
