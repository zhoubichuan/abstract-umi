import urljoin from 'url-join';
import { host } from '@/services/config';

/** 统一拼接服务端静态资源地址。 */
class ServerResource {
    // 资源路径根路径
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * 将资源路径标准化为可访问 URL。
     * @param url 服务端返回的资源路径
     */
    url(url: string): string {
        if (!url) return '';
        if (/^((https:|http:)?\/\/)/i.test(url)) {
            return url;
        } else if (/^data:image/.test(url)) {
            return url;
        } else if (url.startsWith(this.baseUrl)) {
            return url;
        } else {
            return urljoin(this.baseUrl, url);
        }
    }
}

const serverResource = new ServerResource(host);

export { serverResource };
