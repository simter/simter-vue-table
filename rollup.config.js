import pkg from './package.json';
import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';

let banner = `/*!
* ${pkg.name} v${pkg.version}
* @author RJ.Hwang <rongjihuang@gmail.com>
* @license MIT
*/`

// see http://vuejs.github.io/rollup-plugin-vue/#/en/2.3/?id=configuration
export default {
  input: 'src/table.vue',
  external: ['vue'],
  output: [
    { file: pkg.main, format: 'umd', name: pkg.name, banner: banner, exports: "named"},
    { file: pkg.module, format: 'es', banner: banner, exports: "named" }
  ],
  plugins: [
    resolve(),
    vue({ compileTemplate: true, css: false })
  ]
};