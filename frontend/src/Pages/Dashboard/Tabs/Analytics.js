import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import CountUp from "react-countup";
import { useProduct } from "../../../context/ProductContext";
import { useEmployee } from "../../../context/EmployeeContext";

const Analytics = () => {
  const { product } = useProduct();
  const { totalemployee } = useEmployee();
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    if (Array.isArray(product)) {
      setProductCount(product.length);
    }
  }, [product]);

  const safeNumber = (value) =>
    typeof value === "number" && !isNaN(value) ? value : 0;

  const stats = [
    {
      title: "Total Products",
      count: safeNumber(productCount),
      color: "primary",
    },
    {
      title: "Total Employees",
      count: safeNumber(totalemployee),
      color: "success",
    },
    {
      title: "Total Transactions",
      count: 0,
      color: "warning",
    },
  ];

  return (
    <div className="container py-2">
      <h4 className="mb-4 text-center">Business Analytics</h4>

      <Row className="gx-3 gy-3">
        {stats.map((item, idx) => (
          <Col key={idx} xs={12} sm={6} lg={4}>
            <Card className="text-center shadow-sm h-100">
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <h4 className={`text-${item.color}`}>
                  <CountUp
                    start={0}
                    end={item.count}
                    duration={1.5}
                    separator=","
                  />
                </h4>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Analytics;
