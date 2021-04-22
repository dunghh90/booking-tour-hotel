import { Form, Input, Button, Checkbox, Space ,
  Cascader,
  Select,
  Row,
  Col,
  AutoComplete,
} from 'antd';
import { connect } from 'react-redux';

import history from '../../utils/history';
import { loginAction } from '../../redux/actions';
import './styleLogin.css';

// import { Tabs } from 'antd';

// const { TabPane } = Tabs;

import { Tabs } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function LoginPage({ login }) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const onCancel = () => {
    history.push('/');
  };

  return (
    <div class="register-bg-container">
      <div class="register-form-container">
        {/* <Tabs onChange={callback} type="card"> */}
        <Tabs defaultActiveKey="1">
          <TabPane tab={<label style={{ color: "white" }}>Login</label>} key="1">
            <Form
              {...layout}
              name="basic"

              initialValues={{ remember: true }}
              onFinish={(values) => login(values)}
            >
              <Form.Item
                label={<label style={{ color: "white" }}>Email</label>}
                name="email"
                rules={[{ required: true, message: 'email chưa được nhập!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={<label style={{ color: "white" }}>Mật khẩu</label>}
                name="password"
                rules={[{ required: true, message: 'Mật khẩu chưa được nhập!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox style={{ color: "white" }}>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Đăng nhập
                  </Button>

                  <Button type="primary" htmlType="button" onClick={onCancel}>
                    Huỷ
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab={<label style={{ color: "white" }}>Register</label>} key="2">
            <Form
              {...formItemLayout}
              // form={form}
              name="register"
              onFinish={(values) => login(values)}
              initialValues={{
                // residence: ['zhejiang', 'hangzhou', 'xihu'],
                // prefix: '86',
              }}
              scrollToFirstError
            >
              <Form.Item
                name="email"
                label={<label style={{ color: "white" }}>Email</label>}
                rules={[
                  {
                    type: 'email',
                    message: 'Nhập E-mail không hợp lệ!',
                  },
                  {
                    required: true,
                    message: 'E-mail chưa được nhập!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label={<label style={{ color: "white" }}>Mật khẩu</label>}
                rules={[
                  {
                    required: true,
                    message: 'Password chưa được nhập!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label={<label style={{ color: "white" }}>Xác nhận mật khẩu</label>}
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Xác nhận mật khẩu chưa được nhập!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Nhập confirm password không trùng khớp!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="nickname"
                label={<label style={{ color: "white" }}>Nickname</label>}
                tooltip="Nhập tên gọi khác của bạn!"
                rules={[{ required: true, message: 'Nickname chưa được nhập!', whitespace: true }]}
              >
                <Input />
              </Form.Item>

              {/* <Form.Item
                name="residence"
                label="Habitual Residence"
                rules={[
                  { type: 'array', required: true, message: 'Please select your habitual residence!' },
                ]}
              >
                <Cascader options={residences} />
              </Form.Item> */}

              {/* <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
              >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
              </Form.Item> */}

              {/* <Form.Item
                name="website"
                label="Website"
                rules={[{ required: true, message: 'Please input website!' }]}
              >
                <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
                  <Input />
                </AutoComplete>
              </Form.Item> */}


              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('Chưa click đồng ý')),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox style={{color: "white"}}>
                  Tôi đã đọc <a href="">nội quy</a>
                </Checkbox>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Space>
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
                <Button type="primary" htmlType="button" onClick={onCancel}>
                    Huỷ
                  </Button>
                  </Space>
              </Form.Item>
            </Form>
          </TabPane>

        </Tabs>


      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (params) => dispatch(loginAction(params)),
  };
}

export default connect(null, mapDispatchToProps)(LoginPage);