const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const navItems = require('./routes/navItems');
const contactInfo = require('./routes/contactInfo');
const carouselRoutes = require('./routes/carouselRouter');
const testimonialRoutes = require('./routes/testimonials');
const productRoutes = require('./routes/products'); // Import your product model
const pricingPlanRoutes = require('./routes/pricingPlanRoutes');
const blogRoutes = require('./routes/blogRoutes');
const teamMembersRoute = require('./routes/teamMembers');
const headingRoutes = require('./routes/headingRoutes');
const stepsRoutes = require('./routes/steps');
const projectRoutes = require('./routes/projects');
const heroRouter = require('./routes/heroRouter');
const contactRoutes = require('./routes/contactRoutes');
const emailRoutes = require('./routes/emailRoutes');
const historyRoutes = require('./routes/historyRoutes');
const teamSlider = require('./routes/teamSlider');
const companyFactsRouter = require('./routes/companyFacts');
const formRoutes = require('./routes/formRoutes');
const commentRoutes = require('./routes/commentRoutes');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productCart = require('./routes/productRoutes');
const customer=require("./routes/customerauth");
const cartRoutes = require('./routes/cartRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files
app.use(cookieParser());



// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


// Routes
app.use('/api/navItems', navItems);
app.use('/api/contactInfo', contactInfo);
app.use('/api/carouselItems', carouselRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/products', productRoutes);
app.use('/api/pricing-plans', pricingPlanRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/team-members', teamMembersRoute);
app.use('/api/heading',headingRoutes);
app.use('/api/steps', stepsRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/hero', heroRouter);
app.use('/api', contactRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/team', teamSlider);
app.use('/api/companyfacts', companyFactsRouter);
app.use('/api/forms', formRoutes);
app.use('/api', commentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', productCart);
app.use('/api/customer', customer);
app.use(cartRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});