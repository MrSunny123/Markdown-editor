<style lang="less" scoped>   
    .output{
        height:100%;
        width:50%;
        line-height:1.6;
        background-color:#eee;
        padding: 20px 20px;
        overflow-y: scroll;
        word-wrap: break-word;
    } 
</style>

<template>
	<div class="output" v-html='compiledMd'></div>
</template>

<script>
	export default {
        data () {
            return {
                
            }
        }, 
        computed: {
            compiledMd () {
                return this.$store.getters.compiledMd       
            }
        },	
	}
</script>