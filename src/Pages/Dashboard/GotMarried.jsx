import React from "react";
import { Form, Input, Button, message, DatePicker, Card } from "antd";
import { toast } from "react-toastify";

const SuccessStoryForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const formattedValues = {
      ...values,
      marriageDate: values.marriageDate.format("YYYY-MM-DD"),
    };

    try {
      const res = await fetch("https://assignment-12-server-zeta-three.vercel.app/successStory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedValues),
      });

      if (res.ok) {
        toast.success("Success story submitted!");
        form.resetFields();
      } else {
        toast.error("Failed to submit. Try again.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px" }}>
      <Card title="Submit Your Success Story" bordered={false}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="selfBiodataId"
            label="Your Biodata ID"
            rules={[{ required: true, message: "Please enter your biodata ID" }]}
          >
            <Input placeholder="Eg. 5" />
          </Form.Item>

          <Form.Item
            name="partnerBiodataId"
            label="Partner's Biodata ID"
            rules={[{ required: true, message: "Please enter your partner's biodata ID" }]}
          >
            <Input placeholder="Eg. 12" />
          </Form.Item>

          <Form.Item
            name="coupleImage"
            label="Couple Image Link"
            rules={[{ required: true, message: "Please enter image URL" }]}
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          <Form.Item
            name="marriageDate"
            label="Marriage Date"
            rules={[{ required: true, message: "Please select your marriage date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="review"
            label="Success Story Review"
            rules={[{ required: true, message: "Please share your experience" }]}
          >
            <Input.TextArea rows={4} placeholder="Share your journey using this site..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Success Story
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SuccessStoryForm;
