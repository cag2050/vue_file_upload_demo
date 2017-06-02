<template lang="jade">
div
    vue-file-upload(url='https://upload.qbox.me',
      ref="vueFileUploader",
      v-bind:filters = "filters",
      v-bind:events = 'cbEvents',
      v-bind:request-options = "reqopts",
      v-on:onAdd = "onAddItem")
    table
      thead
        tr
          th name
          th size
          th progress
          th status
          th action
      tbody
        tr(v-for='file in files')
          td(v-text='file.name')
          td(v-text='file.size')
          td(v-text='file.progress')
          td(v-text='onStatus(file)')
          td
            button(type='button',@click="uploadItem(file)") 上传
    // button(type='button',@click="uploadAll") 上传所有文件
    button(type='button',@click="clearAll") 清空文件列表
</template>
<script>
import VueFileUpload from 'vue-file-upload'
import config from '../config/config'

export default{
    components: {
        VueFileUpload
    },
    data () {
        return {
            files: [],
            // 文件过滤器，只能上传图片
            filters: [
                // {
                    // name: 'imageFilter',
                    // fn (file) {
                        // var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|'
                       //  return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1
                    // }
                // }
            ],
            // 回调函数绑定
            cbEvents: {
                onCompleteUpload: (file, response, status, header) => {
                    console.log('file =')
                    console.log(file)
                    console.log('finish upload')
                }
            },
            // xhr请求附带参数
            reqopts: {
                formData: {
                    token: config.uptoken
                },
                responseType: 'json',
                withCredentials: false
            }
        }
    },
    methods: {
        onStatus (file) {
            if (file.isSuccess) {
                return '上传成功'
            } else if (file.isError) {
                return '上传失败'
            } else if (file.isUploading) {
                return '正在上传'
            } else {
                return '待上传'
            }
        },
        onAddItem (files) {
            console.log('files =')
            console.log(files)
            this.files = files
        },
        uploadItem (file) {
            // 单个文件上传
            console.log('uploadItem file')
            console.log(file)
            this.reqopts.formData.key = file.name
            file.upload()
        },
        uploadAll () {
            // 上传所有文件
            this.$refs.vueFileUploader.uploadAll()
        },
        clearAll () {
            // 清空所有文件
            this.$refs.vueFileUploader.clearAll()
        }
    }
}
</script>
