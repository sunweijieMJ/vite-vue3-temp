/** 重置message，防止重复点击重复弹出message弹框 */
import { ElMessage } from 'element-plus';
import {
  MessageHandle,
  MessageParams,
} from 'element-plus/lib/components/message/src/message';

type MessageType = 'success' | 'warning' | 'info' | 'error';

let messageInstance: MessageHandle;
const customMessage: any = (options: MessageParams) => {
  if (messageInstance) {
    messageInstance.close();
  }
  messageInstance = ElMessage(options);
};
const messageType: MessageType[] = ['error', 'success', 'info', 'warning'];
messageType.forEach((item) => {
  customMessage[item] = (options: MessageParams) => {
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
