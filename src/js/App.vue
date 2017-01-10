<template>
  <div id="app">
    <el-col :span="16">
      <el-tabs v-model="activeName">
        <el-tab-pane label="Cesium" name="first"><cesium></cesium></el-tab-pane>
        <el-tab-pane label="Plots" name="second">Plots</el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="8">
      <el-row>hi</el-row>
      <el-row>bye</el-row>
    </el-col>
  </div>
</template>

<script>
import cesium from './cesium.vue'
export default {
    data()
    {
        return {
            activeName: 'first'
        }
    },
    components: {
        cesium
    }
}
</script>
