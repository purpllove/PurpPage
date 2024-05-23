import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx';
import unocss from '@unocss/vite';
import progress from 'vite-plugin-progress';
import VueDevtools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import path from "path";
import { URL, fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // '~': fileURLToPath(new URL('./', import.meta.url)),
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@': path.resolve(__dirname,'src')
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    VueDevtools(),
    AutoImport({
      dts: 'src/types/auto-imports.d.ts',
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        ['']: FileSystemIconLoader('src/assets/svg-icon', svg =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
        )
      },
      scale: 1,
      defaultClass: 'inline-block'
    }),
    Components({
      dts: 'src/types/components.d.ts',
      types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
      resolvers: [
        NaiveUiResolver(),
        IconsResolver({ customCollections: [''], componentPrefix: 'icon' })
      ]
    }),
    unocss(),
    progress(),
  ],
  server: {
    host: "0.0.0.0",
    port: 9980,
    open: true,
    fs: {
      cachedChecks: false,
    },
  },
  preview: {
    port: 9725,
  },
});
