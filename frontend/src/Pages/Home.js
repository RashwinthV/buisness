
// const Home = () => {
//   return (
//     <div className="container-fluid">
//       <h1 className="mb-4 mt-4">Dashboard</h1>

//       <div className="row">
//         <div className="col-lg-6 mb-4">
//           <div className="card shadow-sm h-100">
//             <div className="card-body">
//               <h5 className="card-title">Welcome</h5>
//               <p className="card-text">
//                 This is your home dashboard. You can add widgets, stats, or shortcuts here.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="col-lg-6 mb-4">
//           <div className="card shadow-sm h-100">
//             <div className="card-body">
//               <h5 className="card-title">Quick Stats</h5>
//               <ul className="list-group list-group-flush">
//                 <li className="list-group-item">Users: 120</li>
//                 <li className="list-group-item">Projects: 8</li>
//                 <li className="list-group-item">Tasks Completed: 42</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const Home = () => {
  const businesses = [
    { id: 1, name: "India Cricket", employees: 20, products: 150, transactions: 400 },
    { id: 2, name: "RCB", employees: 35, products: 200, transactions: 700 },
    { id: 3, name: "CSK", employees: 30, products: 170, transactions: 500 },
    { id: 4, name: "DC", employees: 15, products: 100, transactions: 250 },
  ];

  const totalBusinesses = businesses.length;
  const totalProducts = businesses.reduce((sum, b) => sum + b.products, 0);
  const totalTransactions = businesses.reduce((sum, b) => sum + b.transactions, 0);

  const topBusinesses = [...businesses]
    .map((b) => ({
      ...b,
      averageScore: (b.employees + b.products + b.transactions) / 3,
    }))
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 3);

  const barChartData = {
    labels: businesses.map((b) => b.name),
    datasets: [
      {
        label: "Products",
        data: businesses.map((b) => b.products),
        backgroundColor: "#0d6efd",
      },
    ],
  };

  const pieChartData = {
    labels: businesses.map((b) => b.name),
    datasets: [
      {
        label: "Transactions",
        data: businesses.map((b) => b.transactions),
        backgroundColor: ["#0d6efd", "#198754", "#ffc107", "#dc3545"],
      },
    ],
  };

  return (
    <Container fluid className="px-2 px-sm-3 px-md-4 pt-4">
      <h4 className="mb-4 text-center text-md-start">Welcome ...</h4>

      {/* Summary Cards */}
      <Row className="gx-3 gy-3">
        <Col xs={12} sm={6} lg={4}>
          <Card className="text-center shadow-sm h-100">
            <Card.Body>
              <Card.Title>Total Businesses</Card.Title>
              <h4 className="text-primary">{totalBusinesses}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <Card className="text-center shadow-sm h-100">
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <h4 className="text-success">{totalProducts}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={4}>
          <Card className="text-center shadow-sm h-100">
            <Card.Body>
              <Card.Title>Total Transactions</Card.Title>
              <h4 className="text-warning">{totalTransactions}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="gx-3 gy-4 mt-4">
        <Col xs={12} md={6}>
          <Card className="shadow-sm h-100">
<Card.Body>
  <Card.Title className="mb-4">Product Distribution</Card.Title>
  <div className="chart-wrapper">
    <Bar
      data={barChartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
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
  <Card.Title className="mb-4">Transaction Share</Card.Title>
  <div className="chart-wrapper">
    <Pie
      data={pieChartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
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
