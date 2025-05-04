import sqlite3

def initialize_database():
    db = sqlite3.connect('canteen_app.sqlite')
    
    try:
        db.execute('PRAGMA foreign_keys = ON')
        
        # Drop tables in reverse dependency order
        db.execute('DROP TABLE IF EXISTS point_history')
        db.execute('DROP TABLE IF EXISTS transactions')
        db.execute('DROP TABLE IF EXISTS orders')
        db.execute('DROP TABLE IF EXISTS menu')  
        db.execute('DROP TABLE IF EXISTS wallets')
        db.execute('DROP TABLE IF EXISTS users')
        
        # Users table 
        db.execute('''CREATE TABLE users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            number TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            points INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )''')
        
        # Wallets table 
        db.execute('''CREATE TABLE wallets(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            balance REAL DEFAULT 0.0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )''')
        
        # Assume everything is available
        db.execute('''CREATE TABLE menu(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL CHECK(price > 0)
        )''')
        
       # orders table
        db.execute('''CREATE TABLE orders(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            total_products INTEGER NOT NULL,
            total_price REAL NOT NULL,
            points_used INTEGER DEFAULT 0,
            points_earned INTEGER DEFAULT 0,
            placed_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )''')
        
        # order items table
        #  to handle multiple items per order
        db.execute('''CREATE TABLE order_items(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            menu_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL CHECK(quantity > 0),
            price_at_order REAL NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
            FOREIGN KEY (menu_id) REFERENCES menu(id)
        )''')
        
       
        sample_menu = [
            # Promotion items
            ("Weekend Special Combo", "promotion", 8.99),
            ("Student Meal Deal", "promotion", 5.50),
            ("Family Bundle", "promotion", 15.99),
            
            # Burger items
            ("Classic Cheeseburger", "burger", 4.99),
            ("Bacon BBQ Burger", "burger", 6.49),
            ("Veggie Delight Burger", "burger", 5.25),
            
            # Noodle items
            ("Meatball Pasta", "noodle", 7.50),
            ("Seafood Agio Oglio", "noodle", 8.25),
            ("Vegetable Lo Mein", "noodle", 6.75),
            
            # Pizza items
            ("Margherita Pizza", "pizza", 9.99),
            ("Pepperoni Feast", "pizza", 11.50),
            ("Hawaiian Pizza", "pizza", 10.75),
            
            # Dessert items
            ("Chocolate Brownie", "dessert", 3.50),
            ("Apple Pie", "dessert", 3.75),
            ("Ice Cream Sundae", "dessert", 4.25),
            
            # Beverage items
            ("Iced Tea", "beverage", 1.99),
            ("Fresh Orange Juice", "beverage", 2.50),
            ("Soda Can", "beverage", 1.25)
            ]
        
        db.executemany('INSERT INTO menu(name, category, price) VALUES(?,?,?)', sample_menu)
    
        db.execute('''INSERT INTO users (name, email, number, password, points) VALUES(?, ?, ?, ?, ?) ''',
           (
               "YONG",
               "jonnysin@gmail.com",
               "123456789",
               "password123",
               150
           ))
        
    
        user_id = db.execute('SELECT last_insert_rowid()').fetchone()[0]
        
        
        db.execute('''
            INSERT INTO wallets (user_id, balance)
            VALUES (?, ?)
        ''', (user_id, 100.00))  

        db.commit()
        print("Database started successfully!")
        
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == '__main__':
    initialize_database()