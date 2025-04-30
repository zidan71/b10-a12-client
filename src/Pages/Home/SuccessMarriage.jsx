import React, { useEffect, useState } from "react";
import { Card, Rate, Row, Col, Typography, Spin } from "antd";

const { Title, Paragraph } = Typography;

const SuccessMarriage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch("https://assignment-12-server-zeta-three.vercel.app/successStory");
        const data = await res.json();

        // Sort by marriageDate descending
        const sorted = data.sort(
          (a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)
        );
        setStories(sorted);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch success stories:", error);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
        Marriage Success Stories 💍
      </Title>

      <Row gutter={[24, 24]}>
        {stories.map((story, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              hoverable
              cover={
                <img
                  alt="Couple"
                  src={story.coupleImage}
                  style={{ height: "300px", objectFit: "cover" }}
                />
              }
            >
              <Title level={5}>Marriage Date: {story.marriageDate}</Title>
              <Rate disabled defaultValue={5} style={{ color: "#faad14" }} />
              <Paragraph style={{ marginTop: "10px" }}>
                {story.review}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SuccessMarriage;
