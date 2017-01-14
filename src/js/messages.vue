<template>
  <div id="messages">
    <el-select v-model="value" placeholder="Select">
    <el-option
      v-for="item in options"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

  <div v-if="value == 'Option1'"><messagetable></messagetable></div>
  <div v-else-if="value == 'Option2'">option2</div>
  </div>
</template>

<script>
import messagetable from './messageTable.vue'

export default {
    data() {
        return {
            options: [{
                value: 'Option1',
                label: 'Option1'
            }, {
                value: 'Option2',
                label: 'Option2'
            }, {
                value: 'Option3',
                label: 'Option3'
            }, {
                value: 'Option4',
                label: 'Option4'
            }, {
                value: 'Option5',
                label: 'Option5'
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
  height: 25em;
  }
</style>
