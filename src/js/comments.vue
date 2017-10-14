<template>
  <div id="comments">
    <el-input type="textarea" v-model="textarea"></el-input>
  </div>
</template>

<script>

export default {
    data()
    {
        return {
            textarea: ''
        }
    }
}
</script>

<style>
#comments {
    z-index: 2;
}
</style>
