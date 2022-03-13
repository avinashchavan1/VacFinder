import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const Welcome = () => {
  return (
    <Result
      icon={<SmileOutlined />}
      title="Welcome, Please choose the vaccination slot details"
    />
  );
};
export default Welcome;
