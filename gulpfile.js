const URL = process.env.APP_ENV_URL || 'rp'
const path = require('path')

const gulp = require('gulp')
const del = require('del')

/*유틸*/
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const imageMin = require('gulp-imagemin')
const changed = require('gulp-changed')

/*scss, css*/
const sass = require('gulp-sass')(require('sass'))
// sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer')
const modifyCssUrls = require('gulp-modify-css-urls')
const pxtorem = require('gulp-pxtorem')

/* include */
const fileInclude = require('gulp-file-include')

/*오류 처리*/
const plumber = require('gulp-plumber')

/* babel */
const babel = require('gulp-babel')
const BABEL_POLYFILL = './node_modules/@babel/polyfill/browser.js'

/* Folder */
//console.log(1111, path.resolve(__dirname, 'wwwroot'));
//const autoprefixBrowsers = ['> 0%', 'last 4 versions'];
const ROOT = `./webapp/`
const SRC = ROOT + `src/${URL}/`
const DIST = ROOT + `dist/${URL}/`

const dir = {
  src: {
    html: SRC + 'html/',
    sass: SRC + 'assets/sass/',
    js: SRC + 'assets/js/',
    ts: SRC + 'assets/ts/',
    images: SRC + 'assets/images/',
    fonts: SRC + 'assets/fonts/',
    json: SRC + 'assets/json/'
  },
  dist: {
    html: DIST + 'html/',
    css: DIST + 'assets/css/',
    js: DIST + 'assets/js/',
    build: DIST + 'assets/js/build/',
    bundle: DIST + 'assets/js/bundle/',
    images: DIST + 'assets/images/',
    fonts: DIST + 'assets/fonts/'
  }
}

/* view server */
const browserSync = require('browser-sync').create()

/* errorHandle */
const errorHandler = (error) => {
  console.error(error.message)
  this.emit('end')
}
const plumberOption = {
  errorHandler: errorHandler
}

/* babel */
gulp.task('babel', () =>
  gulp
    .src([dir.src.js + '**/*.js', BABEL_POLYFILL], {allowEmpty: true})
    .pipe(plumber(plumberOption))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(babel())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dir.dist.js))
    .pipe(browserSync.reload({stream: true}))
)
gulp.task('babelMin', () =>
  gulp
    .src([dir.src.js + '**/*.js'], {allowEmpty: true})
    .pipe(plumber(plumberOption))
    .pipe(babel())
    .pipe(uglify())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest(dir.dist.js))
)

/* task 묶어서 실행 */
gulp.task('script', gulp.series('babel', 'babelMin'))

/* file include */
gulp.task('fileInclude', () =>
  gulp
    .src([dir.src.html + '**/*.html', '!' + dir.src.html + 'include/*.html'])
    //.pipe(plumber(plumberOption))
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: '@file'
      })
    )
    .pipe(gulp.dest(dir.dist.html))
    .pipe(browserSync.reload({stream: true}))
)

/* file include */
gulp.task('index', () =>
  gulp
    .src(dir.src.html + '/index.html')
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: '@file'
      })
    )
    .pipe(gulp.dest(dir.dist.html))
    .pipe(browserSync.reload({stream: true}))
)

/* sass: sass컴파일러, px-->rem, autoprefixer */
gulp.task('sass', () =>
  gulp
    .src([dir.src.sass + '**/*.sass', dir.src.sass + '**/*.scss'])
    .pipe(plumber(plumberOption))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(
      sass({
        outputStyle: 'expanded', //[expanded, compressed]
        indentType: 'tab',
        indentWidth: 1
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        //browsers: autoprefixBrowsers,
        cascade: true
      })
    )
    //.pipe(concat('UI.bundle.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dir.dist.css))
    .pipe(browserSync.reload({stream: true}))
)

gulp.task('sassMin', () =>
  gulp
    .src([dir.src.sass + '**/*.sass', dir.src.sass + '**/*.scss'])
    .pipe(plumber(plumberOption))
    //.pipe(sourcemaps.init({loadMaps: true}))
    .pipe(
      sass({
        outputStyle: 'compressed' //[expanded, compressed]
        //indentType: 'tab',
        //indentWidth: 1,
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        //browsers: autoprefixBrowsers,
        cascade: true
      })
    )
    //.pipe(concat('UI.bundle.css'))
    //.pipe(sourcemaps.write('./maps'))
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest(dir.dist.css))
)

/* task 묶어서 실행 */
gulp.task('style', gulp.series('sass', 'sassMin'))

/* imgMin */
gulp.task('imgMin', () =>
  gulp
    .src([dir.src.images + '**/*.jpg', dir.src.images + '**/*.gif', dir.src.images + '**/*.png'])
    .pipe(changed(dir.dist.images))
    // .pipe(imageMin())
    .pipe(gulp.dest(dir.dist.images))
    .pipe(browserSync.reload({stream: true}))
)

gulp.task('imgMove', () =>
  gulp
    // .src(dir.src.images + 'svg/*.*')
    // .pipe((gulp.dest(dir.dist.images + 'svg/')))
    .src([dir.src.images + '/**/*.svg', dir.src.images + '/**/*.mp4', dir.src.images + '/**/*.ico'], {allowEmpty: true})
    .pipe(gulp.dest(dir.dist.images))
    .pipe(browserSync.reload({stream: true}))
)

/* task 묶어서 실행 */
gulp.task('images', gulp.series('imgMin', 'imgMove'))

/* fileMove */
gulp.task('fileMove', () => {
  return new Promise((resolve) => {
    gulp.src(SRC + 'coding_list/**/*.*').pipe(gulp.dest(DIST + 'coding_list/'))

    gulp.src(SRC + 'assets/lib/**/*.*').pipe(gulp.dest(dir.dist.js + 'lib/'))

    gulp.src(dir.src.fonts + '**/*.*').pipe(gulp.dest(dir.dist.fonts))

    gulp.src(dir.src.json + '**/*.*').pipe(gulp.dest(dir.dist.js + 'json/'))

    resolve()
  })
})

/* fileClean */
gulp.task('fileClean', () =>
  del([dir.dist.html, dir.dist.css, dir.dist.js, dir.dist.images, dir.dist.fonts, dir.dist.bundle, dir.dist.build], {
    force: true
  })
)

/* removeMap */
gulp.task('removeMap', () => del([dir.dist.js + '**/*.map', dir.dist.css + 'maps/'], {force: true}))

/* watch: 소스 옵져빙(소스변경 감지해서 task실행및 서버 재시작) */
gulp.task('watch', () => {
  browserSync.init({
    //logLevel: 'debug',
    port: 3003,
    open: false,
    directory: true,
    server: DIST,
    browser: 'google chrome'
  })

  // watch html
  gulp.watch(dir.src.html + '**/*.html', gulp.series('fileInclude'))

  gulp.watch(dir.src.html + '/index.html', gulp.series('index'))

  // watch ts
  gulp.watch(dir.src.js + '**/*.js', gulp.series('babel'))

  // watch sass
  gulp.watch([dir.src.sass + '**/*.sass', dir.src.sass + '**/*.scss'], gulp.series('sass'))

  // watch images
  gulp.watch(dir.src.images, gulp.series('images'))

  // watch html
  //gulp.watch(`${BASE_URL}/**/*.html`).on('change', browserSync.reload);
})

gulp.task('default', gulp.series('fileClean', 'fileInclude', 'index', 'fileMove', 'images', 'sass', 'babel', 'watch'))

gulp.task(
  'build',
  gulp.series('fileClean', 'fileInclude', 'index', 'fileMove', 'images', 'style', 'script', 'removeMap')
)
