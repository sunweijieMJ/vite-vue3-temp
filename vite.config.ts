import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
const path = require('path');
const port = 7000;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        styleImport({
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    ensureStyleFile: true,
                    resolveStyle: (name) => {
                        name = name.slice(3);
                        return `element-plus/packages/theme-chalk/src/${name}.scss`;
                    },
                    resolveComponent: (name) => {
                        return `element-plus/lib/${name}`;
                    }
                }
            ]
        }),
        vueI18n({
            compositionOnly: false,
            include: path.resolve(__dirname, './src/locale/**')
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'vue-i18n': 'vue-i18n/dist/vue-i18n.esm-browser.prod'
        }
    },
    server: {
        open: false,
        host: 'localhost',
        port,
        https: false,
        proxy: {
            '/[masterdataDomain|taskDomain|userDomain|pim/admin|oms/admin]': {
                target: 'http://dev.backendapi.aid.connext.net.cn/' // 开发
                // target: 'http://test.backendapi.aid.connext.net.cn/' // 测试
            }
        }
    }
});
