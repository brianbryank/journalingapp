from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    role = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'
    def __repr__(self):
        return f'<User {self.email}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @classmethod
    def authenticate(cls, email, password):
        user = cls.query.filter_by(email=email).first()
        if user and user.check_password(password):
            return user
        return None

class ProductionJobCard(db.Model):
    __tablename__ = 'production_job_cards'

    id = db.Column(db.Integer, primary_key=True)
    job_type = db.Column(db.String(100), nullable=False)
    job_description = db.Column(db.Text, nullable=False)
    order_of_products = db.Column(db.String(100), nullable=False)
    order_date = db.Column(db.Date, nullable=False)
    end_of_production = db.Column(db.Date, nullable=True)
    urgency = db.Column(db.String(50), nullable=True)

    def __repr__(self):
        return f'<Production Job Card {self.id}>'
    
class InventoryItem(db.Model):
    __tablename__ = 'inventory_items'

    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(100), nullable=False)
    quantity_in_stock = db.Column(db.Integer, nullable=False)
    supplier_name = db.Column(db.String(100), nullable=False)
    lead_time = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<Inventory Item {self.item_name}>'


class ProductionReport(db.Model):
    __tablename__ = 'production_reports'

    id = db.Column(db.Integer, primary_key=True)
    production_job_card_id = db.Column(db.Integer, db.ForeignKey('production_job_cards.id'), nullable=False)
    production_job_card = db.relationship('ProductionJobCard', backref=db.backref('production_reports', lazy=True))
    production_challenges = db.Column(db.Text, nullable=True)
    quality_measurements = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f'<Production Report {self.id}>'
