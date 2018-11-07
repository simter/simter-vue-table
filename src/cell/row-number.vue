<template>
<span>{{groupRow ? rowIndex - groupRow.rowIndex : rowIndex + 1}}</span>
</template>

<script>
// show row number cell

import cellBase from "./base";
export default { extends: cellBase };
</script>