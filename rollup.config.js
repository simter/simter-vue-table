import pkg from './package.json';
import vue from 'rollup-plugin-vue';

// see http://vuejs.github.io/rollup-plugin-vue/#/en/2.3/?id=configuration
export default {
  input: 'src/table.vue',
  output: [
    {
      file: pkg.main, format: 'umd', name: pkg.name,
      globals: {
        "simter-vue-colgroup": "simter-vue-colgroup",
        "simter-vue-thead": "simter-vue-thead"
      }
    },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    vue({ compileTemplate: true, css: true })
  ]
};