import html2pdf from "html2pdf.js";

/**
 * Download a specific bill section as PDF.
 * @param {string} elementId - DOM element ID of the bill section.
 * @param {string} filename - File name for the downloaded PDF.
 */
export const downloadBillAsPDF = (elementId, filename = "bill.pdf") => {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with ID '${elementId}' not found.`);
    return;
  }

  // If hidden, make it visible temporarily
  const originalDisplay = element.style.display;
  element.style.display = "block";

  html2pdf()
    .set({
      margin: 0.5,
      filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    })
    .from(element)
    .save()
    .then(() => {
      element.style.display = originalDisplay;
    })
    .catch((err) => {
      console.error("PDF download failed:", err);
    });
};

/**
 * Print a specific bill section.
 * @param {string} elementId - DOM element ID of the bill section.
 */
export const printBill = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID '${elementId}' not found.`);
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
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          h1, h2, h3, h4, h5 { margin: 10px 0; }
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
