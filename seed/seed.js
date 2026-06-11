require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const User = require('../models/User');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');
};

// ── Seed Data ────────────────────────────────────────────────────────────────

const restaurants = [
  {
    name: "Pizza Paradise",
    cuisine: ["Italian", "Pizza"],
    category: "Pizza",
    rating: 4.5,
    totalRatings: 1240,
    deliveryTime: "25-35 min",
    deliveryFee: 30,
    minOrder: 199,
    isVeg: false,
    offer: "50% OFF up to ₹100",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    address: { street: "College Road", city: "Nashik", state: "Maharashtra", pincode: "422005" },
    tags: ["pizza", "pasta", "italian", "cheesy"],
  },
  {
    name: "Burger Barn",
    cuisine: ["American", "Burgers"],
    category: "Burger",
    rating: 4.3,
    totalRatings: 876,
    deliveryTime: "20-30 min",
    deliveryFee: 0,
    minOrder: 149,
    isVeg: false,
    offer: "Free Delivery",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    address: { street: "Mumbai Naka", city: "Nashik", state: "Maharashtra", pincode: "422001" },
    tags: ["burger", "fries", "fast food", "american"],
  },
  {
    name: "Biryani House",
    cuisine: ["Mughlai", "Biryani"],
    category: "Biryani",
    rating: 4.7,
    totalRatings: 2100,
    deliveryTime: "35-45 min",
    deliveryFee: 30,
    minOrder: 249,
    isVeg: false,
    offer: "30% OFF on orders above ₹499",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400",
    address: { street: "Mahatma Nagar", city: "Nashik", state: "Maharashtra", pincode: "422007" },
    tags: ["biryani", "mughlai", "dum", "spicy"],
  },
  {
    name: "Dragon Palace",
    cuisine: ["Chinese", "Asian"],
    category: "Chinese",
    rating: 4.2,
    totalRatings: 654,
    deliveryTime: "30-40 min",
    deliveryFee: 40,
    minOrder: 199,
    isVeg: false,
    offer: "",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400",
    address: { street: "Gangapur Road", city: "Nashik", state: "Maharashtra", pincode: "422013" },
    tags: ["chinese", "noodles", "fried rice", "manchurian"],
  },
  {
    name: "Sushi Zen",
    cuisine: ["Japanese", "Sushi"],
    category: "Sushi",
    rating: 4.6,
    totalRatings: 432,
    deliveryTime: "40-50 min",
    deliveryFee: 60,
    minOrder: 399,
    isVeg: false,
    offer: "New! Free miso soup on orders above ₹599",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
    address: { street: "Trimbak Road", city: "Nashik", state: "Maharashtra", pincode: "422002" },
    tags: ["sushi", "japanese", "healthy", "raw fish"],
  },
  {
    name: "Sweet Dreams Bakery",
    cuisine: ["Desserts", "Bakery"],
    category: "Desserts",
    rating: 4.8,
    totalRatings: 1890,
    deliveryTime: "20-30 min",
    deliveryFee: 20,
    minOrder: 99,
    isVeg: true,
    offer: "Buy 2 Get 1 Free on cakes",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400",
    address: { street: "Sharanpur Road", city: "Nashik", state: "Maharashtra", pincode: "422002" },
    tags: ["desserts", "cakes", "pastry", "sweet", "veg"],
  },
  {
    name: "South Indian Delight",
    cuisine: ["South Indian", "Tamil"],
    category: "South Indian",
    rating: 4.4,
    totalRatings: 1560,
    deliveryTime: "25-35 min",
    deliveryFee: 25,
    minOrder: 149,
    isVeg: true,
    offer: "10% OFF for new users",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400",
    address: { street: "Panchvati", city: "Nashik", state: "Maharashtra", pincode: "422003" },
    tags: ["south indian", "dosa", "idli", "veg", "authentic"],
  },
  {
    name: "Green Bowl",
    cuisine: ["Healthy", "Salads"],
    category: "Healthy",
    rating: 4.3,
    totalRatings: 340,
    deliveryTime: "20-30 min",
    deliveryFee: 35,
    minOrder: 199,
    isVeg: true,
    offer: "Calorie count on every item",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    address: { street: "Pathardi Phata", city: "Nashik", state: "Maharashtra", pincode: "422010" },
    tags: ["healthy", "salad", "vegan", "protein", "fitness"],
  },
  {
    name: "Pasta Amore",
    cuisine: ["Italian", "Pasta"],
    category: "Pasta",
    rating: 4.4,
    totalRatings: 780,
    deliveryTime: "30-40 min",
    deliveryFee: 40,
    minOrder: 249,
    isVeg: false,
    offer: "20% OFF on weekdays",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
    address: { street: "Nashik Road", city: "Nashik", state: "Maharashtra", pincode: "422101" },
    tags: ["pasta", "italian", "creamy", "carbonara"],
  },
  {
    name: "Thirsty Treats",
    cuisine: ["Drinks", "Juices", "Shakes"],
    category: "Drinks",
    rating: 4.5,
    totalRatings: 920,
    deliveryTime: "15-25 min",
    deliveryFee: 20,
    minOrder: 79,
    isVeg: true,
    offer: "Free bottle of water with every order",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400",
    address: { street: "Dwarka Circle", city: "Nashik", state: "Maharashtra", pincode: "422011" },
    tags: ["drinks", "juice", "shakes", "smoothie", "cold coffee"],
  },
];

