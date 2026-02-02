const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const dogRoutes = require('./routes/dogs');

app.use('/api/auth', authRoutes);
app.use('/api/dogs', dogRoutes);

app.get('/', (req, res) => res.json({ status: 'ok' }));

const start = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

if (require.main === module) start();

module.exports = app;
