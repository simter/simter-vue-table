<template>
<td :class="classes.root || ['html', cfg.class]" :style="styles.root" v-html="content"></td>
</template>

<script>
// Html cell

import cellBase from "./base";
export default { extends: cellBase };
</script>