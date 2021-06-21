const { series, watch, src, dest, parallel } = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");

const start = () => {
  browserSync.init({
    server: {
      injectChanges: true,
      baseDir: "app",
    },
  });
};
const compileSass = () => {
  src("app/scss/*.scss")
    .pipe(sass())
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
};

const watches = () => {
  watch("app/js/*.js").on("change", browserSync.reload);
  watch("app/scss/*.scss").on("change", compileSass);
  watch("app/css/*.css").on("change", browserSync.reload);
  watch("app/index.html").on("change", browserSync.reload);
};

const build = parallel(compileSass, start, series(watches));

exports.default = build;
