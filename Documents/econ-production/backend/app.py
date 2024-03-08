from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS  # Import CORS
from models import db, User, ProductionJobCard, ProductionReport, InventoryItem
from faker import Faker
from datetime import datetime
from random import choice as rc
from werkzeug.security import generate_password_hash



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True  # Enable pretty-printing of JSON responses
CORS(app)  # Enable CORS for all routes

migrate = Migrate(app, db)

db.init_app(app)

fake = Faker()

# Seed the database
with app.app_context():
    # Delete existing data
    ProductionReport.query.delete()
    ProductionJobCard.query.delete()
    User.query.delete()
    InventoryItem.query.delete()

    # Seed users
    users = []
    for _ in range(50):
        user = User(email=fake.email(), password=fake.password(), name=fake.name(), phone_number=fake.phone_number(), role=rc(['admin', 'user']))
        users.append(user)
    db.session.add_all(users)

    # Seed production job cards
    job_cards = []
    for _ in range(100):
        job_card = ProductionJobCard(job_type=fake.word(), job_description=fake.text(), order_of_products=fake.word(), order_date=datetime.strptime(fake.date(), '%Y-%m-%d'), end_of_production=datetime.strptime(fake.date(), '%Y-%m-%d'), urgency=rc(['High', 'Medium', 'Low']))
        job_cards.append(job_card)
    db.session.add_all(job_cards)

    # Seed production reports
    reports = []
    for _ in range(200):
        report = ProductionReport(production_job_card=rc(job_cards), production_challenges=fake.text(), quality_measurements=fake.text())
        reports.append(report)
    db.session.add_all(reports)

    # Seed inventory items
    inventory_items = []
    for _ in range(50):
        inventory_item = InventoryItem(item_name=fake.word(), quantity_in_stock=fake.random_int(min=0, max=1000), supplier_name=fake.company(), lead_time=fake.random_int(min=1, max=30), location=fake.random_int(min=1, max=10))
        inventory_items.append(inventory_item)
    db.session.add_all(inventory_items)

    db.session.commit()
# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.json  # Assuming the client sends JSON data in the request body
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid email or password'}), 401

    # If authentication is successful, you may want to return some user information or a token
    return jsonify({'message': 'Login successful', 'user_id': user.id}), 200

# API endpoint to retrieve inventory items
@app.route('/inventory')
def inventory():
    items = InventoryItem.query.all()
    inventory_list = []
    for item in items:
        inventory_list.append({
            'item_name': item.item_name,
            'quantity_in_stock': item.quantity_in_stock,
            'supplier_name': item.supplier_name,
            'lead_time': item.lead_time,
            'location': item.location
        })

    return jsonify(inventory_list)

# API endpoint to retrieve production job cards
@app.route('/job-cards')
def job_cards():
    cards = ProductionJobCard.query.all()
    job_cards_list = []
    for card in cards:
        job_cards_list.append({
            'job_type': card.job_type,
            'job_description': card.job_description,
            'order_of_products': card.order_of_products,
            'order_date': card.order_date.strftime('%Y-%m-%d'),
            'end_of_production': card.end_of_production.strftime('%Y-%m-%d') if card.end_of_production else None,
            'urgency': card.urgency
        })

    return jsonify(job_cards_list)

# API endpoint to retrieve users
@app.route('/users')
def users():
    users = User.query.all()
    users_list = []
    for user in users:
        users_list.append({
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'phone_number': user.phone_number,
            'role': user.role
        })

    return jsonify(users_list)



# API endpoint to add a new user
@app.route('/users', methods=['POST'])
def add_user():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    phone_number = data.get('phone_number')
    role = data.get('role')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    hashed_password = generate_password_hash(password)

    new_user = User(email=email, password=hashed_password, name=name, phone_number=phone_number, role=role)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User added successfully"}), 201

# API endpoint to update a user
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    user = User.query.get_or_404(user_id)
    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)
    user.name = data.get('name', user.name)
    user.phone_number = data.get('phone_number', user.phone_number)
    user.role = data.get('role', user.role)
    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 200

# API endpoint to add a new inventory item
@app.route('/inventory', methods=['POST'])
def add_inventory_item():
    data = request.json
    new_item = InventoryItem(item_name=data['item_name'], quantity_in_stock=data['quantity_in_stock'], supplier_name=data['supplier_name'], lead_time=data['lead_time'], location=data['location'])
    db.session.add(new_item)
    db.session.commit()
    return jsonify({"message": "Inventory item added successfully"}), 201

# API endpoint to add a new production job card
@app.route('/job-cards', methods=['POST'])
def add_production_job_card():
    data = request.json
    new_job_card = ProductionJobCard(job_type=data['job_type'], job_description=data['job_description'], order_of_products=data['order_of_products'], order_date=datetime.strptime(data['order_date'], '%Y-%m-%d'), end_of_production=datetime.strptime(data['end_of_production'], '%Y-%m-%d') if 'end_of_production' in data else None, urgency=data['urgency'])
    db.session.add(new_job_card)
    db.session.commit()
    return jsonify({"message": "Production job card added successfully"}), 201

if __name__ == '__main__':
    app.run(port=5555)
