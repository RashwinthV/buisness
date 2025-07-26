export const printTransactionEntry = (form, type, businessInfo) => {
  const { businessName, businessEmail, logo } =
    businessInfo || {};

  const printWindow = window.open("", "_blank");

  const subtotal = form.products.reduce(
    (sum, p) => sum + (p.qty || 0) * (p.rate || 0),
    0
  );
  const discountPercentage = form.commonDiscount || 0;
  const totalDiscount = subtotal * (discountPercentage / 100);
  const grandTotal = subtotal - totalDiscount;

  printWindow.document.write(`
    <html>
      <head>
        <title>${type === "sales" ? "Sales" : "Purchase"} Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
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

          .header-col {
            width: 33%;
            font-size: 14px;
          }

          .header-center {
            text-align: center;
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

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 14px;
             border: 1px solid #ccc; /* border around entire table */
          }

 th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
}

th {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

td {
  font-size: 13px;
  color: #333;
}

.totals {
  margin-top: 20px;
  text-align: right;
  font-size: 15px;
  color: #333;
}

.totals p {
  margin: 4px 0;
  font-weight: 500;
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
 <img 
    src="${logo?.imageUrl || ""}" 
    style="
      position: fixed;
      top: 40%;
      left: 50%;
      width: 500px;
      height: 500px;
      opacity: 0.05;
      transform: translate(-50%, -50%);
      z-index: 0;
      pointer-events: none;"
  />

        <!-- Header Section -->
<div style="display: flex; flex-direction: column; align-items: center; text-align: left; margin-bottom: 5px;">

  <!-- Logo -->
  <img
    src="${logo?.imageUrl || "https://via.placeholder.com/100"}"
    alt="Logo"
    style="width: 70px; height: 70px; object-fit: contain; margin-bottom: 5px;"
  />

  <!-- Business Info -->
  <div style="text-align: center;">
    <h2 style="margin: 0;">${businessName || "Business Name"}</h2>
<p style="margin: 2px 0;">
  E-Mail: ${businessEmail || "-"}
</p>
  </div>

</div>


<div style="text-align: center; margin-bottom: 3px;"> 
<h3> ${type === "sales" ? "Sales" : "Purchase"} Receipt</h3>
</div>  
<hr>

 <!-- Customer/Vendor Info (Below Business Info) -->
<div style="margin-top: 10px;">
  
  <div style="display: flex; justify-content: space-between; gap: 0; font-size: 14px;">
    
    <!-- Left:Customer details -->
    <div style="text-align: left;">
    <h3 style="margin-bottom: 8px;">${
      type === "sales" ? "Customer" : "Vendor"
    } Details :</h3>
      <h4 style="margin: 3px ;"><strong>Name:</strong> ${
        form.partyName || "-"
      }</h4>
      <h4 style="margin: 3px ;"><strong>Contact:</strong> ${
        form.partyContact || "-"
      }</h4>
       <h4 style="margin: 3px ;"><strong>Address :</strong> ${
         form.city || "-"
       } , ${form.pincode || "-"}</h4>

    </div>

   <!-- Transaction Info (Aligned Right) -->
    <div style="text-align: left;">
     <h3 style="margin-bottom: 8px;"> Receipt Details :</h3>
      <h4 style="margin: 3px 0;"><strong>Receipt No:</strong> ${
        form.entryId || "-"
      }</h4>
  <h4 style="margin: 3px 0;"><strong>${
    type === "sales" ? "Sales Incharge" : "Purchase Incharge"
  }:</strong> ${form.entryBy || "-"}</h4>
  <h4 style="margin: 3px 0;"><strong>Date:</strong> ${form.date || "-"}</h4>
    </div>

  </div>
</div>

<br>
<hr>

        <!-- Products Table -->
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Rate</th>
              <th>Quantity</th>
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
                  <td>₹${p.rate}</td>
                  <td>${p.qty}</td>
                  <td>₹${(p.qty * p.rate).toFixed(2)}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>

        <!-- Totals -->
        <div class="totals">
          <p><strong>Subtotal:</strong> ₹${subtotal.toFixed(2)}</p>
          <p><strong>Discount (${discountPercentage}%):</strong> ₹${totalDiscount.toFixed(
    2
  )}</p>
          <h3><strong>Grand Total:</strong> ₹${grandTotal.toFixed(2)}</h3>
        </div>

        <!-- Signatures -->
        <div class="footer">
          <div class="signature-line">
            <h3>${
              type === "sales" ? "Buyer Signature" : "Vendor Signature"
            }</h3>
          </div>
          <div class="signature-line">
            <h3>Authorized Signature</h3>
            <h5>(for ${businessName || "Business"})</h5>  
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
