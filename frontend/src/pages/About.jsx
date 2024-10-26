import React from "react";
import Layout from "../component/layout/Layout";


const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="data:image/jpeg;base64,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"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Easy Shop is an e-commerce website by Abhishek and Aman, offering a seamless shopping experience. It features a user-friendly design, a wide product catalog, secure checkout, and personalized accounts. Users can enjoy quick searches, filtered browsing, and special deals, making it a convenient and engaging online shopping destination.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;