import versionNumber from "gulp-version-number";

export const html = () => {
  return (
    app.gulp
      .src(app.path.src.html)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>",
          }),
        ),
      )
      // .pipe(app.plugins.replace(app.plugins.settings.replace.components[0], app.plugins.settings.replace.components[1]))
      .pipe(app.plugins.fileInclude(app.plugins.settings.fileIncludeSettings))
      .pipe(
        app.plugins.if(
          app.isBuild,
          versionNumber({
            value: "%DT%",
            append: {
              key: "_v",
              cover: 0,
              to: ["css", "js"],
            },
            output: {
              file: "gulp/version.json",
            },
          }),
        ),
      )
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browserSync.stream())
  );
};
