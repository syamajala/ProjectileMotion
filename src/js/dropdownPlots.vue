<template>
    <div class="dropdown_plots">
        <el-select v-model="div" placeholder="Select" :disabled="comments">
            <el-option
                v-for="item in options"
                :label="item.title"
                :value="item.div"
                :key="item.id">
            </el-option>
        </el-select>

        <el-button @click="showComments">Comments</el-button>

        <div v-for="item in options" v-show="div == item.div" :id="item.div" :key="item.id" class="plots"></div>
        <comments v-show="comments"></comments>

    </div>
</template>

<script>
import comments from 'comments.vue'

export default {
    created() {
        this.$options.sockets.loadDropdownPlots = (data) => {
            data = JSON.parse(data);
            this.options = data['options'];
            this.div = data['div'];
            this.plots = data['data'];
            this.build_plots = true;
        };

        this.$socket.emit('loadDropdownPlots');
    },

    data() {
        return { options: [], div: '', comments: false }
    },

    updated() {
        const Plotly = require('plotly.js/dist/plotly.min.js')
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
    }
}
</script>

<style>
.plots {
    height: 50vh;
    margin-bottom: 3em;
}
</style>
