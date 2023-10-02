function generateOrderID(lastOrderID) {
    const lastIDNumeric = parseInt(lastOrderID.replace(/\D/g, ''), 10) + 1;
  
    const formattedOrderID = `OD${lastIDNumeric.toString().padStart(6, '0')}`;
  
    return formattedOrderID;
  }
  
  
  module.exports ={generateOrderID}