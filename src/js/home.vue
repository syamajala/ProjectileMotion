<template>
  <div id="app">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          hi
      </div>
  </div>
</template>

<script>
export default {

    data()
    {
        return {
            activeName: 'first',
            data: [],
            busy: false,
            count: 0
        }
    },

    methods: {
        loadMore: function() {
            this.busy = true;

            setTimeout(() => {
                for (var i = 0, j = 10; i < j; i++) {
                    this.data.push({ name: this.count++ });
                }
                this.busy = false;
            }, 1000);
        }
    }
}
</script>

<style>
  .el-tabs__header {
  margin: 0 0 0px;
  }
</style>
