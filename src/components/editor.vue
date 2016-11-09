<style lang="less" scoped>
	.input{
		width:50%;
		height:100%;
		border-right:1px solid #bbb;
		textarea{
			height: 100%;
    		width: 100%;
			vertical-align: top;
			padding: 50px 20px 20px;
			resize: none;
			border: none;
			background-color: #fff;
			outline: none;
			font-family: inherit;
			font-size: 14px;
			transition: all ease .3s;  
		}
	}
</style>

<template>
	<div class="input">
		<textarea id="editor" :value='rawMd' @input='input($event)' autofocus></textarea>
	</div>
</template>

<script>
	export default {
        data () {
            return {
                
            }
        },
        computed: {
            rawMd () {
                return this.$store.getters.rawMd
            }    
        },
        methods: {
            input (event) {
                this.$store.dispatch('inputText', event.target.value)
                this.$store.dispatch('storage')
            }
        }
	}
</script>