from flask import Flask, jsonify, request, abort
import sqlite3

app = Flask(__name__)
# wallet
@app.route('/wallets/balance', methods=['GET'])
def get_balance():
    user_id = request.args.get('user_id', type=int)  # Get the user_id from the query parameters
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    conn = sqlite3.connect('canteen_app.sqlite')
    # Query to get the user's wallet balance
    balance = conn.execute("SELECT balance FROM wallets WHERE user_id = ?", (user_id,)).fetchone()

    # Check if balance is None
    if balance is None:
        return jsonify({"error": "User not found"}), 404

    # Access the balance correctly as balance[0] (since it's the only column fetched)
    return jsonify({"balance": balance[0]}), 200

@app.route('/wallets/reload', methods=['POST'])
def reload_balance():
    # Get the data from the request body
    data = request.get_json()
    user_id = data.get('user_id')
    amount = data.get('amount')

    # Validate data
    if not user_id or not amount:
        return jsonify({"error": "user_id and amount are required"}), 400

    conn = sqlite3.connect('canteen_app.sqlite')
    conn.execute('''
        UPDATE wallets
        SET balance = balance + ?
        WHERE user_id = ?
    ''', (amount, user_id))
    conn.commit()

    return jsonify({"success": True}), 200

@app.route('/api/users/<int:user_id>', methods=['GET', 'PUT'])
def user(user_id):
    conn = None
    try:
        conn = sqlite3.connect('canteen_app.sqlite')
        conn.row_factory = lambda c, row: {c.description[i][0]: row[i] for i in range(len(row))}
        
        if request.method == 'GET':
            user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
            wallet = conn.execute("SELECT balance FROM wallets WHERE user_id = ?", (user_id,)).fetchone()
            
            if not user:
                abort(404)
            
            user['balance'] = wallet['balance'] if wallet else 0
            return jsonify(user)
        
        elif request.method == 'PUT':
            data = request.get_json()
            conn.execute(
                "UPDATE users SET name=?, email=?, number=? WHERE id=?",
                (data['name'], data['email'], data['number'], user_id)
            )
            conn.commit()
            return jsonify({"status": "success"})
            
    except sqlite3.Error as e:
        if conn:
            conn.rollback()
        abort(400, description=str(e))
    finally:
        if conn:
            conn.close()

