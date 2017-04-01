<template>
    <div class="tab_plots">
        <div v-for="item in options" :id="item.div"></div>
    </div>
</template>

<script>
import bus from './bus.js'

export default {
    created() {
        var self = this;
        bus.$on('loadTabPlots', function(data) {
            if (data['tab'] == self.tab) {
                self.options = data['options']
                self.plots = data['data']
                self.build_plots = true;
            }
        })
    },

    data() {
        return  { options: [] }
    },

    updated() {
        var Plotly = required('plotly.js/dist/plotly.min.js')
        if(this.build_plots) {
            for(var i = 0; i < this.plots.length; i++)
            {
                var elem = JSON.parse(this.plots[i])
                Plotly.newPlot(elem.div, elem.data, elem.layout, elem.config)
            }
            this.build_plots = false;
        }
    },

    props: ['tab']
}
</script>

<style>
</style>
