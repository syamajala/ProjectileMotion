<template>
  <div id="plots">
  <el-select v-model="div" placeholder="Select">
    <el-option
      v-for="item in options"
      :label="item.title"
      :value="item.div">
    </el-option>
  </el-select>

  <div v-for="item in options" v-show="div == item.div" :id="item.div"></div>
  </div>
</template>

<script>
import bus from './bus.js'

export default {
    created() {
        var self = this;
        bus.$on('loadPlotData', function(data) {
            self.options = data['options'];
            self.div = data['div'];
        })
    },

    data() {
        return { options: [], div: '' }
    },

    mounted() {
        bus.$emit('loadPlots')

        for(var i = 0; i < this.options.length; i++)
        {
            var elem = this.options[i]
            // Plotly.newPlot(elem.div, elem.data, elem.layout, elem.config)
        }
    }
}
</script>

<style>
  #plots {
  height: 25em;
  }
</style>
