export const printTransactionEntry = (form, type, businessInfo) => {
  const { businessName, businessEmail, googleMapLink, logo, city, pincode } =
    businessInfo || {};

  const printWindow = window.open("", "_blank");

  printWindow.document.write(`
    <html>
      <head>
        <title>${type === "sales" ? "Sales" : "Purchase"} Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 30px;
            color: #000;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #ccc;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }

          .header-info {
            max-width: 70%;
          }

          .header-info h2 {
            margin: 0;
            font-size: 24px;
          }

          .header-info p {
            margin: 5px 0;
            font-size: 14px;
          }

          .logo {
            width: 100px;
            height: 100px;
            object-fit: contain;
            
          }

          .section-title {
            margin-top: 30px;
            margin-bottom: 10px;
            font-weight: bold;
            font-size: 16px;
            text-decoration: underline;
          }

          .info-block {
            font-size: 14px;
            margin-bottom: 15px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 14px;
          }

          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: center;
          }

          .grand-total {
            text-align: right;
            font-size: 16px;
            font-weight: bold;
            margin-top: 10px;
          }

          .footer {
            margin-top: 60px;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
          }

          .signature-line {
            margin-top: 60px;
            border-top: 1px dashed #aaa;
            width: 200px;
            text-align: center;
            padding-top: 5px;
          }
        </style>
      </head>
      <body>

        <!-- Business Header -->
        <div class="header">
          <div class="header-info">
          <h4> ${type === "sales" ? "Sold" : "Purchased"} By : </h4>
            <h2>${businessName || "Business Name"}</h2>
            <p><strong>Email:</strong> ${businessEmail || "-"}</p>
            <p><strong>Location:</strong> ${city || "N/A"}, ${
    pincode || "N/A"
  }</p>

          </div>
          <img src="${
            logo?.imageUrl || "https://via.placeholder.com/100"
          }" alt="Logo" class="logo" />
        </div>

        <!-- Receipt Title -->
        <h3 style="text-align:center;">${
          type === "sales" ? "Sales Receipt" : "Purchase Receipt"
        }</h3>

        <!-- Party & Transaction Info -->
        <div class="info-block">
          <div class="section-title">Transaction Info</div>
          <p><strong>Party Name:</strong> ${form.partyName || "-"}</p>
          <p><strong>Contact:</strong> ${form.partyContact || "-"}</p>
          <p><strong>Date:</strong> ${form.date || "-"}</p>
          <p><strong>${type === "sales" ? "Sold By" : "Entered By"}:</strong> ${
    form.entryBy || "-"
  }</p>
        </div>

        <!-- Products Table -->
        <!-- Products Table -->
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>Product</th>
      <th>Quantity</th>
      <th>Rate</th>
      <th>Discount (%)</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    ${form.products
      .map(
        (p, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${p.name}</td>
          <td>${p.qty}</td>
          <td>₹${p.rate}</td>
          <td>${p.discount || 0}%</td>
          <td>₹${p.total}</td>
        </tr>
      `
      )
      .join("")}
  </tbody>
</table>


        <!-- Grand Total -->
        <div class="grand-total">
          Grand Total: ₹${form.products.reduce((sum, p) => sum + p.total, 0)}
        </div>

        <!-- Signatures -->
        <div class="footer">
        <div class="signature-line">
          <br> <h3> ${
            type === "sales" ? "Buyer Signature" : "Vendor Signature"
          }</h3>
          </div>
          <div class="signature-line">
          <h3> Authorized Signature </h3>
  <h5> ( for ${businessName || "Business"} ) </h5>  
          </div>
          
        </div>

        <script>
          setTimeout(() => {
            window.print();
            window.close();
          }, 500);
        </script>

      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
};
