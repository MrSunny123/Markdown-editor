<style lang="less" scoped>
    nav{
        height:40px;
        width:100%;
        background-color:#42b983;
        border-bottom: 1px solid #bbb;
        position:absolute;
        top:0;
        z-index:20;
        ul{
            font-size:0;
            height:40px;
            li{
                display:inline-block;
                position:relative;
                line-height:39px;
                height:40px;
                cursor:pointer;
                &:first-child{
                    border-right:2px solid #009a61;
                }
                &:nth-last-child(2){
                    border-left:2px solid #009a61;
                }
                &:hover{
                    background-color:#009a61;
                    &:before{
                        content:attr(data-tooltip);
                        background-color:#555;
                        color:#fff;
                        font-size:14px;
                        line-height:2;
                        position: absolute;
                        padding:4px 6px;
                        left:10%;
                        top:45px;
                        white-space:pre;
                        border-radius:3px;
                    }
                    &:after{
                        content: "";
                        position: absolute;
                        left:33%;
                        top:30px;
                        width:0;
                        height:0;
                        border-right: 8px solid transparent;
                        border-top: 8px solid transparent;
                        border-bottom:8px solid #555;
                        border-left:8px solid transparent;
                    }
                }
                .iconfont{
                    color:#fff;
                    padding:12px;
                }
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
	<nav>
        <ul>
            <li @click='showSideBar' data-tooltip="侧边栏"><i class="iconfont icon-cebianlan"></i></li>
            <li @click='insert("**加粗文字**")' data-tooltip="加粗"><i class="iconfont icon-jiacu"></i></li>
            <li @click='insert("*斜体文字*")' data-tooltip="斜体"><i class="iconfont icon-xieti"></i></li>
            <li @click='insert("[链接描述](http://link.com/)")' data-tooltip="插入链接"><i class="iconfont icon-lianjie"></i></li>
            <li @click='insert("\n\n> ")' data-tooltip="引用"><i class="iconfont icon-yinyong"></i></li>
            <li @click='insert("`请输入代码`")' data-tooltip="代码"><i class="iconfont icon-daima"></i></li>
            <li @click='insert("![Img](http://image.com/)")' data-tooltip="插入图片"><i class="iconfont icon-tupian"></i></li>
            <li @click='insert("\n## 标题文字")' data-tooltip="标题"><i class="iconfont icon-icon12"></i></li>
            <!--<li @click='inster("`请输入代码`")' data-tooltip="有序列表"><i class="iconfont icon-youxuliebiao"></i></li>-->
            <li @click='insert("\n* ")' data-tooltip="无序列表"><i class="iconfont icon-wuxuliebiao1"></i></li>
            <li @click='insert("\n\n| title | title | title |\n| --- | --- | --- |\n| item | item | item |")' data-tooltip="表格"><i class="iconfont icon-tables-copy"></i></li>
            <li @click='insert("\n\n******\n\n")' data-tooltip="分割线"><i class="iconfont icon-hr"></i></li>
            <li @click='openLink("http://www.markdown.cn")' data-tooltip="Markdown语法"><i class="iconfont icon-md"></i></li>
            <li @click='openLink("https://github.com/MrSunny123/Markdown-editor")' data-tooltip="项目地址"><i class="iconfont icon-githubsquare"></i></li>
        </ul>
    </nav>
</template>

<script>
    function addContent (editor, oldContent, newContent, content, startPosition, start, end){
        newContent = oldContent.substring(0, startPosition) + content + oldContent.substring(startPosition, oldContent.length)
        editor.value = newContent
        editor.setSelectionRange(startPosition + start, startPosition + content.length - end)
        return newContent
    }

    function addCode (editor, oldContent, newContent, content, startPosition){
        let cv = oldContent.substring(0, startPosition)
        let cl = cv.split('\n').length - 1
        let clv = oldContent.split('\n')[cl]
        if(clv.replace(/\s+/g,"")){
            content = '`请输入代码`'
            newContent = oldContent.substring(0, startPosition) + content + oldContent.substring(startPosition, oldContent.length)
            editor.value = newContent
            editor.setSelectionRange(startPosition + 1, startPosition + content.length - 1)    
        }else{
            content = '\n```\n请输入代码\n```'
            newContent = oldContent.substring(0, startPosition) + content + oldContent.substring(startPosition, oldContent.length)
            editor.value = newContent
            editor.setSelectionRange(startPosition + 5, startPosition + content.length - 4)
        }
        return newContent
    }

    function replaceContent (editor, oldContent, newContent, startPosition, endPosition, symbol1, symbol2) {
        symbol1 = symbol1 || ''
        symbol2 = symbol2 || ''
        let symLen1 = symbol1.length
        let symLen2 = symbol2.length
        newContent = oldContent.substring(0, startPosition) + symbol1 + oldContent.substring(startPosition, endPosition) + symbol2 + oldContent.substring(endPosition, oldContent.length)
        editor.value = newContent
        editor.setSelectionRange(startPosition + symLen1, endPosition + symLen1)
        return newContent
    }

	export default {
        methods: {
            showSideBar () {
                this.$store.dispatch('showSideBar')    
            },
            openLink (url) {
				window.open(url, '_blank')
			},
            insert (content) {
                let editor = document.querySelector('#editor')
                let startPosition = editor.selectionStart
                let endPosition = editor.selectionEnd
                let oldContent = editor.value
                let newContent = ''
                
                if(startPosition === endPosition){
                    switch (content){
                        case '**加粗文字**':
						    newContent = addContent(editor, oldContent, newContent, content, startPosition, 2, 2)
							break
                        case '*斜体文字*':
						    newContent = addContent(editor, oldContent, newContent, content, startPosition, 1, 1)
							break
                        case '[链接描述](http://link.com/)':
                            newContent = addContent(editor, oldContent, newContent, content, startPosition, 7, 1)
                            break
                        case '![Img](http://image.com/)':
                            newContent = addContent(editor, oldContent, newContent, content, startPosition, 7, 1)
                            break
                        case '`请输入代码`':
						    newContent = addCode(editor, oldContent, newContent, content, startPosition)
							break
                        default:
							newContent = oldContent.substring(0, startPosition) + content + oldContent.substring(startPosition, oldContent.length)
                            editor.value = newContent
							break                            
                    }
                } else {
                    switch (content){
                        case '**加粗文字**':
						    newContent = replaceContent (editor, oldContent, newContent, startPosition, endPosition, '**', '**')
							break
                        case '*斜体文字*':
						    newContent = replaceContent (editor, oldContent, newContent, startPosition, endPosition, '*', '*')
							break
                        case '[链接描述](http://link.com/)':
                            newContent = replaceContent (editor, oldContent, newContent, startPosition, endPosition, '[', '](http://link.com/)')
                            break
                        case '![Img](http://image.com/)':
                            newContent = replaceContent (editor, oldContent, newContent, startPosition, endPosition, '![', '](http://link.com/)')
                            break
                        case '`请输入代码`':
						    newContent = replaceContent (editor, oldContent, newContent, startPosition, endPosition, '`', '`')
							break
                        case '\n* ':
						    newContent = replaceContent (editor, oldContent, newContent, startPosition, endPosition, '\n* ', '')
							break
                        case '\n\n> ':
						    newContent = replaceContent (editor, oldContent, newContent, startPosition, endPosition, '\n> ', '')
							break
                        default:
							return false
							break                            
                    }
                }

                editor.focus()

                if (newContent.length) {
					this.$store.dispatch('inputText', newContent)
				}  
            }
        }	
    }
</script>