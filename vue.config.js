const {
    defineConfig
} = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    pages: {
        //配置多页面入口
        index: {
            entry: './example/main.ts',
            template: 'example/index.html',
        },
    },
})