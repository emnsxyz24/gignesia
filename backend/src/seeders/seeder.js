import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Service from "../models/Service.js";
import Category from "../models/Category.js";

dotenv.config();

const users = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "securePassword123",
    role: "client",
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    password: "freelancerPass456",
    role: "freelancer",
  },
  {
    name: "Mike Johnson",
    email: "mikejohnson@example.com",
    password: "designerSkills789",
    role: "freelancer",
  }
];

const categories = [
  { name: "Web Development", description: "Web development services" },
  { name: "Graphic Design", description: "Graphic design services" },
  { name: "Digital Marketing", description: "Digital marketing services" },
  { name: "Content Writing", description: "Content writing services" },
  { name: "Video Editing", description: "Video editing services" },
  { name: "Photography", description: "Photography services" }
];

const serviceTemplates = {
  "Web Development": [
    {
      title: "Professional Website Development",
      description: "Custom website design and development with responsive layout and modern features.",
      price: 5000000
    },
    {
      title: "WordPress Website Setup",
      description: "Complete WordPress site setup with custom theme and essential plugins.",
      price: 3000000
    }
  ],
  "Graphic Design": [
    {
      title: "Logo and Branding Design",
      description: "Professional logo creation and comprehensive branding package.",
      price: 2500000
    },
    {
      title: "Social Media Graphics Pack",
      description: "Custom graphics for social media platforms with consistent branding.",
      price: 1500000
    }
  ],
  "Digital Marketing": [
    {
      title: "Social Media Marketing Campaign",
      description: "Comprehensive social media strategy and content creation.",
      price: 3000000
    },
    {
      title: "SEO Optimization Package",
      description: "Complete SEO audit and optimization strategy for your website.",
      price: 4000000
    }
  ],
  "Content Writing": [
    {
      title: "Blog and Article Writing",
      description: "High-quality, SEO-optimized content writing for your website or blog.",
      price: 1500000
    },
    {
      title: "Copywriting Services",
      description: "Persuasive copy for websites, ads, and marketing materials.",
      price: 2000000
    }
  ],
  "Video Editing": [
    {
      title: "Professional Video Editing",
      description: "Cinematic video editing with color grading and sound design.",
      price: 4000000
    },
    {
      title: "YouTube Content Editing",
      description: "Engaging video edits optimized for YouTube and social media.",
      price: 2500000
    }
  ],
  "Photography": [
    {
      title: "Professional Photography Session",
      description: "High-quality photoshoot with professional editing and retouching.",
      price: 3500000
    },
    {
      title: "Product Photography Package",
      description: "Specialized product photography for e-commerce and marketing.",
      price: 2000000
    }
  ]
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      Category.deleteMany({})
    ]);
    console.log('Previous data cleared');

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );

    const createdUsers = await User.create(hashedUsers);
    console.log('Users seeded');

    const createdCategories = await Category.create(categories);
    console.log('Categories seeded');

    const freelancerUsers = createdUsers.filter(user => user.role === 'freelancer');
    const services = [];

    createdCategories.forEach((category, index) => {
      const freelancer = freelancerUsers[index % freelancerUsers.length];
      
      const categoryTemplates = serviceTemplates[category.name] || [];
      
      categoryTemplates.forEach(template => {
        services.push({
          title: template.title,
          description: template.description,
          category_id: category._id,
          price: template.price,
          freelancer_id: freelancer._id
        });
      });
    });

    await Service.create(services);
    console.log('Services seeded');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();