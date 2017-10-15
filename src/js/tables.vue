<template>
  <div id="tables">
      <el-select v-model="value" placeholder="Select" :disabled="comments">
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value"
            :key="item.id">
          </el-option>
      </el-select>

      <el-button @click="showComments">Comments</el-button>

      <el-table v-for="item in options" v-show="value == item.value" :data="item.tabledata.data"
                :key="item.id" height="350" border style="width: 100%">
          <el-table-column v-for="column in item.tabledata.columns" :prop="column.prop" :label="column.label"
                           :width="column.width ? column.width : null" :key="column.id">
          </el-table-column>
      </el-table>

      <comments v-show="comments"></comments>

  </div>
</template>

<script>
import comments from 'comments.vue'

export default {
    data() {
        return {
            options: [{
                value: 'Option1',
                label: 'Option1',
                tabledata: {
                    columns: [{
                        prop: 'date',
                        label: 'Date',
                        width: 180
                    }, {
                        prop: 'name',
                        label: 'Name',
                        width: 180
                    }, {
                        prop: 'address',
                        label: 'Address',
                    }],
                    data: [{
                        date: '2016-05-03',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles'
                    }]
                }
            }],
            value: 'Option1',
            comments: false
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
#tables {
    height: 50vh;
}
</style>
