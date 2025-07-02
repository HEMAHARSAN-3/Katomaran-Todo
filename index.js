require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema
const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  avatar: String,
  provider: String
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Google OAuth2 client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    let user = await User.findOne({ googleId: payload.sub });
    if (!user) {
      user = await User.create({
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
        avatar: payload.picture,
        provider: 'google'
      });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      provider: user.provider
    });
  } catch (err) {
    console.error('Google auth error:', err);
    res.status(401).json({ error: 'Invalid Google credential' });
  }
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 