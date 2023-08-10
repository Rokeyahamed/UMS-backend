const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// ... other server code ...

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
