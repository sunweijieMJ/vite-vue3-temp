/** 重置message，防止重复点击重复弹出message弹框 */
import { ElMessage } from 'element-plus';
import { IMessageHandle, IMessageOptions, MessageType } from 'element-plus/lib/el-message/src/types.d';

let messageInstance: IMessageHandle;
const customMessage: any = (options: IMessageOptions) => {
    if (messageInstance) {
        messageInstance.close();
    }
    messageInstance = ElMessage(options);
};
const messageType: MessageType[] = ['error', 'success', 'info', 'warning'];
messageType.forEach((item) => {
    customMessage[item] = (options: IMessageOptions) => {
        if (typeof options === 'string') {
            options = {
                message: options,
            };
        }
        options.type = item;
        return customMessage(options);
    };
});

export default customMessage;
