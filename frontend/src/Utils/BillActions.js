// utils/billActions.js
import html2pdf from "html2pdf.js";

// Download PDF from element
export const downloadBillAsPDF = (elementId, filename = "bill.pdf") => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found for PDF download:", elementId);
    return;
  }

  html2pdf()
    .set({
      margin: 0.5,
      filename: filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    })
    .from(element)
    .save();
};

// Print the bill content
export const printBill = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found for printing:", elementId);
    return;
  }

  const printContents = element.innerHTML;
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Bill</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h5 { margin-bottom: 10px; }
          ul { list-style-type: none; padding: 0; }
        </style>
      </head>
      <body>${printContents}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
};