# paying
@app.route('/orders', methods=['POST'])
def create_order():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        total_products = data.get('total_products')
        total_price = data.get('total_price')

        # Add your logic to insert the order into the database
        # For example, you could insert into an `orders` table
        conn = sqlite3.connect('canteen_app.sqlite')
        conn.execute('''
            INSERT INTO orders (user_id, total_products, total_price)
            VALUES (?, ?, ?)
        ''', (user_id, total_products, total_price))
        conn.commit()
        return jsonify({'success': True, 'message': 'Order created successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/wallets/<int:user_id>/deduct', methods=['POST'])
def deduct_balance(user_id):
    try:
        data = request.get_json()
        amount = data.get('amount')

        if not amount or amount <= 0:
            return jsonify({'error': 'Invalid amount'}), 400

        conn = sqlite3.connect('canteen_app.sqlite')
        # Deduct the amount from the user's wallet
        conn.execute('''
            UPDATE wallets
            SET balance = balance - ?
            WHERE user_id = ?
        ''', (amount, user_id))
        conn.commit()

        # Get the updated balance
        balance = conn.execute('''
            SELECT balance FROM wallets WHERE user_id = ?
        ''', (user_id,)).fetchone()

        if balance is None:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({'success': True, 'new_balance': balance[0]}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500   
    
    
@app.route('/order_items', methods=['POST'])
def create_order_item():
    try:
        data = request.get_json()
        print(f"Received data: {data}")  # Log the received data for debugging

        order_id = data.get('order_id')
        menu_id = data.get('menu_id')
        quantity = data.get('quantity')
        price_at_order = data.get('price_at_order')

        if not order_id or not menu_id or not quantity or not price_at_order:
            return jsonify({'error': 'Missing required fields'}), 400

        conn = sqlite3.connect('canteen_app.sqlite')
        conn.execute('''
            INSERT INTO order_items (order_id, menu_id, quantity, price_at_order)
            VALUES (?, ?, ?, ?)
        ''', (order_id, menu_id, quantity, price_at_order))
        conn.commit()

        return jsonify({'success': True, 'message': 'Order item created successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Connect to the SQLite database
def get_db_connection():
    conn = sqlite3.connect('canteen_app.sqlite')
    conn.row_factory = sqlite3.Row  # This allows us to access columns by name
    return conn

@app.route('/orders/history', methods=['GET'])
def get_order_history():
    user_id = request.args.get('user_id', type=int)  # Get the user_id from query parameters
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    conn = get_db_connection()
    
    try:
        # Query to get the order history based on user_id
        orders = conn.execute('''
            SELECT id, total_products, total_price, points_used, points_earned, placed_on
            FROM orders
            WHERE user_id = ?
            ORDER BY placed_on DESC
        ''', (user_id,)).fetchall()

        order_history = []
        for order in orders:
            # For each order, retrieve the associated items
            items = conn.execute('''
                SELECT oi.menu_id, oi.quantity, oi.price_at_order
                FROM order_items oi
                WHERE oi.order_id = ?
            ''', (order['id'],)).fetchall()

            order_history.append({
                "order_id": order['id'],
                "total_products": order['total_products'],
                "total_price": order['total_price'],
                "points_used": order['points_used'],
                "points_earned": order['points_earned'],
                "placed_on": order['placed_on'],
                "items": [
                    {
                        "menu_id": item['menu_id'],
                        "quantity": item['quantity'],
                        "price_at_order": item['price_at_order']
                    } for item in items
                ]
            })

        return jsonify({"order_history": order_history})

    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    conn = None
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"message": "Email and password are required"}), 400

        conn = sqlite3.connect('canteen_app.sqlite')
        conn.row_factory = sqlite3.Row 
        
        # Check if user exists
        user = conn.execute(
            "SELECT * FROM users WHERE email = ?", 
            (email,)
        ).fetchone()
        
        if not user:
            return jsonify({"message": "Invalid email or password"}), 401
        
        # Verify password (in production, use hashed passwords!)
        if user['password'] != password:
            return jsonify({"message": "Invalid email or password"}), 401
        
        # Get wallet balance
        wallet = conn.execute(
            "SELECT balance FROM wallets WHERE user_id = ?", 
            (user['id'],)
        ).fetchone()
        
        return jsonify({
            "id": user['id'],
            "name": user['name'],
            "email": user['email'],
            "points": user['points'],
            "balance": wallet['balance'] if wallet else 0
        })
        
    except sqlite3.Error as e:
        return jsonify({"message": "Database error"}), 500
    finally:
        if conn:
            conn.close()


def dict_factory(cur, row):
    return {col[0]: row[idx] for idx, col in enumerate(cur.description)}

# --- MENU (you already have this) ---
@app.route('/api/menu')
def get_menu():
    conn = sqlite3.connect('canteen_app.sqlite')
    conn.row_factory = dict_factory
    items = conn.execute("SELECT id, name, category, price FROM menu").fetchall()
    conn.close()
    return jsonify(items)

# --- CART ROUTES ---

# 1) GET all items in the current (open) order for a user
@app.route('/orders/items', methods=['GET'])
def get_cart_items():
    user_id = request.args.get('user_id', type=int)
    conn = sqlite3.connect('canteen_app.sqlite')
    conn.row_factory = dict_factory

    # find or create the user's active order
    order = conn.execute(
        "SELECT id FROM orders WHERE user_id = ? ORDER BY placed_on DESC LIMIT 1",
        (user_id,)
    ).fetchone()
    if not order:
        cur = conn.execute(
            "INSERT INTO orders(user_id, total_products, total_price) VALUES (?, 0, 0)",
            (user_id,)
        )
        order_id = cur.lastrowid
    else:
        order_id = order['id']

    rows = conn.execute("""
        SELECT oi.id, m.name, oi.quantity, oi.price_at_order AS price
        FROM order_items oi
        JOIN menu m ON m.id = oi.menu_id
        WHERE oi.order_id = ?
    """, (order_id,)).fetchall()

    conn.close()
    return jsonify(rows)

# 2) POST a new item into the cart
@app.route('/orders/items', methods=['POST'])
def add_cart_item():
    data = request.get_json()
    user_id = data['user_id']
    menu_id = data['menu_id']
    qty     = data.get('quantity', 1)

    conn = sqlite3.connect('canteen_app.sqlite')
    conn.row_factory = dict_factory

    # find or create order
    order = conn.execute(
        "SELECT id FROM orders WHERE user_id = ? ORDER BY placed_on DESC LIMIT 1",
        (user_id,)
    ).fetchone()
    if not order:
        cur = conn.execute(
            "INSERT INTO orders(user_id, total_products, total_price) VALUES (?, 0, 0)",
            (user_id,)
        )
        order_id = cur.lastrowid
    else:
        order_id = order['id']

    # check if already in cart
    existing = conn.execute(
        "SELECT id, quantity FROM order_items WHERE order_id = ? AND menu_id = ?",
        (order_id, menu_id)
    ).fetchone()

    price = conn.execute(
        "SELECT price FROM menu WHERE id = ?",
        (menu_id,)
    ).fetchone()['price']

    if existing:
        new_qty = existing['quantity'] + qty
        conn.execute(
            "UPDATE order_items SET quantity = ?, price_at_order = ? WHERE id = ?",
            (new_qty, price, existing['id'])
        )
    else:
        conn.execute(
            "INSERT INTO order_items(order_id, menu_id, quantity, price_at_order) VALUES (?, ?, ?, ?)",
            (order_id, menu_id, qty, price)
        )

    conn.commit()
    conn.close()
    return jsonify({'status': 'ok'}), 201

# 3) PUT to update item quantity
@app.route('/orders/items/<int:item_id>', methods=['PUT'])
def update_cart_item(item_id):
    data = request.get_json()
    qty  = data.get('quantity')
    if qty is None or qty < 1:
        return jsonify({'error': 'invalid quantity'}), 400

    conn = sqlite3.connect('canteen_app.sqlite')
    conn.execute("UPDATE order_items SET quantity = ? WHERE id = ?", (qty, item_id))
    conn.commit()
    conn.close()
    return jsonify({'status': 'ok'})

# 4) DELETE an item
@app.route('/orders/items/<int:item_id>', methods=['DELETE'])
def delete_cart_item(item_id):
    conn = sqlite3.connect('canteen_app.sqlite')
    conn.execute("DELETE FROM order_items WHERE id = ?", (item_id,))
    conn.commit()
    conn.close()
    return '', 204



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
