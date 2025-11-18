require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require('bcrypt');
const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get('/',(req,res)=>{
  return res.json("i am Basit fron backend")
})

app.post('/signup', async (req, res) => {
  const { name, email, password, phone, city } = req.body;
  console.log("signup data", name, email, password, phone, city)
  try {
    const hashedPassword = await bcrypt.hash(password, 10); 
    const query = `INSERT INTO  technicians_users (name, email, password, phone, city) VALUES (?, ?, ?, ?, ?)`; 
    db.query(query, [name, email, hashedPassword, phone, city], (err, result) => {
      if (err) {
        console.error('Error creating user:', err);
        return res.status(500).send(err);
      }
      res.send({ message: 'User created successfully' });
    });
  } catch (error) {
    res.status(500).send({ message: 'Error hashing password' });
  }
});

// Login API with bcrypt password verification
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM technicians_users WHERE email = ?`;
  db.query(query, [email], async (err, result) => {
    if (err || result.length === 0) {
      console.error('User not found:', err);
      return res.status(404).send({ message: 'User not found' });
    }
    const user = result[0];
    const passwordMatch = await bcrypt.compare(password, user.password); 
    if (!passwordMatch) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }
    res.send({ userId: user.user_id, message: 'Login successful' });
  });
});
// Login user upload image API 
app.post("/upload-profile-image", async (req, res) => {
  const { user_id, image_url } = req.body;
  if (!user_id || !image_url) return res.status(400).json({ error: "Missing fields" });
  const query = "INSERT INTO technician_images (user_id, image_url) VALUES (?, ?) ON DUPLICATE KEY UPDATE image_url = ?";
  db.query(query, [user_id, image_url, image_url], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Profile image updated successfully" });
  });
});
// usreimage displaying
app.get("/user_images/:storedUserId", (req, res) => {
  const storedUserId = req.params.storedUserId;
  const sql = "SELECT image_url FROM technician_images WHERE user_id = ? LIMIT 1"
  db.query(sql, [storedUserId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }   
    if (result.length > 0) {
      res.json({ image_url: result[0].image_url });
    } else {
      res.status(404).json({ message: "No image found for this user" });
    }
  });
});

app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT user_id, name, email, phone, city FROM technicians_users WHERE user_id = ?";
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);  
      return res.status(500).json({ error: "Database error" });
    } 
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(results[0]);
  });
});
// update technican users login data
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email, phone, city } = req.body;
  console.log(name, email, phone, city )
  db.query(
    "UPDATE technicians_users SET name = ?, email = ?, phone = ?, city = ? WHERE user_id = ?",
    [name, email, phone, city, userId],
    (err, result) => {
      if (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({ message: "User updated successfully" });
    }
  );
});
// Splash screens APIs
app.get('/splash-image',(req,res)=>{
  const query='SELECT * FROM logo_image WHERE id = 5'
  db.query(query,(err,result)=>{
     if(err) throw err;
     res.json(result)
  })
})
app.get('/splash-image2',(req,res)=>{
  const query='SELECT * FROM logo_image WHERE id =7'
  db.query(query,(err,result)=>{
     if(err) throw err;
     res.json(result)
  })
})
// Api for fetching Logo image //
app.get('/logo_image',(req,res)=>{
   const query='SELECT * FROM logo_image WHERE id = 6'
   db.query(query,(err,result)=>{
      if(err) throw err;
      res.json(result)
   })
})
// sliderimages //
app.get('/sliderimages', (req, res) => {
  const query = 'SELECT * FROM sliderimages';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});
// APi for fecthing categories //
app.get('/categories', (req, res) => {
  const query = 'SELECT * FROM categories';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching categories:', err);
          res.status(500).json({ error: 'Database error' });
      } else {
          res.json(results);
      }
  });
});
// API to fetch subcategories by categoryId //
app.get('/categories/:categoryId/subcategories', (req, res) => {
  const { categoryId } = req.params;
  const query = 'SELECT * FROM subcategories WHERE category_Id = ?';
  db.query(query, [categoryId], (err, results) => {
      if (err) {
          console.error('Error fetching subcategories:', err);
          res.status(500).json({ error: 'Database error' });
      } else {
          res.json(results);
      }
  });
});
// API for products//
app.get('/subcategories/:subcategoryId/products', (req, res) => {
  const { subcategoryId } = req.params;
  const query = 'SELECT * FROM products WHERE subcategory_Id = ?';
  db.query(query, [subcategoryId], (err, results) => {
      if (err) {
          console.error('Error fetching products:', err);
          res.status(500).json({ error: 'Database error' });
      } else {
          res.json(results);
      }
  });
});

// 1. POST /cart: Add product to the cart
app.post('/cart', (req, res) => {
  const { user_id, id, quantity,name,price,image_url,selectedColor} = req.body;
  // Query to check if the product is already in the cart (the id is Product-id) //
  const checkQuery = `SELECT * FROM cart WHERE user_id = ? AND id = ?`;
  db.query(checkQuery, [user_id,id], (err, result) => {
    if (err) {
      console.error('Error checking cart:', err);
      return res.status(500).send({ message: 'Error checking cart' });
    }
    // If the product is already in the cart, update the quantity
    if (result.length > 0) {
      const updateQuery = `UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND id = ?`;
      db.query(updateQuery, [quantity, user_id, id,name,price,image_url,selectedColor ], (err, updateResult) => {
        if (err) {
          console.error('Error updating cart:', err);
          return res.status(500).send({ message: 'Error updating cart' });
        }
        return res.send({ message: 'Cart updated successfully' });
      });
    } else {
      // If the product is not in the cart, insert a new entry
      const insertQuery = `INSERT INTO cart (user_id, id, quantity,name,price ,image_url,selectedColor) VALUES (?,?,?, ?, ?,?,?)`;
      db.query(insertQuery, [user_id, id, quantity,name ,price,image_url,selectedColor], (err, insertResult) => {
        if (err) {
          console.error('Error adding to cart:', err);
          return res.status(500).send({ message: 'Error adding to cart' });
        }
        return res.send({ message: 'Product added to cart successfully' });
      });
    }
  });
});

// GET /cart: Retrieve cart items for a specific user
app.get('/cart/:user_id', (req, res) => {
  const { user_id } = req.params;
  const sql = `SELECT * FROM cart WHERE user_id = ?`;
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      return res.status(500).send('Failed to fetch cart items');
    }
    res.status(200).json(results);
  });
});

// PUT /cart/:id: Update the quantity of a product in the cart for a specific user
app.put('/cart/:id', (req, res) => {
  const { quantity, user_id } = req.body; 
  const cart_Id = req.params.id; 
  // Check that the necessary data is provided
  if (!quantity || !user_id || !cart_Id) {
    return res.status(400).send({ message: 'Invalid data provided.' });
  }
  const sql = 'UPDATE cart SET quantity = ? WHERE cart_id = ? AND user_id = ?';
  db.query(sql, [quantity, cart_Id, user_id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Cart item not found.' });
    }
    res.status(200).send({ message: 'Quantity updated successfully.' });
  });
});

// DELETE /cart/:id: Remove a product from the cart for a specific user
app.delete('/cart/:user_id/:cart_id', (req, res) => {
  const { user_id, cart_id } = req.params;
  const sql = 'DELETE FROM cart WHERE user_id = ? AND cart_id = ?';
  db.query(sql, [user_id, cart_id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: 'Failed to remove item from cart', error: err });
    }
    res.status(200).send({ message: 'Item removed successfully' });
  });
});

// API Endpoint to save address
// app.post('/save_address', (req, res) => {
//   const { user_id, name, phone, city, address } = req.body;

//   if (!user_id || !name || !phone || !city || !address) {
//       return res.status(400).json({ error: 'All fields are required' });
//   }

//   const query = 'INSERT INTO addresses (user_id, name, phone, city, address) VALUES (?, ?, ?, ?, ?)';
//   db.query(query, [user_id, name, phone, city, address], (err, result) => {
//       if (err) {
//           return res.status(500).json({ error: 'Database error', details: err });
//       }
//       res.status(200).json({ message: 'Address saved successfully', address_id: result.insertId });
//   });
// });
// API Endpoint to Place an Order
app.post('/orders', (req, res) => {
  console.log('📥 Incoming API Request:', req.body);
  const { user_id, name, phone, city, address, receipt_url, subtotal, shipping_charges, total_amount, cart_items } = req.body;
  if (!user_id || !name || !phone || !city || !address || !subtotal || !shipping_charges || !total_amount || !cart_items) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  // Insert order details into the apporders table
  const insertOrderQuery = `
    INSERT INTO apporders (user_id, name, phone, city, address, receipt_url, subtotal, shipping_charges, total_amount) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(insertOrderQuery, [user_id, name, phone, city, address, receipt_url, subtotal, shipping_charges, total_amount], (err, result) => {
    if (err) {
      console.error('❌ Order Insertion Error:', err);
      return res.status(500).json({ error: 'Database error while inserting order' });
    }
    const order_id = result.insertId;
    console.log('✅ Order Inserted with ID:', order_id);
    // Insert each cart item into the apporder_items table
    const insertItemsQuery = `
      INSERT INTO apporder_items (order_id, name, quantity, price) VALUES ?`;
    const cartItemsData = cart_items.map(item => [order_id, item.name, item.quantity, item.price]);
    db.query(insertItemsQuery, [cartItemsData], (err, itemResult) => {
      if (err) {
        console.error('❌ Cart Items Insertion Error:', err);
        return res.status(500).json({ error: 'Database error while inserting cart items' });
      }
      console.log('✅ Cart Items Inserted:', itemResult.affectedRows);
      res.status(201).json({ message: 'Order placed successfully', order_id });
    });
  });
});
// Api to fetch login/signup background image
app.get("/loginbg",(req,res)=>{
  const query= "SELECT * FROM loginbg WHERE id=3";
  db.query(query,(err,result)=>{
   if(err) throw err;
   res.json(result)
  })
})
// APi for technicinas finding
app.post('/get-nearest-technicians', (req, res) => {
  const { latitude, longitude ,radius = 10} = req.body; // Default radius: 10 KM
  console.log("📩 Received Request for Nearest Technicians");
  console.log("📍 Received User Location:", latitude, longitude);
  if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and Longitude are required' });
  }
  // Find Nearest Technician (Using Haversine Formula)
  const findQuery = `
      SELECT id, name, phone, email, address, shop_address, latitude, longitude,
          (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(?)) 
          + SIN(RADIANS(?)) * SIN(RADIANS(latitude)))) AS distance
      FROM technicians
      HAVING distance < ?
      ORDER BY distance ASC
      LIMIT 5;
  `;
  db.query(findQuery, [latitude, longitude, latitude, radius], (err, technicians) => {
      if (err) {
          console.error('❌ Error fetching technicians:', err);
          return res.status(500).json({ error: 'Error finding nearest technician' });
      }
      res.json({ technicians });
  });
});
// techiincian Profile APi
app.post('/add-technician', (req, res) => {
  const { user_id, name, phone, email, image_url, address, shop_address, latitude, longitude } = req.body;
  console.log(name, user_id, phone, email, image_url, address, shop_address, latitude, longitude);
  // Validate required fields
  if (!name || !phone || !email || !address || !shop_address) {
      return res.status(400).json({ message: "All required fields must be filled" });
  }
  const sql = "INSERT INTO technicians_profiles (user_id, name, phone, email, image_url, address, shop_address, latitude, longitude, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [user_id, name, phone, email, image_url, address, shop_address, latitude, longitude, "In Progress"], (err, result) => {
      if (err) return res.status(500).json({ message: "You have already made a profile from this id", error: err });
      const technician_id = result.insertId;  // Get inserted ID
      res.status(201).json({ 
          message: "Technician added successfully!", 
          technician_id  // Send `technician_id` in response
      });
  });
});
// API to display bookings of logedin mechanic
app.get('/bookings', async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  const sql = 'SELECT * FROM bookings WHERE technician_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ message: 'Error retrieving bookings' });
    }
    res.status(200).json(results);
  });
});

