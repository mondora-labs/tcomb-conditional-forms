var browserSync = require("browser-sync");
var gulp        = require("gulp");
var rename      = require("gulp-rename");
var mocha       = require("gulp-spawn-mocha");
var watch       = require("gulp-watch");
var webpack     = require("gulp-webpack");

/*
*   Task to run unit tests
*/
gulp.task("tests", function () {
    var runTests = function () {
        gulp.src(["./tests/unit/**/*.jsx", "./tests/unit/**/*.js"])
            .pipe(mocha({
                compilers: ".:./tests/compiler.js",
                reporter: "mochawesome",
                noExit: true,
                env: {
                    NODE_PATH: "./src/",
                    MOCHAWESOME_REPORTDIR: "./builds/tests/",
                    MOCHAWESOME_REPORTNAME: "index"
                }
            }))
            .on("error", function (ignore) {
                // Failing tests count as errors, ignore them
            })
            .pipe(reload({stream: true}));
    };
    watch([
        "./src/**/*.jsx",
        "./src/**/*.js",
        "./tests/unit/**/*.jsx",
        "./tests/unit/**/*.js"
    ], runTests);
    runTests();
});

/*
*   Task to run the example
*/
gulp.task("example", function () {
    var buildHtml = function () {
        gulp.src("./example/main.html")
            .pipe(rename("index.html"))
            .pipe(gulp.dest("./builds/example/"))
            .pipe(reload({stream: true}));
    };
    var buildJs = function () {
        return gulp.src("./example/main.jsx")
            .pipe(webpack({
                module: {
                    loaders: [{
                        test: /\.jsx$/,
                        loader: "jsx-loader"
                    }]
                },
            }))
            .pipe(rename("app.js"))
            .pipe(gulp.dest("./builds/example/assets/js/"))
            .pipe(reload({stream: true}));
    };
    watch("./example/main.html", buildHtml);
    buildHtml();
    watch("./example/main.jsx", buildJs);
    buildJs();
});

/*
*   Task to setup the development server
*/
var reload = browserSync.reload;
gulp.task("serve", function() {
    browserSync({
        server: {
            baseDir: "./builds/",
            directory: true
        },
        port: 8080,
        ghostMode: false,
        injectChanges: false,
        notify: false
    });
});

/*
*   Default task
*/
gulp.task("default", ["tests", "example", "serve"]);
