<template>
  <el-table
      :data="tabledata.data"
      height="350"
      border
      style="width: 100%">
      <el-table-column v-for="column in tabledata.columns" :prop="column.prop" :label="column.label"
                       :width="column.width ? column.width : null">
      </el-table-column>
  </el-table>
</template>

<script>
    export default {
        props: ['tabledata'],
    }
</script>