// Menu items per restaurant
const menuData = {
  "Pizza Paradise": [
    { name: "Margherita Pizza", description: "Classic tomato sauce, fresh mozzarella and basil", price: 249, category: "Pizzas", isVeg: true, isBestseller: true, spiceLevel: "mild" },
    { name: "Pepperoni Blast", description: "Loaded with double pepperoni and mozzarella", price: 349, category: "Pizzas", isVeg: false, isBestseller: true, spiceLevel: "medium" },
    { name: "BBQ Chicken Pizza", description: "Tangy BBQ sauce, grilled chicken, onions", price: 379, category: "Pizzas", isVeg: false, spiceLevel: "medium" },
    { name: "Farmhouse Pizza", description: "Garden fresh vegetables and herbs", price: 299, category: "Pizzas", isVeg: true, spiceLevel: "mild" },
    { name: "Pasta Arrabiata", description: "Spicy tomato pasta with penne", price: 199, category: "Pastas", isVeg: true, spiceLevel: "spicy" },
    { name: "Garlic Bread", description: "Toasted baguette with garlic butter", price: 99, category: "Sides", isVeg: true, isBestseller: true, spiceLevel: "mild" },
    { name: "Tiramisu", description: "Classic Italian coffee dessert", price: 149, category: "Desserts", isVeg: true, spiceLevel: "mild" },
  ],
  "Burger Barn": [
    { name: "Classic Beef Burger", description: "100% beef patty, lettuce, tomato, special sauce", price: 179, category: "Burgers", isVeg: false, isBestseller: true, spiceLevel: "mild" },
    { name: "Crispy Chicken Burger", description: "Crunchy fried chicken fillet with coleslaw", price: 199, category: "Burgers", isVeg: false, isBestseller: true, spiceLevel: "medium" },
    { name: "Veggie Burger", description: "Aloo tikki with fresh veggies and mint chutney", price: 139, category: "Burgers", isVeg: true, spiceLevel: "mild" },
    { name: "Double Smash Burger", description: "Double patty, double cheese, double joy", price: 299, category: "Burgers", isVeg: false, spiceLevel: "medium" },
    { name: "Loaded Fries", description: "Crispy fries with cheese sauce and jalapenos", price: 129, category: "Sides", isVeg: true, isBestseller: true, spiceLevel: "spicy" },
    { name: "Onion Rings", description: "Golden fried onion rings with dipping sauce", price: 99, category: "Sides", isVeg: true, spiceLevel: "mild" },
    { name: "Chocolate Shake", description: "Thick and creamy chocolate milkshake", price: 149, category: "Drinks", isVeg: true, spiceLevel: "mild" },
  ],
  "Biryani House": [
    { name: "Chicken Dum Biryani", description: "Aromatic basmati rice cooked with tender chicken", price: 299, category: "Biryani", isVeg: false, isBestseller: true, spiceLevel: "medium" },
    { name: "Mutton Biryani", description: "Slow-cooked mutton with fragrant spices", price: 379, category: "Biryani", isVeg: false, isBestseller: true, spiceLevel: "spicy" },
    { name: "Veg Biryani", description: "Mixed vegetables and basmati with saffron", price: 229, category: "Biryani", isVeg: true, spiceLevel: "medium" },
    { name: "Hyderabadi Biryani", description: "Original Hyderabadi style with raita", price: 329, category: "Biryani", isVeg: false, spiceLevel: "spicy" },
    { name: "Chicken Tikka", description: "Tandoor grilled chicken with mint chutney", price: 249, category: "Starters", isVeg: false, isBestseller: true, spiceLevel: "medium" },
    { name: "Raita", description: "Fresh yoghurt with cucumber and mint", price: 59, category: "Sides", isVeg: true, spiceLevel: "mild" },
    { name: "Gulab Jamun", description: "Soft milk dumplings in sugar syrup", price: 79, category: "Desserts", isVeg: true, spiceLevel: "mild" },
  ],
  "Dragon Palace": [
    { name: "Chicken Fried Rice", description: "Wok-tossed rice with egg and vegetables", price: 199, category: "Rice", isVeg: false, isBestseller: true, spiceLevel: "medium" },
    { name: "Veg Hakka Noodles", description: "Stir-fried noodles with crispy vegetables", price: 169, category: "Noodles", isVeg: true, isBestseller: true, spiceLevel: "medium" },
    { name: "Chicken Manchurian", description: "Crispy chicken balls in Manchurian sauce", price: 249, category: "Starters", isVeg: false, spiceLevel: "spicy" },
    { name: "Spring Rolls", description: "Crispy rolls filled with mixed vegetables", price: 149, category: "Starters", isVeg: true, spiceLevel: "mild" },
    { name: "Chilli Paneer", description: "Cottage cheese tossed with bell peppers", price: 229, category: "Main Course", isVeg: true, isBestseller: true, spiceLevel: "spicy" },
    { name: "Hot & Sour Soup", description: "Classic Indo-Chinese soup with tofu", price: 119, category: "Soups", isVeg: true, spiceLevel: "medium" },
  ],
  "Sushi Zen": [
    { name: "California Roll", description: "Crab, avocado, cucumber (8 pcs)", price: 449, category: "Rolls", isVeg: false, isBestseller: true, spiceLevel: "mild" },
    { name: "Salmon Nigiri", description: "Fresh salmon on seasoned rice (2 pcs)", price: 349, category: "Nigiri", isVeg: false, spiceLevel: "mild" },
    { name: "Vegetable Maki", description: "Cucumber, avocado, carrot roll (6 pcs)", price: 299, category: "Maki", isVeg: true, spiceLevel: "mild" },
    { name: "Spicy Tuna Roll", description: "Tuna with spicy mayo (8 pcs)", price: 499, category: "Rolls", isVeg: false, isBestseller: true, spiceLevel: "spicy" },
    { name: "Edamame", description: "Steamed salted soybean pods", price: 149, category: "Sides", isVeg: true, spiceLevel: "mild" },
    { name: "Miso Soup", description: "Traditional Japanese miso with tofu", price: 99, category: "Soups", isVeg: true, spiceLevel: "mild" },
  ],
  "Sweet Dreams Bakery": [
    { name: "Chocolate Truffle Cake", description: "Rich dark chocolate ganache cake", price: 349, category: "Cakes", isVeg: true, isBestseller: true, spiceLevel: "mild" },
    { name: "Strawberry Cheesecake", description: "Creamy cheesecake with fresh strawberries", price: 299, category: "Cakes", isVeg: true, spiceLevel: "mild" },
    { name: "Croissant", description: "Buttery flaky French pastry", price: 79, category: "Bakery", isVeg: true, isBestseller: true, spiceLevel: "mild" },
    { name: "Cinnamon Roll", description: "Warm roll with cream cheese frosting", price: 89, category: "Bakery", isVeg: true, spiceLevel: "mild" },
    { name: "Brownie", description: "Fudgy dark chocolate brownie", price: 69, category: "Baked Goods", isVeg: true, isBestseller: true, spiceLevel: "mild" },
    { name: "Macarons (6 pcs)", description: "Assorted French macarons", price: 249, category: "Patisserie", isVeg: true, spiceLevel: "mild" },
    { name: "Tiramisu Cup", description: "Individual tiramisu dessert cup", price: 149, category: "Desserts", isVeg: true, spiceLevel: "mild" },
  ],
  "South Indian Delight": [
    { name: "Masala Dosa", description: "Crispy crepe with spiced potato filling", price: 129, category: "Dosas", isVeg: true, isBestseller: true, spiceLevel: "medium" },
    { name: "Idli Sambhar (3 pcs)", description: "Steamed rice cakes with sambhar and chutney", price: 99, category: "Idli", isVeg: true, isBestseller: true, spiceLevel: "mild" },
    { name: "Medu Vada (2 pcs)", description: "Crispy lentil donuts with coconut chutney", price: 89, category: "Snacks", isVeg: true, spiceLevel: "mild" },
    { name: "Rava Dosa", description: "Semolina dosa with onions and green chilli", price: 139, category: "Dosas", isVeg: true, spiceLevel: "medium" },
    { name: "Uttapam", description: "Thick pancake with tomato and onion topping", price: 119, category: "Dosas", isVeg: true, spiceLevel: "mild" },
    { name: "Filter Coffee", description: "Traditional South Indian drip coffee", price: 59, category: "Drinks", isVeg: true, isBestseller: true, spiceLevel: "mild" },
    { name: "Pongal", description: "Comfort rice and lentil dish with ghee", price: 109, category: "Specials", isVeg: true, spiceLevel: "mild" },
  ],
  "Green Bowl": [
    { name: "Protein Power Bowl", description: "Quinoa, grilled chicken, avocado, boiled egg", price: 349, category: "Bowls", isVeg: false, isBestseller: true, spiceLevel: "mild" },
    { name: "Greek Salad", description: "Cucumber, olives, feta cheese, tomato", price: 249, category: "Salads", isVeg: true, spiceLevel: "mild" },
    { name: "Acai Bowl", description: "Acai puree, granola, banana, berries", price: 299, category: "Bowls", isVeg: true, isBestseller: true, spiceLevel: "mild" },
    { name: "Detox Green Smoothie", description: "Spinach, cucumber, apple, ginger", price: 179, category: "Drinks", isVeg: true, spiceLevel: "mild" },
    { name: "Grilled Chicken Salad", description: "Romaine, grilled chicken, caesar dressing", price: 299, category: "Salads", isVeg: false, spiceLevel: "mild" },
    { name: "Overnight Oats", description: "Oats, chia, almond milk, mixed fruits", price: 199, category: "Breakfast", isVeg: true, spiceLevel: "mild" },
  ],
  "Pasta Amore": [
    { name: "Spaghetti Carbonara", description: "Creamy egg sauce, pancetta, parmesan", price: 299, category: "Pasta", isVeg: false, isBestseller: true, spiceLevel: "mild" },
    { name: "Penne Arrabiata", description: "Spicy tomato sauce with garlic and basil", price: 249, category: "Pasta", isVeg: true, isBestseller: true, spiceLevel: "spicy" },
    { name: "Fettuccine Alfredo", description: "Rich butter cream sauce with parmesan", price: 279, category: "Pasta", isVeg: true, spiceLevel: "mild" },
    { name: "Lasagna", description: "Layered pasta with beef and bechamel", price: 329, category: "Baked", isVeg: false, spiceLevel: "medium" },
    { name: "Bruschetta", description: "Toasted bread with tomato basil topping", price: 129, category: "Starters", isVeg: true, spiceLevel: "mild" },
    { name: "Tiramisu", description: "Classic Italian coffee dessert", price: 179, category: "Desserts", isVeg: true, isBestseller: true, spiceLevel: "mild" },
  ],
  "Thirsty Treats": [
    { name: "Cold Coffee", description: "Chilled espresso with milk and ice cream", price: 99, category: "Coffee", isVeg: true, isBestseller: true, spiceLevel: "mild" },
    { name: "Mango Lassi", description: "Thick and creamy mango yogurt drink", price: 89, category: "Lassi", isVeg: true, isBestseller: true, spiceLevel: "mild" },
    { name: "Fresh Lime Soda", description: "Refreshing lime with sparkling water", price: 59, category: "Sodas", isVeg: true, spiceLevel: "mild" },
    { name: "Oreo Milkshake", description: "Blended Oreo cookies with vanilla ice cream", price: 149, category: "Shakes", isVeg: true, isBestseller: true, spiceLevel: "mild" },
    { name: "Watermelon Juice", description: "Fresh squeezed watermelon, no sugar added", price: 79, category: "Juices", isVeg: true, spiceLevel: "mild" },
    { name: "Virgin Mojito", description: "Mint, lime, sugar, sparkling water", price: 99, category: "Mocktails", isVeg: true, spiceLevel: "mild" },
    { name: "Mixed Fruit Smoothie", description: "Banana, mango, strawberry blend", price: 129, category: "Smoothies", isVeg: true, spiceLevel: "mild" },
  ],
};

// ── Seed function ─────────────────────────────────────────────────────────────

const seed = async () => {
  await connectDB();

  try {
    // Clear existing data
    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});
    await User.deleteMany({ email: 'demo@sevenbites.com' }); // Only delete demo user

    console.log('🗑️  Cleared old restaurant and menu data');

    // Create restaurants
    const createdRestaurants = await Restaurant.insertMany(restaurants);
    console.log(`🍽️  Created ${createdRestaurants.length} restaurants`);

    // Create menu items
    let totalItems = 0;
    for (const restaurant of createdRestaurants) {
      const items = menuData[restaurant.name];
      if (!items) continue;

      const withRestaurantId = items.map((item) => ({
        ...item,
        restaurantId: restaurant._id,
      }));

      await MenuItem.insertMany(withRestaurantId);
      totalItems += items.length;
    }
    console.log(`🍕  Created ${totalItems} menu items`);

    // Create a demo user
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@sevenbites.com',
      password: 'demo123',
      phone: '9876543210',
    });
    console.log(`👤  Demo user: demo@sevenbites.com / demo123`);

    console.log('\n✅ Seed complete!');
    console.log('   Start server: npm run dev');
    console.log('   API base URL: http://localhost:5000/api');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
