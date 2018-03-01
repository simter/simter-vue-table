import Vue from 'vue'
import example1 from './example1.vue'
import example2 from './example2.vue'
import example3 from './example3.vue'

new Vue({
  el: "#sample1",
  render: h => h(example1)
})

new Vue({
  el: "#sample2",
  render: h => h(example2)
})

new Vue({
  el: "#sample3",
  render: h => h(example3)
})