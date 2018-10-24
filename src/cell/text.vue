<template>
<td :class="classes.root || ['text', cfg.class]" :style="styles.root">{{content}}</td>
</template>

<script>
// Literal text cell

import cellBase from "./base";
export default { extends: cellBase };
</script>