// const express = require('express');
// const app = express();

// app.get("/api",(req,res)=>{
// res.json({"users":["userOne","userTwo","userThree"]})
// })

// app.listen(5000, ()=>{console.log("Server on Port 5000")})
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000
// your code



// Define a route that generates mock stock data
// Define a route that generates mock stock data
app.get("/api/search", (req, res) => {
  const symbol = req.query.symbol;
  const period = req.query.period;

  if (!symbol || !period) {
    return res
      .status(400)
      .json({ error: "Both symbol and period are required." });
  }

  // Generate mock stock data
  const stockData = {
    symbol,
    period,
    data: generateMockData(),
  };

  res.json(stockData);
});

// Generate mock stock data function without faker
function generateMockData() {
  const data = [];
  const currentDate = new Date(); // Start from the current date

  for (let i = 0; i < 10; i++) {
    // Calculate date for the next day
    currentDate.setDate(currentDate.getDate() + 1);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const close = getRandomNumber(100, 200, 2);
    const high = getRandomNumber(200, 250, 2);
    const low = getRandomNumber(50, 100, 2);
    const open = getRandomNumber(1000, 10000);

    data.push({
      time: formattedDate,
      close,
      high,
      low,
      open,
    });
  }
  return data;
}

// Generate a random number within a specified range
function getRandomNumber(min, max, decimalPlaces) {
  return +(Math.random() * (max - min) + min).toFixed(decimalPlaces);
}

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
