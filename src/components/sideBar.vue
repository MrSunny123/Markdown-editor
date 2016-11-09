<style lang="less" scoped>
    .menu{
        height:100%;
        width:240px;
        position: relative;
        float:left;
        border-right:1px solid #bbb;
        background-color:#f5f5f5;
        padding-top:100px;
        .md_list{
            margin-bottom:10px;
            li{
                background-color:#fff;
                height:40px;
                line-height:40px;
                position:relative;
                cursor:pointer;
                &.current{
                    border-left:6px solid #009a61;
                }
                span{
                    display:inline-block;
                    padding:0 12px;
                    font-size:14px;
                    width:100%;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    font-weight: 600;
                }
                .del_btn{
                    position:absolute;
                    top: 0;
                    right: 0;
                    height: 100%;
                    padding:8px 4px;
                    display:none;
                    color:#333;
                    &:hover{
                        color:#009a61;
                    }
                }
                &:hover{
                    background-color:#f5f5f5;
                    color:#333;
                    .del_btn{
                        display:block;
                    }
                }
            }
        }
        .add_btn{
            display:block;
            text-align:center;
            background-color:#42b983;
            border-radius:3px;
            padding:4px 0;
            &:hover{
                background-color:#009a61; 
            }
            .icon-tianjia{
                font-size:22px;
                color:#fff;
            }
        }
    }
    ul, ol, li{
        list-style:none;
        margin:0px;
        padding:0px;
    }
</style>

<template>
	<div class="menu">  
        <ul class="md_list">
            <li v-for="(md, index) in mdList" :class="{current: md.active}">
                <span @click='tabMd(index)'>{{md.content.split('#')[1]}}</span>
                <a class="del_btn" href="javascript:;" @click='delMd(index)'>
                    <i class="iconfont icon-shanchu"></i>
                </a>
            </li>
        </ul>
        <a class="add_btn" href="javascript:;" @click='addMd'>
            <i class="iconfont icon-tianjia"></i>
        </a>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                
            }
        },
        computed: {
            mdList () {
                return this.$store.getters.mdList
            }
        },
        methods: {
            addMd () {
                this.$store.dispatch('addMd')
            },
            delMd (index) {
                this.$store.dispatch('delMd', index)    
            },
            tabMd (index) {
                this.$store.dispatch('tabMd', index)
            }
        }
    }   
</script>