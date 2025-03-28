import replace from "gulp-replace";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browserSync from "browser-sync";
import rename from "gulp-rename";
import newer from "gulp-newer";
import ifPlugin from "gulp-if";
import fileInclude from "gulp-file-include";

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browserSync: browserSync,
  rename: rename,
  newer: newer,
  if: ifPlugin,
  fileInclude: fileInclude,

  settings: {
    replace: {
      components: ["$$components", "./src/components/"],
    },
    fileIncludeSettings: {
      prefix: "@@",
      basepath: "@file",
      context: {
        main: true,
        about: true,
      }
    },
  },
};
