import { Form, Input, Button, message } from "antd";

const { TextArea } = Input;

export default function SuccessStoryForm() {
  const onFinish = async (values) => {
    try {
      const res = await fetch("http://localhost:5000/successStory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        message.success("Success story submitted!");
      } else {
        message.error("Failed to submit. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Submission failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Share Your Success Story ❤️</h2>

      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="selfBiodataId"
          label="Self Biodata ID"
          rules={[{ required: true, message: "Please enter your biodata ID" }]}
        >
          <Input type="number" placeholder="e.g., 1" />
        </Form.Item>

        <Form.Item
          name="partnerBiodataId"
          label="Partner Biodata ID"
          rules={[{ required: true, message: "Please enter partner biodata ID" }]}
        >
          <Input type="number" placeholder="e.g., 2" />
        </Form.Item>

        <Form.Item
          name="coupleImageUrl"
          label="Couple Image Link"
          rules={[{ required: true, message: "Please enter an image URL" }]}
        >
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>

        <Form.Item
          name="review"
          label="Your Review"
          rules={[{ required: true, message: "Please share your story" }]}
        >
          <TextArea rows={5} placeholder="Share your experience using this site..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit Story
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
