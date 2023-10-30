const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  
};

app.use(cors(corsOpts));
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
  res
    .status(200)
    .set("Content-Type", "application/json") // Set custom response headers here
   
    .json(stockData);
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
