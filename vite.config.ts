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
                    assetFileNames: `static/js/[name].${process.env.VITE_Version}.t${timeStamp}.[ext]`
                    // manualChunks(id) {
                    //     const layout = /[/]src[/]layout[/]/.test(id);
                    //     const customComponent = /[\\/]src[\\/]components[\\/]custom[/]/.test(id);
                    //     const basicComponent = /[\\/]src[\\/]components[\\/]basic[\\/]/.test(id);
                    //     const echarts = /[\\/]node_modules[\\/]echarts[\\/]/.test(id);
                    //     const lodash = /[\\/]node_modules[\\/]lodash[\\/]/.test(id);
                    //     const moment = /[\\/]node_modules[\\/]moment[\\/]/.test(id);

                    //     // const xlsxIndex = /[\\/]node_modules[\\/]xlsx[\\/]xlsx.js/.test(id);
                    //     // const xlsx = /[\\/]node_modules[\\/]xlsx[\\/]/.test(id);

                    //     // const elementThemeIndex = /[\\/]node_modules[\\/]element-plus[\\/]lib[\\/]theme-chalk[\\/]index.css/.test(id);
                    //     // const elementTheme = /[\\/]node_modules[\\/]element-plus[\\/]lib[\\/]theme-chalk[\\/]/.test(id);
                    //     // const elementIndex = /[\\/]node_modules[\\/]element-plus[\\/]lib[\\/]index.js/.test(id);
                    //     // const element = /[\\/]node_modules[\\/]element-plus[\\/]/.test(id);

                    //     switch (true) {
                    //         case layout:
                    //             return 'layout';
                    //         case customComponent:
                    //             return  'customComponent';
                    //         case basicComponent:
                    //             return 'basicComponent';
                    //         case echarts:
                    //             return 'echarts';
                    //         case lodash:
                    //             return 'lodash';
                    //         case moment:
                    //             return 'moment';
                    //         default:
                    //             return 'vendors';
                    //     }
                    // }
                }
            }
        }
    });
};
