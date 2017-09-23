<template>
    <div class="tab_plots">
        <div v-for="item in options" :id="item.div"></div>
    </div>
</template>

<script>
export default {
    created() {
        this.$options.sockets.loadTabPlots = (data) => {
            data = JSON.parse(data);
            if (data['tab'] == this.tab)
            {
                this.options = data['options'];
                this.plots = data['data'];
            }
        };
    },

    data() {
        return  { options: [], build_plots: true }
    },

    updated() {
        const Plotly = require('plotly.js/dist/plotly.min.js');
        if(this.build_plots)
        {
            for(let i = 0; i < this.plots.length; i++)
            {
                const elem = this.plots[i];
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