// API to Fetch Bookings by Technician ID
app.post("/get-bookings", (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  const query = "SELECT * FROM bookings WHERE technician_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ bookings: results });
  });
});

app.post('/update-booking-status', (req, res) => {
  const { bookingId, status } = req.body;
  if (!bookingId || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const query = 'UPDATE bookings SET status = ? WHERE id = ?';
  db.query(query, [status, bookingId], (err, result) => {
    if (err) {
      console.error('Error updating booking status:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    return res.status(200).json({ message: 'Status updated successfully' });
  });
});
// technician profile APIs that has loggedin
app.get('/technician-profile', (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }
  const query = 'SELECT * FROM technicians_profiles WHERE user_id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching technician profile:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Technician profile not found' });
    }
    return res.status(200).json(result[0]); // Return a single object
  });
});
// ✅ POST API: Update Technician Profile
app.post('/update-technician-profile', (req, res) => {
  const { userId, name, phone, email, image_url, address, shop_address, latitude, longitude, status } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }
  const query = `
    UPDATE technicians_profiles 
    SET name = ?, phone = ?, email = ?, image_url = ?, address = ?, shop_address = ?, latitude = ?, longitude = ?, status = ? 
    WHERE user_id = ?
  `;
  db.query(query, [name, phone, email, image_url, address, shop_address, latitude, longitude, status, userId], (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Technician profile not found' });
    }
    return res.status(200).json({ message: 'Profile updated successfully' });
  });
});
// FAQs APi
app.get("/faqs", (req, res) => {
  db.query("SELECT * FROM faqs", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database query failed." });
    } else {
      res.json(results);
    }
  });
});
//  this API is for fetching all products//
app.get("/products",(req,res)=>{
   const query='SELECT * FROM products'
   db.query(query,(err,result)=>{
    if(err) throw err;
    res.json(result)
   })
})

app.get('/api/users/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = 'SELECT name FROM users WHERE user_id = ?';
  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching user name:', error);
      return res.status(500).json({ message: 'Failed to fetch user name' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ userName: results[0].name });
  });
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
