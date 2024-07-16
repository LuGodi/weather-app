import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    ignores: [
      "webpack.common.js",
      "webpack.dev.js",
      "webpack.prod.js",
      "src/render_util.js",
    ],
  },
];
