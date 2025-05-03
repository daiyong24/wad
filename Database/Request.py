import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser

DB= 'canteen_app.sqlite'

app = Flask(__name__)

def dict_factory(cursor, row):
    return {col[0]: row[idx] for idx, col in enumerate(cursor.description)}

# Register
@app.route('/register', methods=['POST'])
def register():
    db= sqlite3.connect(DB)
    cursor= db.cursor()
    cursor.execute('')

     # Expects: {name, email, number, password}
    # Inserts into users table
    # Returns success/failure

# Login
@app.route('/login', methods=['POST'])
def login():
    db= sqlite3.connect(DB)
    cursor= db.cursor()
    cursor.execute('')

    # Expects: {email, password}
    # Checks credentials
    # Returns user ID if successful

# Read Menu
@app.route('/menu', methods=['GET'])
def get_menu():
     db= sqlite3.connect(DB)
     cursor= db.cursor()
     cursor.execute('')
 # Returns all menu items
    # Example response:
    # [{"id":1, "name":"Burger", "price":5.50, "category":"Food"}]

#Create Order
@app.route('/orders', methods=['POST'])
def create_order():
     db= sqlite3.connect(DB)
     cursor= db.cursor()
     cursor.execute('')
     # Expects: {user_id, items: [{menu_id, quantity}], use_points:bool}
    # Calculates:
    #   - Total price
    #   - Points earned (math.ceil)
    #   - Deducts points if used
    # Saves to orders + order_items tables

#Order History
@app.route('/orders/<int:user_id>', methods=['GET'])
def order_history(user_id):
     db= sqlite3.connect(DB)
     cursor= db.cursor()
     cursor.execute('')
# Returns all orders for a user
    # Example:
    # [{"order_id":1, "total":10.50, "items":[{"name":"Burger", "qty":2}]}]


# Top Up Wallet
@app.route('/wallet/topup', methods=['POST'])
def topup():
     db= sqlite3.connect(DB)
     cursor= db.cursor()
     cursor.execute('')

# Check Balance
@app.route('/wallet/<int:user_id>', methods=['GET'])
def get_balance(user_id):
     db= sqlite3.connect(DB)
     cursor= db.cursor()
     cursor.execute('')
     # Returns: {"balance":50.00, "points":100}

# Point History
@app.route('/points/<int:user_id>', methods=['GET'])
def points_history(user_id):
     db= sqlite3.connect(DB)
     cursor= db.cursor()
     cursor.execute('')
 # Returns: [{"change":+10, "reason":"Order #5"}, ...]


 # View Profile
@app.route('/users/<int:user_id>', methods=['GET'])
def get_profile(user_id):
     db= sqlite3.connect(DB)
     cursor= db.cursor()
     cursor.execute('')
  # Returns: {name, email, number, points}

# Update Profile
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_profile(user_id):
     db= sqlite3.connect(DB)
     cursor= db.cursor()
     cursor.execute('')
     db.commit()

    response = {
         
    }

    db.close()

    return jsonify(response), 201

# Expects: {name?, email?, number?}
    # Updates user details

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)