<template>
    <div class="tabPlots">
        <div v-for="item in options" :id="item.div" :key="item.id">
            <div id="commentButton">
                <el-button @click="showComments">Comments</el-button>
                <comments v-show="comments"></comments>
            </div>
        </div>
    </div>
</template>

<script>
import comments from 'comments.vue'

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
        return  { options: [], build_plots: true, comments: false }
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

    methods: {
        showComments: function() {
            return (this.comments = !this.comments);
        }
    },

    components: {
        comments
    },

    props: ['tab']
}
</script>

<style>
#commentButton {
    z-index: 1;
    position: absolute;
    top: 0em;
    width: 100%;
}
</style>
