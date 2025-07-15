import React from "react";

const Home = () => {
  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Welcome</h5>
              <p className="card-text">
                This is your home dashboard. You can add widgets, stats, or shortcuts here.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Quick Stats</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Users: 120</li>
                <li className="list-group-item">Projects: 8</li>
                <li className="list-group-item">Tasks Completed: 42</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
