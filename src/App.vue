<style lang="less" scoped>
    .md_editor{
        position: relative;
        left: -240px;
        height:100%;
        transition: all ease .5s;
        &.show_sidebar{
            left:0;
            .main{
                section{
                    padding-right:240px;
                }
            }
        }
        .main{
            margin-left: 240px;
            width: 100%;
            height: 100%;
            background-color: #fff;
            section{
                height:100%;
                padding-right:0;
                display: flex;
                justify-content: center;
                transition: all ease .5s;
            }               
        }
    }
</style>

<template>
    <div class="md_editor" :class="{show_sidebar: showSideBar}">
        <side-bar></side-bar>
        <div class="main">
            <nav-bar></nav-bar>
            <section>
                <editor></editor>
                <outputer></outputer>
            </section>
        </div>
    </div>
</template>

<script>
    import editor from './components/editor.vue'
    import navBar from './components/navBar.vue'
    import outputer from './components/outputer.vue'
    import sideBar from './components/sideBar.vue'

    export default {
        components: {
            editor,
            navBar,
            outputer,
            sideBar
        },
        mounted () {
            this.$store.dispatch('readStorage')
        },
        computed: {
            showSideBar () {
                return this.$store.state.showSideBar
            }
        }
    }
    
</script>