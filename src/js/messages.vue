<template>
  <div id="messages">
      <el-select v-model="value" placeholder="Select">
          <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value">
          </el-option>
      </el-select>

      <messagetable v-for="item in options" v-show="value == item.value" :tabledata="item.tabledata">
      </messagetable>
  </div>
</template>

<script>
import messagetable from 'messageTable.vue'

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
            value: 'Option1'
        }
    },
    components: {
        messagetable
    }
}
</script>

<style>
#messages {
    height: 30em;
}
</style>
