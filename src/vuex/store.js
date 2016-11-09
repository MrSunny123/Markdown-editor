import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const highlight = require('highlight.js')
const marked = require('marked')
marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code).value
  }
})

function saveState (state) {
    let Arr = [];
    for (let i=0, len = state.mdList.length; i<len; i++ ){
        Arr.push(state.mdList[i])
    }
    localStorage.setItem('stateArr', JSON.stringify(Arr));   
}

export default new Vuex.Store({
    state: {
        showSideBar: true,
        mdList: [
            {
                content: '# 关于项目 #\n该项目是采用`vue2` + `vuex2` + `marked` + `highlight.js`编写的`Markdown`编辑器;并基于`localStorage`实现了自动保存功能。\n## 当前版本\nV1.0 beta\n## 源码地址\n[https://github.com/MrSunny123/Markdown-editor](https://github.com/MrSunny123/Markdown-editor)',
				active: true
            }
        ]
    },
    mutations: {
        SHOW_SIDE_BAR (state) {
            state.showSideBar = !state.showSideBar
        },
        INPUT_TEXT (state, text) {
            for(let i=0, len=state.mdList.length; i<len; i++){
                if(state.mdList[i].active){
                    state.mdList[i].content = text
                }
            }    
        },
        STORAGE (state) {
            for(let i=0, len=state.mdList.length; i<len; i++){
                if(state.mdList[i].active){
					saveState(state)
                }
            }     
        },
        ADD_MD (state) {
            for(let i=0, len=state.mdList.length; i<len; i++){
                state.mdList[i].active = false
            }
            let newMd = {
                content: '# Untitled #\n',
				active: true
            }
            state.mdList.push(newMd)
        },
        DEL_MD (state, index) {
            if(state.mdList.length > 1){
                state.mdList.splice(index, 1)
                
                let stateArr = JSON.parse(localStorage.getItem('stateArr'))
                stateArr.splice(index, 1)
                localStorage.setItem('stateArr', JSON.stringify(stateArr))

                for (let i = 0, len = state.mdList.length; i < len; i++) {
                    state.mdList[i].active = false
                }
                state.mdList[0].active = true
            }    
        },
        TAB_MD (state, index) {
            for (let i = 0, len = state.mdList.length; i < len; i++) {
                state.mdList[i].active = false
            }
            state.mdList[index].active = true
        },
        READ_STORAGE (state) {
            if(JSON.parse(localStorage.getItem('stateArr'))){
                let stateArr = JSON.parse(localStorage.getItem('stateArr'))
                state.mdList = stateArr
                for (let i = 0, len = state.mdList.length; i < len; i++) {
                    state.mdList[i].active = false
                }
                state.mdList[0].active = true
            }                    
        }
    },
    actions: {
        showSideBar ({ commit }) {
            commit('SHOW_SIDE_BAR')
        },
        inputText ({ commit }, text) {
            commit('INPUT_TEXT', text)    
        },
        storage ({ commit }) {
            commit('STORAGE')
        },
        addMd ({ commit }) {
            commit('ADD_MD')
            commit('STORAGE')
        },
        delMd ({ commit }, index) {
            commit('DEL_MD', index)    
        },
        tabMd ({ commit }, index) {
            commit('TAB_MD', index)    
        },
        readStorage ({ commit }) {
            commit('READ_STORAGE')
        }
    },
    getters: {
        mdList: state => {
            return state.mdList
        },
        rawMd: state => {
            let content = ''
            for(let i =0, len=state.mdList.length; i<len; i++){
                if(state.mdList[i].active){
                    content = state.mdList[i].content
                }
            }
            return content
        },
        compiledMd: (state, getters) => {
			return marked(getters.rawMd)
		}
    }
})