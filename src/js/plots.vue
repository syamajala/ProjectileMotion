<template>
  <div id="plots">
  <el-select v-model="div" placeholder="Select">
    <el-option
      v-for="item in options"
      :label="item.title"
      :value="item.div">
    </el-option>
  </el-select>

  <div v-for="item in options" v-show="div == item.div" :id="item.div"></div>
  </div>
</template>

<script>
import bus from './bus.js'

export default {

    data() {

    }
}
</script>

<style>
  #plots {
  height: 25em;
  }
</style>
