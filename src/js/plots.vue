<template>
  <div id="plots">
  <el-select v-model="div" placeholder="Select">
    <el-option
      v-for="item in options"
      :label="item.title"
      :value="item.div">
    </el-option>
  </el-select>

  <div v-for="item in options" v-show="div == item.div" :id="item.div" class="plot"></div>
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
            self.plots = data['data']
            self.build_plots = true;
        })

        bus.$emit('loadPlots')
    },

    data() {
        return { options: [], div: '' }
    },

    updated() {
        var Plotly = require('../node_modules/plotly.js/dist/plotly.min.js')
        if(this.build_plots) {
            for(var i = 0; i < this.plots.length; i++)
            {
                var elem = JSON.parse(this.plots[i])
                Plotly.newPlot(elem.div, elem.data, elem.layout, elem.config);
            }
            this.build_plots = false;

        }
    }
}
</script>

<style>
#plots {
    height: 25em;
}

.plot {
    height: 25em;
}
</style>
