# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur

- Use [vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/tsc) for performing the same type checking from the command line, or for generating d.ts files for SFCs.

# 1.vscode 类型“{}”上不存在属性“count”。ts(2339)

TypeScript Vue Plugin 重启

# 2.Cannot find module 'vue'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?Vetur(2792)

设置moduleResolution： 在你的 tsconfig.json 文件中，确保 "moduleResolution" 设置为 "node"：
{  
 "compilerOptions": {  
 "moduleResolution": "node",  
 ...  
 }  
}

# 3.Parsing error: Unexpected token )eslint

package.json add
"devDependencies": {
"babel-eslint":"10.1.0"
}
eslint.config.js add
export default [
{parse: 'babel-eslint'},
]

# 4.格式化文档用的ESLint

# 5.Module '"xxx/src/components/HelloWorld.vue"' has no default export.Vetur(1192)

卸载vetur(已经弃用)改用 Vue - Official

# 6.VSCode常用插件

6.1 Vue 3 Snippets
6.2 别名路径跳转


# css 暂定
package.json
"swiper": "10.3.1",


# 启动
pnpm build --未build,启动前执行
pnpm dev
# 主页
http://localhost:9980/purpPage
# 静态路由配置
src\router\index.ts