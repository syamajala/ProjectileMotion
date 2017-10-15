<template>
  <div id="app">
    <el-col :span="14">
      <el-tabs v-model="activeName" @tab-click="loadTabPlots">
        <el-tab-pane label="Cesium" name="cesium"><cesium></cesium></el-tab-pane>
        <el-tab-pane label="Trajectory" name="trajectory"><tabPlots tab="trajectory"></tabPlots></el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="10" id="content">
        <el-row><dropdownPlots></dropdownPlots></el-row>
        <el-row><tables></tables></el-row>
    </el-col>
  </div>
</template>

<script>
import cesium from 'cesium.vue'
import dropdownPlots from 'dropdownPlots.vue'
import tables from 'tables.vue'

export default {
    data()
    {
        return {
            activeName: 'cesium',
            tabPlots: {'trajectory': true}
        }
    },
    components: {
        cesium,
        dropdownPlots,
        'tabPlots': () => import('tabPlots.vue'),
        tables
    },
    methods: {
        loadTabPlots(tab, event) {
            if (this.tabPlots[tab.name])
            {
                this.$socket.emit('loadTabPlots');
            }
            this.tabPlots[tab.name] = false;
        }
    }
}
</script>

<style>
#app {
    width: 100%;
    height: 100%;
}

.el-tabs__header {
    margin: 0 0 0px;
}
</style>
