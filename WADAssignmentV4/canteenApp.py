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
            ('Chicken Rice', 'Main', 4.50),
            ('Fish and Chips', 'Main', 6.80),
            ('Vegetable Salad', 'Side', 3.20),
            ('Iced Tea', 'Beverage', 1.50)
        ]
        db.executemany('INSERT INTO menu(name, category, price) VALUES(?,?,?)', sample_menu)
        
        db.commit()
        print("Database with menu initialized successfully!")
        
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == '__main__':
    initialize_database()