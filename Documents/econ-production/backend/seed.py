from random import choice as rc
from faker import Faker
from app import app
from models import db, User, ProductionJobCard, ProductionReport, InventoryItem  # Import the new model
from datetime import datetime

fake = Faker()

with app.app_context():
    # Delete existing data
    ProductionReport.query.delete()
    ProductionJobCard.query.delete()
    User.query.delete()
    InventoryItem.query.delete()  # Delete existing inventory data

    # Seed users
    users = []
    for n in range(50):
        user = User(email=fake.email(), password=fake.password(), name=fake.name(), phone_number=fake.phone_number(), role=rc(['admin', 'user']))
        users.append(user)
    db.session.add_all(users)

    # Seed production job cards
    job_cards = []
    for n in range(100):
        job_card = ProductionJobCard(job_type=fake.word(), job_description=fake.text(), order_of_products=fake.word(), order_date=datetime.strptime(fake.date(), '%Y-%m-%d'), end_of_production=datetime.strptime(fake.date(), '%Y-%m-%d'), urgency=rc(['High', 'Medium', 'Low']))
        job_cards.append(job_card)
    db.session.add_all(job_cards)

    # Seed production reports
    reports = []
    for n in range(200):
        report = ProductionReport(production_job_card=rc(job_cards), production_challenges=fake.text(), quality_measurements=fake.text())
        reports.append(report)
    db.session.add_all(reports)

    # Seed inventory items
    inventory_items = []
    for n in range(50):
        inventory_item = InventoryItem(item_name=fake.word(), quantity_in_stock=fake.random_int(min=0, max=1000), supplier_name=fake.company(), lead_time=fake.random_int(min=1, max=30), location=fake.random_int(min=1, max=10))
        inventory_items.append(inventory_item)
    db.session.add_all(inventory_items)

    db.session.commit()
