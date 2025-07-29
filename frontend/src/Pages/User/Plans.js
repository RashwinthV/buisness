const plans = [
  {
    planName: "Starter Pack",
    duration: "3 Months",
    actualPrice: 999,
    price: 699,
    discountValidTill: "2025-08-31",
    features: [
      "Add up to 25 employees",
      "Register up to 10 vehicles",
      "Manage up to 10 products (raw materials & finished goods)",
      "Basic support via email",
    ],
  },
  {
    planName: "Growth Plan",
    duration: "6 Months",
    actualPrice: 1799,
    price: 1299,
    discountValidTill: "2025-08-31",
    features: [
      "Add up to 100 employees",
      "Register up to 25 vehicles",
      "Manage up to 50 products (both raw and manufactured)",
      "Priority email support",
    ],
  },
  {
    planName: "Pro Suite",
    duration: "1 Year",
    actualPrice: 2999,
    price: 1999,
    discountValidTill: "2025-08-31",
    features: [
      "Add up to 250 employees",
      "Register up to 50 vehicles",
      "Unlimited product management",
      "Live chat & email support",
    ],
  },
  {
    planName: "Enterprise Elite",
    duration: "2 Years",
    actualPrice: 4999,
    price: 3599,
    discountValidTill: "2025-08-31",
    features: [
      "Unlimited employees registrations",
      "Unlimited vehicle registrations",
      "Unlimited product and inventory management",
      "Premium priority support (24/7)",

    ],
  },
];


const Plans = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Choose Your Perfect Plan</h2>
      <hr></hr>
      <div className="row justify-content-center mt-2 g-4">
        {plans.map((plan, index) => (
          <div className="col-md-6 col-lg-3" key={index}>
            <div className={`card h-100 shadow-sm ${index === 2 ? "border-primary" : ""}`}>
              {index === 2 && (
                <div className="position-absolute top-0 end-0 bg-primary text-white px-2 py-1 rounded-bottom-start small">
                  Best Value
                </div>
              )}
              <div className="card-body d-flex flex-column text-center">
                <h5 className="fw-bold">{plan.planName}</h5>
                <p className="text-muted small mb-1">{plan.duration}</p>
                <p className="text-muted mb-2 text-decoration-line-through">₹{plan.actualPrice}</p>
                <h4 className="fw-bold mb-0">₹{plan.price} <small className="text-muted">/plan</small></h4>
                <p className="text-muted small mb-3">Valid till {plan.discountValidTill}</p>
                <ul className="list-unstyled text-start mt-2 mb-4">
                  {plan.features.map((feat, i) => (
                    <li key={i}>✓ {feat}</li>
                  ))}
                </ul>
                <button className={`btn btn-sm ${index === 2 ? "btn-primary" : "btn-outline-dark"} mt-auto`}>
                  Choose {plan.planName}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
