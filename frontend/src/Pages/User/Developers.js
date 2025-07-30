import Kirithik_pic from "../../Assets/Images/Kirithik-Profile.jpg";
import Rashwinth_pic from "../../Assets/Images/Rashwinth-Profile.jpg";
import "../../Styles/Dev.css";
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Developer Data
const developers = [
  {
    name: "Kirithik Saran S",
    role: "Full Stack Web Developer",
    dob: "2002-07-24",
    education: "MCA",
    profilePic: Kirithik_pic,
    linkedIn: "https://www.linkedin.com/in/kirithik-saran/",
    instagram: "https://www.instagram.com/saran24_07?igsh=MXc2YzVuejFseGMwOQ==",
    github: "",
  },
  {
    name: "Rashwinth V",
    role: "Full Stack Web Developer",
    dob: "2002-12-15",
    education: "MCA",
    profilePic: Rashwinth_pic,
    linkedIn: "https://www.linkedin.com/in/rashwinth-v-153a26245/",
    instagram:
      "https://www.instagram.com/rashwinth_2002_?igsh=MWVma2swbjZ6Yzd3Yw==",
    github: "https://github.com/RashwinthV",
  },
  // Add more developers here...
];
const Developers = () => {
  return (
    //     <div className="container-fluid py-5">
    //       <h2 className="text-center mb-4">Meet Our Developers</h2>
    //       <hr></hr>
    //       <div className="row g-4 justify-content-center mt-3">
    //         {developers.map((dev, index) => (
    //           <div
    //             className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center"
    //             key={index}
    //           >
    //             <div
    //               className="card shadow-sm text-center p-3"
    //               style={{ width: "18rem", borderRadius: "1rem" }}
    //             >
    //               <img
    //                 src={dev.profilePic}
    //                 alt={`${dev.name}'s Profile`}
    //                 className="rounded-circle mx-auto"
    //                 style={{
    //                   width: "200px",
    //                   height: "200px",
    //                   objectFit: "cover",
    //                   border: "2px solid #ddd",
    //                   marginTop: "10px",
    //                 }}
    //               />
    //               <div className="card-body">
    //                 <h5 className="card-title fw-bold mb-2">{dev.name}</h5>
    //                 <h6 className="card-title fw-bold mb-2">{dev.role}</h6>
    //                 <div className="d-flex justify-content-center gap-3 mb-2 flex-wrap">
    //                   <span className="card-text">
    //                     <h6>Age: {calculateAge(dev.dob)}</h6>
    //                   </span>
    //                   <span className="card-text">
    //                     <h6>Education: {dev.education}</h6>
    //                   </span>
    //                 </div>
    //               </div>
    //               <div className="d-flex justify-content-center gap-2 pb-2">
    //                 <a href={dev.linkedIn} target="_blank" rel="noreferrer">
    //   <i className="bi bi-linkedin custom-icon-dev"></i>
    // </a>
    // <a href={dev.instagram} target="_blank" rel="noreferrer">
    //   <i className="bi bi-instagram custom-icon-dev"></i>
    // </a>
    // <a href={dev.github} target="_blank" rel="noreferrer">
    //   <i className="bi bi-github custom-icon-dev"></i>
    // </a>

    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>

    <div className="container-fluid">
      <h2 className="text-center fw-bold text-dark mb-4">
        Meet Our Developers
      </h2>
      <hr
        className="mx-auto mb-4"
        style={{ width: "200px", borderTop: "3px solid #0d6efd" }}
      />

      <div className="row g-4 justify-content-center mt-3">
        {developers.map((dev, index) => (
          <div
            className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center"
            key={index}
          >
            <div
              className="card shadow-lg border-0 text-center"
              style={{ width: "20rem", borderRadius: "1.5rem" }}
            >
              <div className="card-body">
                <img
                  src={dev.profilePic}
                  alt={`${dev.name}'s Profile`}
                  className="rounded-circle border border-2 shadow-sm mb-3"
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "cover",
                  }}
                />

                <h5 className="card-title fw-bold mb-1 text-primary">
                  {dev.name}
                </h5>
                <h6 className="text-muted mb-3">{dev.role}</h6>
                <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 text-muted mb-3">
                  <span className="d-flex align-items-center">
                    <i className="bi bi-person-circle me-2 fs-5" />
                    Age: {calculateAge(dev.dob)}
                  </span>
                  <span className="d-flex align-items-center">
                    <i className="bi bi-mortarboard-fill me-2 fs-5" />
                    {dev.education}
                  </span>
                </div>
                <div className="d-flex justify-content-center gap-3">
                  <a href={dev.linkedIn} target="_blank" rel="noreferrer">
                    <i className="bi bi-linkedin custom-icon-dev linkedin" />
                  </a>
                  <a href={dev.instagram} target="_blank" rel="noreferrer">
                    <i className="bi bi-instagram custom-icon-dev instagram" />
                  </a>
                  <a href={dev.github} target="_blank" rel="noreferrer">
                    <i className="bi bi-github custom-icon-dev github" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developers;
