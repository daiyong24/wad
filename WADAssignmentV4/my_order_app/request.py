from flask import Flask, jsonify, request, abort
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
@app.route('/api/menu')
def get_menu():
    # quick-and-dirty dict factory
    conn = sqlite3.connect('canteen_app.sqlite')
    conn.row_factory = lambda c, row: {c.description[i][0]: row[i] for i in range(len(row))}
    items = conn.execute("SELECT id, name, category, price FROM menu").fetchall()
    conn.close()
    return jsonify(items)

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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
