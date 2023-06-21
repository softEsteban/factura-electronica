// Function for handling the sendBill endpoint
const sendBill = (req, res) => {
  // Logic for sending the bill
  const { billData } = req.body;

  // Send the response
  res.json({ message: "Bill sent successfully", billData });
};

// // Function for handling the getTest endpoint
// const getTest = (req, res) => {
//   // Send the response
//   res.json({ message: "This is a GET test method" });
// };

// Export the controller functions
module.exports = {
  sendBill,
  getTest,
};
