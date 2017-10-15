<template>
    <div id="comments">
        <h2>Comments</h2>
        <div id="comment" v-for="comment in comments" :key="comment.id">
            {{ comment.body }}
            <br>
            {{ comment.author}}
            {{ comment.date }}
        </div>
        <el-input type="textarea" v-model="textarea"></el-input>
        <el-button type="primary">Submit</el-button>
    </div>
</template>

<script>

export default {
    data()
    {
        return {
            textarea: '',
            comments: [{ body: 'this is a test comment', author:'test user', date:'Oct 15, 2017'}]
        }
    }
}
</script>

<style>
#comments {
    z-index: 1;
    position: absolute;
    width: 100%;
    top: 2.25em;
    background-color: white;
}
</style>
