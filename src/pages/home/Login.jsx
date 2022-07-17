import React from "react"
import { Form, Icon, Input, Button, Modal, Checkbox, notification } from "antd"
import { post } from "@/services"

const FormItem = Form.Item

function info() {
  Modal.info({
    title: "忘记密码",
    content: (
      <div>
        <p>请联系管理员</p>
        <p>修改密码。</p>
      </div>
    ),
    onOk() {},
  })
}

class Login extends React.Component {
  handleSubmit = async () => {
    let adopt = false
    this.props.form.validateFields((err) => {
      if (err) {
        adopt = false
      } else {
        adopt = true
      }
    })
    if (adopt) {
      let json = this.props.form.getFieldsValue()
      json["jobNum"] = json.loginName
      console.log(json)
      let token = await post("/login", json)
      if (
        typeof token.data.eorr !== "undefined" &&
        token.data.eorr.toString() === "登陆失败"
      ) {
        notification.open({
          message: "登陆失败",
          Icon: <Icon type="smile-circle" style={{ color: "#108ee9" }} />,
        })
      } else {
        localStorage.setItem("token", token.data.token)
        localStorage.setItem("PermissionsList", JSON.stringify(token.data.list))
        window.location.href = "/home/index"
      }
    }
  }

  render() {
    const { getFieldDecorator } = this.props?.form || {getFieldDecorator:() => {}}
    return (
      <LoginBox>
        <LoginForm>
          <LoginTitle> 长江中心 - 物业管理系统 </LoginTitle>
          <Form style={{ maxWidth: "300px" }}>
            <FormItem>
              {getFieldDecorator("loginName", {
                rules: [
                  {
                    required: true,
                    message: "请输入用户名!",
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  placeholder="用户名"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("passWord", {
                rules: [
                  {
                    required: true,
                    message: "请输入密码!",
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true,
              })(<Checkbox>记住我</Checkbox>)}
              {/* 禁止使用: href="javascript:" */}
              <a
                className="login-form-forgot"
                onClick={info}
                style={{ float: "right" }}
              >
                忘记密码
              </a>
              <Button
                onClick={this.handleSubmit}
                type="primary"
                className="login-form-button"
                style={{ width: "100%" }}
              >
                登录
              </Button>
            </FormItem>
          </Form>
        </LoginForm>
      </LoginBox>
    )
  }
}


export default Login
