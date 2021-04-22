import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import styleImport from 'vite-plugin-style-import';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
const path = require('path');
const port = 7000;
const timeStamp = Date.now();

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }): unknown => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};
    return defineConfig({
        plugins: [
            vue(),
            viteCompression({
                verbose: true,
                disable: false,
                threshold: 1024 * 10,
                algorithm: 'gzip',
                ext: '.gz'
            }),
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
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/scss/_base.scss";'
                }
            }
        },
        server: {
            host: 'localhost',
            port,
            https: false,
            proxy: {
                '/[masterdataDomain|taskDomain|userDomain|pim/admin|oms/admin]': {
                    target: 'http://dev.backendapi.aid.connext.net.cn/' // 开发
                // target: 'http://test.backendapi.aid.connext.net.cn/' // 测试
                }
            }
        },
        build: {
            assetsDir: 'static/assets',
            rollupOptions: {
                output: {
                    entryFileNames: `static/js/[name].${process.env.VITE_Version}.t${timeStamp}.js`,
                    chunkFileNames: `static/js/[name].${process.env.VITE_Version}.t${timeStamp}.js`,
                    assetFileNames: `static/js/[name].${process.env.VITE_Version}.t${timeStamp}.[ext]`,
                    manualChunks(id) {
                        const chunkMap = new Map();
                        chunkMap.set(/[\\/]src[\\/]layout[\\/]/.test(id), 'basicLayout');
                        chunkMap.set(/[\\/]src[\\/]components[\\/]/.test(id), 'basicComponent');
                        chunkMap.set(/[\\/]node_modules[\\/]echarts[\\/]/.test(id), 'echarts');
                        chunkMap.set(/[\\/]node_modules[\\/]lodash[\\/]/.test(id), 'lodash');
                        chunkMap.set(/[\\/]node_modules[\\/]moment[\\/]/.test(id), 'moment');
                        chunkMap.set(/[\\/]node_modules[\\/]qiankun[\\/]/.test(id), 'qiankun');
                        chunkMap.set(/[\\/]node_modules[\\/]xlsx[\\/]xlsx.js/.test(id), 'xlsxIndex');
                        chunkMap.set(/[\\/]node_modules[\\/]xlsx[\\/](?!(xlsx.js))/.test(id), 'xlsx');
                        chunkMap.set(/[\\/]node_modules[\\/]element-plus[\\/]/.test(id), 'element');
                        return chunkMap.get(true) || 'vendors';
                    }
                }
            }
        }
    });
};
