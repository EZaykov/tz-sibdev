const tsConfigReader = require('tsconfig');
const tsConfigPaths = require("tsconfig-paths");

const tsConfig = tsConfigReader.loadSync("./tsconfig.json").config;

function formatPaths(){
  const newPaths = {};
  for (const [ key, paths ] of Object.entries(tsConfig.compilerOptions.paths))
    newPaths[key] = paths.map(path => path.replace('src', 'dist'));
  return newPaths;
}

tsConfigPaths.register({
  baseUrl: tsConfig.compilerOptions.baseUrl,
  paths: formatPaths()
});
