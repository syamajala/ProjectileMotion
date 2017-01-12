<template>
  <div id="app">
    <el-col :span="16">
      <el-tabs v-model="activeName">
        <el-tab-pane label="Cesium" name="first"><cesium></cesium></el-tab-pane>
        <el-tab-pane label="Plots" name="second"></el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="8">
      <el-row><plots></plots></el-row>
      <el-row><messages></messages></el-row>
    </el-col>
  </div>
</template>

<script>
import cesium from './cesium.vue'
import plots from './plots.vue'
import messages from './messages.vue'

export default {
    data()
    {
        return {
            activeName: 'first'
        }
    },
    components: {
        cesium,
        plots,
        messages
    }
}
</script>

