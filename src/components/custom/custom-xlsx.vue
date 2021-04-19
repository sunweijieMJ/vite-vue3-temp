<template>
    <div
        ref="rootRef"
        v-loading.fullscreen.lock="fullscreenLoading"
        class="custom-xlsx"
        element-loading-spinner="el-icon-loading"
        :element-loading-text="$t('baseCustomXlsx.t130')"
        element-loading-background="rgba(0, 0, 0, 0.3)"
    >
        <!-- 导入文件载体 -->
        <input class="inputFile" type="file" style="display:none;" :accept="acceptTypes.join(',')" @change="importFile">
        <!-- 导出文件载体 -->
        <a class="outputFile" />
        <!-- slot -->
        <div class="import" :class="{hover: borderhover}" @click="uploadFile">
            <slot name="import" />
        </div>
        <div class="export" @click="manual || downloadFile()">
            <slot name="export" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import XLSX from 'xlsx';

export default defineComponent({
    name: 'CustomXlsx',
    props: {
        // excel类型
        type: {
            type: String,
            default: ''
        },
        // 是否启用手动下载
        manual: {
            type: Boolean,
            default: false
        },
        // 是否支持拖拽
        drag: {
            type: Boolean,
            default: false
        },
        // 是否将文件读取为二进制字符串
        rABS: {
            type: Boolean,
            default: false
        },
        // 允许上传的文件类型
        acceptTypes: {
            type: Array as PropType<string[]>,
            default: () => [
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel',
                'text/csv'
            ]
        },
        // excel标题
        excelTitle: {
            type: Object as PropType<Record<string, string>>,
            default: null
        },
        // 导出的excel数据
        exportData: {
            type: Object as PropType<{
                excelName: string;
                excelData: Array<unknown>;
            }>,
            default: null
        },
        getImportData: {
            type: Function,
            default: null
        }

    },
    setup(props) {
        const $i18n = useI18n();
        const rootRef = ref<HTMLElement|null>(null);

        let fullscreenLoading = ref(false); // 加载中
        let borderhover = ref(false); // 是否拖拽入框中
        let inputFile: any; // 导入文件el对象
        let outputFile: any; // 导出文件el对象
        let excelData: Array<any> = []; // excel处理数据

        // 字符串转字符流
        const s2ab = (s: string) => {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        };

        // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]
        const getCharCol = (n: number) => {
            let s = '';
            let m = 0;
            while (n > 0) {
                m = (n % 26) + 1;
                s = String.fromCharCode(m + 64) + s;
                n = (n - m) / 26;
            }
            return s;
        };

        // 文件流转BinaryString
        const fixdata = (data: any) => {
            let o = '';
            let l = 0;
            const w = 10240;
            for (; l < data.byteLength / w; ++l) {
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, (l * w) + w)) as any);
            }
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)) as any);
            return o;
        };

        // 去除空白
        const trimStr = (str: string): string => {
            if (!str) return '';
            // 去除空格
            str = str.replace(/\s+/g, '');
            // 去除引号
            str = str.replace(/"/g, '');
            // 去除换行
            str = str.replace(/\r|\n|\r\n/g, '');
            return str;
        };

        // 去除第二行(中文标题行)
        const analyzeData = (data: Array<unknown>) => {
            // data.splice(0, 1);
            const titleMap = new Map();
            for (const k in props.excelTitle) {
                titleMap.set(props.excelTitle[k], k);
            }
            const newArr = data.map((item: any, index: number) => {
                const obj: Record<string, string> = {};

                for (const k in item) {
                    const trimKey = trimStr(k);
                    // 添加行数
                    obj.rowNum = index + 1 + '';
                    // 转义表头
                    obj[titleMap.get(trimKey)] = item[k];
                    if ([undefined, null, ''].includes(obj[titleMap.get(trimKey)])) {
                        delete obj[titleMap.get(trimKey)];
                    }
                }
                return obj;
            });
            return newArr;
        };

        // 处理导入的数据
        const dealFile = (name: string, data: Array<unknown>) => {
            console.log(data);
            inputFile.value = '';
            fullscreenLoading.value = false;
            if (data.length <= 0) {
                ElMessage.error(`${$i18n.t('baseCustomXlsx.t132')}`);
            } else {
                excelData = data;
                if(props.getImportData) {
                    props.getImportData({
                        excelName: name || `${$i18n.t('baseCustomXlsx.t133')}`,
                        excelData: data
                    });
                } else {
                    ElMessage.error(`${$i18n.t('baseCustomXlsx.t135')}`);
                }
            }
        };

        const handleFile = (files: FileList) => {
            if (!Array.from(files).some((item: any) => props.acceptTypes.includes(item.type))) {
                ElMessage.warning(`${$i18n.t('baseCustomXlsx.t131')}`);
                fullscreenLoading.value = false;
                return;
            }
            if (!(files && files.length)) {
                fullscreenLoading.value = false;
                return;
            }
            const file = files[0];
            const reader = new FileReader();
            // 读取完成的数据
            let wb: any = {};

            reader.onload = (evt: any) => {
                const data = evt.target.result;
                if (props.rABS) {
                    // 手动转化
                    wb = XLSX.read(btoa(fixdata(data)), {
                        type: 'base64'
                    });
                } else {
                    wb = XLSX.read(data, {
                        type: 'binary',
                        codepage: 936
                    });
                }
                const json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                dealFile(file.name, analyzeData(json));
            };

            if (props.rABS) {
                reader.readAsArrayBuffer(file);
            } else {
                reader.readAsBinaryString(file);
            }
        };

        // 监听拖拽
        const listenDrop = (evt: any) => {
            borderhover.value = false;
            evt.stopPropagation();
            evt.preventDefault();

            fullscreenLoading.value = true;
            const files = evt.dataTransfer.files;
            handleFile(files);
        };

        // 导入文件点击事件
        const uploadFile = () => {
            inputFile.click();
        };

        // 解析导出文件excel
        const importFile = () => {
            fullscreenLoading.value = true;

            const fileElement = inputFile;
            handleFile(fileElement.files);
        };

        // 导出到excel
        const downloadExl = (json: Array<any>, downName: string, type: any = 'xlsx') => {
            const keyMap: Array<string> = []; // 获取键
            for (const k in json[0]) {
                if (Object.prototype.hasOwnProperty.call(json[0], k)) {
                    keyMap.push(k);
                }
            }
            const tmpdata: Array<any> = []; // 用来保存转换好的json
            json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
                v: v[k],
                position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
            }))).reduce((prev, next) => prev.concat(next)).forEach((v: any) => {
                tmpdata[v.position] = {
                    v: v.v ?? ''
                };
            });

            const outputPos = Object.keys(tmpdata); // 设置区域,比如表格从A1到D10
            const tmpWB = {
                SheetNames: ['sheet'], // 保存的表标题
                Sheets: {
                    sheet: Object.assign(
                        {},
                        tmpdata, // 内容
                        {
                            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
                        }
                    )
                }
            };
            const tmpDown: any = new Blob([
                s2ab(XLSX.write(
                    tmpWB,
                    // 这里的数据是用来定义导出的格式类型
                    {
                        bookType: type, bookSST: false, type: 'binary'
                    }
                ))
            ], {
                type: ''
            });
            // 创建二进制对象写入转换好的字节流
            const href = URL.createObjectURL(tmpDown); // 创建对象超链接
            outputFile.download = downName + '.xlsx'; // 下载名称
            outputFile.href = href; // 绑定a标签
            outputFile.click(); // 模拟点击实现下载
            setTimeout(() => { // 延时释放
                URL.revokeObjectURL(tmpDown); // 用URL.revokeObjectURL()来释放这个object URL
            }, 100);
        };

        // 导出文件点击事件
        const downloadFile = (exportData = props.exportData) => {
            excelData = exportData.excelData;
            let data: any = [{}];
            for (const k in excelData[0]) { // 设置第1行为数据库字段行
                if (Object.prototype.hasOwnProperty.call(excelData[0], k)) {
                    // data[0][k] = k;
                    data[0][k] = props.excelTitle[k]; // 中文标题
                }
            }
            data = data.concat(excelData);
            const newData = data.map((item: any, index: number) => {
                const obj: Record<string, string> = {};
                for (const k in item) {
                    if (item[k] instanceof Array) {
                        obj[k] = item[k].join(',');
                    } else {
                        obj[k] = item[k];
                    }
                }
                return obj;
            });
            downloadExl(newData, exportData.excelName || `${$i18n.t('baseCustomXlsx.t134')}`);
        };

        onMounted(() => {
            inputFile = rootRef.value?.querySelector('.inputFile');
            outputFile = rootRef.value?.querySelector('.outputFile');

            const dropbox = rootRef.value?.querySelector('.import') as HTMLLIElement;
            if (props.drag && dropbox) {
                dropbox.addEventListener('drop', listenDrop, false);
                dropbox.addEventListener('dragleave', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    borderhover.value = false;
                });
                dropbox.addEventListener('dragenter', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    borderhover.value = true;
                });
                dropbox.addEventListener('dragover', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    borderhover.value = true;
                });
            }
        });

        return {
            rootRef, fullscreenLoading, borderhover, uploadFile, importFile, downloadFile
        };
    }
});
</script>
<style lang="scss" scoped>
    .custom-xlsx {
        .export, .import {
            display: inline-flex;
        }
    }
</style>
