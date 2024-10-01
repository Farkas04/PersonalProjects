from server import db, bcrypt
from sqlalchemy import UniqueConstraint

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(60), nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)

    vms = db.relationship('VMTable', backref='creator', lazy=True)
    vm_access = db.relationship('VMAccess', backref='access_user', lazy=True, overlaps="vm_access_records")
    vm_access_records = db.relationship('VMAccess', backref='recorded_user', lazy=True, overlaps="vm_access,access_user")

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

class VMTable(db.Model):
    __tablename__ = 'vmtable'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    topology = db.Column(db.String(80), nullable=False)
    VM1 = db.Column(db.String(80), nullable=False)
    VM2 = db.Column(db.String(80), nullable=False)
    M_Plane = db.Column(db.String(80), nullable=False)
    added_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    access_list = db.relationship('VMAccess', backref='vm_entry', cascade="all, delete-orphan", lazy=True, overlaps="vm_access_entries")
    vm_access_entries = db.relationship('VMAccess', backref='entry_vm', lazy=True, overlaps="access_list,vm_entry")

    __table_args__ = (UniqueConstraint('name', 'topology', 'VM1', 'M_Plane', name='unique_vm_attributes'),)

class VMAccess(db.Model):
    __tablename__ = 'vmaccess'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    vm_id = db.Column(db.Integer, db.ForeignKey('vmtable.id'), nullable=False)

    user = db.relationship('User', backref=db.backref('access_records', lazy=True, overlaps="vm_access,access_user"))
    vm = db.relationship('VMTable', backref=db.backref('access_entries', lazy=True, overlaps="access_list,vm_entry"))