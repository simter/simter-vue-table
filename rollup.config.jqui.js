import pkg from './package.json';
import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';

const integrationName = `${pkg.name}-integration-jquery-ui`;
let banner = `/*!
* ${integrationName} v${pkg.version}
* @author RJ.Hwang <rongjihuang@gmail.com>
* @license MIT
*/`

// see http://vuejs.github.io/rollup-plugin-vue/#/en/2.3/?id=configuration
export default {
  input: 'src/integration/jquery-ui.js',
  output: [
    {
      file: `dist/${integrationName}.js`, format: 'umd', name: integrationName, banner: banner,
    },
    { file: `dist/${integrationName}.esm.js`, format: 'es', banner: banner }
  ],
  plugins: [
    resolve(),
    vue({ compileTemplate: true, css: false })
  ]
};