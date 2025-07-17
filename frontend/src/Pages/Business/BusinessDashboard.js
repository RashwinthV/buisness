import { Row, Col, Card } from "react-bootstrap";
import CountUp from "react-countup";
import { useBusiness } from "../../context/BussinessContext";
import Image_default from "../../Assets/Images/Default.png";
const BusinessDashboard = () => {
  const { selectedBusinessId, businesses } = useBusiness();
  const selectedBusiness = businesses?.find(
    (b) => b.businessId === selectedBusinessId
  );
  const stats = [
    { title: "Total Products", count: 1234, color: "primary" },
    { title: "Total Employees", count: 567, color: "success" },
    { title: "Total Transactions", count: 7890, color: "warning" },
  ];


  return (
    <div className="container-fluid py-2">
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="text-center mb-4">
          <img
            src={selectedBusiness?.bussinessLogo||selectedBusiness?.logo.imageUrl || Image_default}
            alt="Business Logo"
            className="mb-2 img-fluid"
            style={{
    maxHeight: "100px",
    objectFit: "contain",
  }}
          />
          <h3 className="text-center mb-5">
            <strong>{selectedBusiness?.name} </strong>
          </h3>
          </div>
        </div>
      </div>
      <h5>Business Analytics</h5>

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

export default BusinessDashboard;
