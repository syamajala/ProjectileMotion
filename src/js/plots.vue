<template>
  <div id="plots">
  <el-select v-model="value" placeholder="Select">
    <el-option
      v-for="item in options"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>


  </div>
</template>

<script>
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
          value: 'Option1',
      }
    }
  }
</script>

<style>
  #plots {
  height: 25em;
  }
</style>
