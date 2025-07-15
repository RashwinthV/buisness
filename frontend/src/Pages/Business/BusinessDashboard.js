import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import CountUp from "react-countup";
const BusinessDashboard = () => {
  const navigate = useNavigate();
const stats = [
  { title: "Total Products", count: 1234, color: "primary" },
  { title: "Total Employees", count: 567, color: "success" },
  { title: "Total Transactions", count: 7890, color: "warning" },
];
  return (
    <div className="container-fluid py-2">
      {/* Page Header */}
      <div className="row justify-content-center">
        {/* Icon section */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <h5 className="mb-0">Welcome Business Name</h5>
          <div className="d-flex gap-3">
            <button
              className="btn btn-primary mb-3"
              onClick={() => navigate("/addproduct")}
            >
              <i className="bi bi-plus-circle-fill fs-6 me-2"></i> Add Product
            </button>

            <button
              className="btn btn-primary mb-3"
              onClick={() => navigate("/addemployee")}
            >
              {" "}
              <i className="bi bi-person-add fs-6 me-2"></i>
              Add Employee
            </button>
          </div>
        </div>
      </div>
<hr></hr>

      {/* Page Body */}


      <Row className="gx-3 gy-3">
  {stats.map((item, idx) => (
    <Col key={idx} xs={12} sm={6} lg={4}>
      <Card className="text-center shadow-sm h-100">
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <h4 className={`text-${item.color}`}>
            <CountUp start={0} end={item.count} duration={1.5} separator="," />
          </h4>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

    </div>
        //   <div className="row justify-content-center">
    //     <div className="card shadow-sm col-lg-3 col-sm-12 mb-3 me-2">
    //       <div className="card-body">
    //         <h5 className="card-title">Total Products</h5>
    //         <p className="card-text">1234</p>
    //         {/* Add more content here as needed */}
    //       </div>
    //     </div>
    //     <div className="card shadow-sm col-lg-3 col-sm-12 mb-3 me-2">
    //       <div className="card-body">
    //         <h5 className="card-title">Total Employees</h5>
    //         <p className="card-text">1234</p>
    //         {/* Add more content here as needed */}
    //       </div>
    //     </div>

    //             <div className="card shadow-sm  col-lg-3 col-sm-12 mb-3 me-2">
    //       <div className="card-body">
    //         <h5 className="card-title">Total Transactions</h5>
    //         <p className="card-text">1234</p>
    //         {/* Add more content here as needed */}
    //       </div>
    //     </div>
    //   </div>
  );
};

export default BusinessDashboard;
