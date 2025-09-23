import { Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';
interface Props {
  value?: any;
  onChange?: any;
  urlTemplate: string;
}
const App: React.FC<UploadProps & Props> = (props) => {
  let { value, onChange, urlTemplate, ...restProps } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  useEffect(() => {
    if (value) {
      let targetFileList: UploadFile[] = [];
      if (typeof value === 'string') {
        targetFileList = [
          {
            uid: String(Math.random()),
            name: value,
            status: 'done',
            url: urlTemplate.replace('{0}', value)
          }
        ];
      } else {
        targetFileList = (value || []).map((item: any, index: number) => ({
          uid: index,
          name: value,
          status: 'done',
          url: urlTemplate.replace('{0}', value)
        }));
      }
      setFileList(targetFileList);
    }
  }, [value]);

  const handleOnChange: UploadProps['onChange'] = (value) => {
    setFileList(value.fileList);
    if (value.file.status === 'done') {
      let target = value.fileList.map((item) => {
        return item?.response?.result?.fileUrl;
      });
      if (fileList.length === 1) {
        onChange(target[0] ? target[0] : '');
      } else if (fileList.length === 0) {
        onChange('');
      } else {
        onChange(target);
      }
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');
  return (
    <Upload
      action="/api/api-filecenter/v3/filecenter/file/putFile"
      headers={{
        Authorization: `Bearer ${auth?.access_token || ''}`
      }}
      listType="picture-card"
      fileList={fileList}
      onChange={handleOnChange}
      onPreview={onPreview}
      data={{
        bucketName: 'opmanage',
        fileName: 'image'
      }}
      {...restProps}>
      {fileList.length < 1 && '+'}
    </Upload>
  );
};

export default App;
