<template>
  <div id="app">
    <el-tabs v-model="activeName">
      <el-tab-pane label="Plots" name="first"></el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
export default {
    data()
    {
        return {
            activeName: 'first'
        }
    },
    components: {
        plots,
        messages
    }
}
</script>

<style>
  .el-tabs__header {
  margin: 0 0 0px;
  }
</style>
