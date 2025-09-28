import React,{ChangeEvent,useState} from "react"
import { Row, Col, Input ,Button} from "antd"
import { useEffect } from "react"
function Upload() {
  let [currentFile,setCurrentfile] = useState()
  let [objectURL,setObjectURL]=useState()
  useEffect(()=>{
    if(currentFile){
      let objectURL = window.URL.createObjectURL(currentFile)
      setObjectURL(objectURL)
      return ()=>window.URL.revokeObjectURL(objectURL)
    }
  },[currentFile])
  function handleChange(event){
    let file = event.target.file[0]
    setCurrentfile(file)
  }
  function handleUpload(){
    if(!currentFile){
      return message.error('你尚未选择文件')
    }
    if(!allowUpload(currentFile)){
      return message.error('不支持此类文件上传')
    }
    const formData = new FormData()
    formData.append('chunk',currentFile)
    formData.append('filename',currentFile.name)
  }
  function allowUpload(file){
    let type = fileType
    let validFileTypes=['image/jepg','image/png','image/gif']
    if(!validFileTypes.includes(type)){
      message.error('不支持此类文件上传')
    }
    const isLessage2G= file.size/1024/1024<1024*1024*1024
    if(!isLessage2G){
      message.error('上传的文件不能大于2G')
    }
    return validFileTypes && isLessage2G
  }
  return (
    <Row>
      <Col span={12}>
        <Input
          type="file"
          style={{ width: 300 }}
          onChange={handleChange}
        ></Input>
        <Button type="primary" onClick={handleUpload} style={{marginLeft:10}}>上传</Button>
      </Col>
      <Col span={12}>
        {objectURL && <img src={objectURL} style={{width: 100}}/>}
      </Col>
    </Row>
  )
}
export default Upload
