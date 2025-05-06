from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

@app.route('/api/menu')
def get_menu():
    # quick-and-dirty dict factory
    conn = sqlite3.connect('canteen_app.sqlite')
    conn.row_factory = lambda c, row: {c.description[i][0]: row[i] for i in range(len(row))}
    items = conn.execute("SELECT id, name, category, price FROM menu").fetchall()
    conn.close()
    return jsonify(items)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
