import axios, { AxiosError, AxiosResponse } from 'axios';
import { message } from 'antd';

/**
 * 请求成功后的业务码响应处理。
 */
class ServerResponseSuccessManager {
    /**
     * 解析后端业务状态码并触发对应处理逻辑。
     * @param response 接口响应对象
     */
    codeParser(response: AxiosResponse) {
        const code = response?.data?.code;
        const resData = response?.data?.data;
        const parser = {
            '10010': () => {
                this.handleCodeIs10010(resData);
            },
            default: () => console.log('code 无法识别'),
        };
        return parser[code] ? parser[code]() : parser['default'];
    }

    /**
     * 处理业务码 10010（登录态失效）。
     * @param resData 响应数据体
     */
    handleCodeIs10010(resData: unknown) {
        if (resData === 'TOKEN_INVALID') {
            message.config({
                maxCount: 1,
            });
            message.info('登录已过期，请重新登录');
            setTimeout(() => {
                window.location.href = '/login';
            }, 1000);
        }
    }
}

/**
 * 请求失败时的统一错误处理。
 */
class ServerResponseFailedManager {
    /**
     * 输出请求失败提示信息。
     * @param error axios 错误对象
     */
    getErrorMessage(error: AxiosError) {
        message.info(error.response);
    }
}

export const serverResponseSuccessManager = new ServerResponseSuccessManager();
export const serverResponseFailedManager = new ServerResponseFailedManager();
