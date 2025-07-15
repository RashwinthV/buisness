import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend
);

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const Home = () => {
  // Sample site-wide stats
  const { user } = useContext(UserContext);
  const users = 1200;
  const businesses = [
    {
      id: 1,
      name: "India Cricket",
      employees: 20,
      products: 150,
      transactions: 400,
    },
    { id: 2, name: "RCB", employees: 35, products: 200, transactions: 700 },
    { id: 3, name: "CSK", employees: 30, products: 170, transactions: 500 },
    { id: 4, name: "DC", employees: 15, products: 100, transactions: 250 },
  ];

  const totalBusinesses = businesses.length;
  const totalProducts = businesses.reduce((sum, b) => sum + b.products, 0);

  const totalSales = 1100;
  const totalPurchases = 650;

  const chartRef = useRef();
  const [gradientColor, setGradientColor] = useState(null);

  useEffect(() => {
    const canvas = document.getElementById("bar-sales-chart");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, "#9D50BB");
      gradient.addColorStop(0.5, "#6E48AA");
      gradient.addColorStop(1, "#3E1E68");
      setGradientColor(gradient);
    }
  }, []);

  const topBusinesses = [...businesses]
    .map((b) => ({
      ...b,
      averageScore: (b.employees + b.products + b.transactions) / 3,
    }))
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 3);

  // Line Chart Data (e.g., monthly registration)
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Users",
        data: [100, 150, 200, 250, 300, 350, 400],
        borderColor: "#20c997", // Teal
        backgroundColor: "rgba(32, 201, 151, 0.2)",
        tension: 0.4,
        fill: true,
      },

      {
        label: "Businesses",
        data: [20, 40, 60, 80, 90, 110, 120],
        borderColor: "#fd7e14", // Coral
        backgroundColor: "rgba(253, 126, 20, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Sales vs Purchase bar chart
  const transactionBarData = {
    labels: ["Sales", "Purchases"],
    datasets: [
      {
        label: "Transaction Count",
        data: [totalSales, totalPurchases],
        backgroundColor: gradientColor || ["#6E48AA", "#3E1E68"],
        borderRadius: 8,
      },
    ],
  };

  return (
    <Container fluid className="px-2 px-sm-3 px-md-4 pt-4">
      <h4 className="mb-4 text-center text-md-start">
        Welcome {user?.firstName}
      </h4>

      <h4 className="mb-4 text-center text-md-start">Platform Analytics</h4>

      {/* Summary Cards */}
      <Row className="gx-3 gy-3">
        <Col xs={12} sm={6} lg={4}>
          <Card className="text-center shadow-sm h-100">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <h4 className="text-primary">{users}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <Card className="text-center shadow-sm h-100">
            <Card.Body>
              <Card.Title>Total Businesses</Card.Title>
              <h4 className="text-success">{totalBusinesses}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={4}>
          <Card className="text-center shadow-sm h-100">
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <h4 className="text-warning">{totalProducts}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row className="gx-3 gy-4 mt-4">
        <Col xs={12} md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="mb-4">Monthly Registrations</Card.Title>
              <div className="chart-wrapper" style={{ height: "300px" }}>
                <Line
                  data={lineChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                      duration: 1200,
                      easing: "easeInSine",
                    },
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="mb-4">Sales vs Purchases</Card.Title>
              <div className="chart-wrapper" style={{ height: "300px" }}>
                <Bar
                  id="bar-sales-chart"
                  ref={chartRef}
                  data={transactionBarData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                      duration: 1200,
                      easing: "easeOutBounce",
                    },
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Top Business Section */}
      <Card className="shadow-sm mt-4">
        <Card.Body>
          <Card.Title className="mb-4">Top Businesses</Card.Title>
          <Row className="gx-3 gy-3">
            {topBusinesses.map((biz) => (
              <Col xs={12} sm={6} md={4} key={biz.id}>
                <Card className="bg-light h-100">
                  <Card.Body>
                    <h6 className="fw-bold">{biz.name}</h6>
                    <p className="mb-1">Employees: {biz.employees}</p>
                    <p className="mb-1">Products: {biz.products}</p>
                    <p className="mb-1">Transactions: {biz.transactions}</p>
                    <span className="badge bg-secondary">
                      Avg: {biz.averageScore.toFixed(2)}
                    </span>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
