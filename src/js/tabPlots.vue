<template>
    <div class="tab_plots">
        <div v-for="item in options" :id="item.div"></div>
    </div>
</template>

<script>
import bus from './bus.js'

export default {
    created() {
        bus.$on('loadTabPlots', (data) => {
            if (data['tab'] == this.tab)
            {
                this.options = data['options'];
                this.plots = data['data'];
                this.build_plots = true;
            }
        })
    },

    data() {
        return  { options: [] }
    },

    updated() {
        var Plotly = required('plotly.js/dist/plotly.min.js');
        if(this.build_plots)
        {
            for(var i = 0; i < this.plots.length; i++)
            {
                var elem = this.plots[i];
                Plotly.newPlot(elem.div, elem.data, elem.layout, elem.config);
            }
            this.build_plots = false;
        }
    },

    props: ['tab']
}
</script>

<style>
</style>
