/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

module.exports = function (api) {
  api.compatibleWith("quasar", "^2.0.0");

  if (api.hasVite) {
    api.compatibleWith("@quasar/app-vite", "^1.0.0||^2.0.0");
  } else {
    api.compatibleWith("@quasar/app-webpack", "^3.0.0||^4.0.0");
  }

  api.extendQuasarConf((conf) => {
    // make sure necessary plugins are injected:
    conf.framework.plugins.push("Dialog");
    conf.framework.cssAddon = true;

    // make sure boot file is registered
    conf.boot.push("~quasar-app-extension-rb-ui/src/boot/register.js");

    // make sure boot & component files get transpiled (only for Webpack)
    conf.build?.transpileDependencies?.push(
      /quasar-app-extension-restboard[\\/]src/
    );
  });
};
