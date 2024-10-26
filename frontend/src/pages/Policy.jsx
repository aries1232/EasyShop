import React from "react";
import Layout from "../component/layout/Layout";
import "./policy.css"


const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://img.freepik.com/premium-vector/flat-icon-with-privacy-policy-isometric-vector-illustration_100456-9260.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>Data Collection: We collect personal information, such as name, email, and address, only to improve user experience and fulfill orders.</p>
          <p>Use of Information: Your data is used solely for order processing, personalized recommendations, and site improvements.</p>
          <p>Secure Transactions: All transactions are encrypted, and we use secure payment gateways to protect your financial information.</p>
          <p>Third-Party Sharing: We do not sell or share personal data with third parties, except as necessary for order fulfillment (e.g., shipping partners).</p>
          <p>User Rights: You can access, update, or delete your personal information by contacting us or through your account settings.</p>
          <p>Cookies: We use cookies to enhance site functionality and track user behavior, with the option to adjust cookie settings.</p>
          <p>Policy Updates: We may update this policy and will notify users of significant changes.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;