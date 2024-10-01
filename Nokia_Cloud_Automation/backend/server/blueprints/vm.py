from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server import db
from server.models import VMTable, User, VMAccess
from sqlalchemy.exc import IntegrityError

vm_bp = Blueprint('vm', __name__)

@vm_bp.route('/vms', methods=['POST'])
@jwt_required()
def add_vm():
    data = request.get_json()
    current_user_id = get_jwt_identity()

    try:
        new_vm = VMTable(
            name=data['name'],
            topology=data['topology'],
            VM1=data['VM1'],
            VM2=data['VM2'],
            M_Plane=data['M_Plane'],
            added_by=current_user_id
        )
        db.session.add(new_vm)
        db.session.commit()

        access = VMAccess(user_id=current_user_id, vm_id=new_vm.id)
        db.session.add(access)
        db.session.commit()

        return jsonify({'message': 'VM added successfully'}), 201
    except IntegrityError:
        db.session.rollback()  # Important to roll back the session to clear the failed transaction
        return jsonify({'error': 'A VM with the same name, topology, VM1, or M-Plane already exists.'}), 400

@vm_bp.route('/vms', methods=['GET'])
@jwt_required()
def get_vms():
    current_user_id = get_jwt_identity()

    vms = VMTable.query.all()
    access_list = VMAccess.query.filter_by(user_id=current_user_id).all()
    accessible_vm_ids = {access.vm_id for access in access_list}

    output = []
    for vm in vms:
        user = User.query.get(vm.added_by)
        vm_data = {
            'id': vm.id,
            'name': vm.name,
            'topology': vm.topology,
            'VM1': vm.VM1,
            'VM2': vm.VM2,
            'M_Plane': vm.M_Plane,
            'added_by': user.email if user else 'Unknown',
            'owner': user.username if user else 'Unknown',
            'has_access': vm.id in accessible_vm_ids
        }
        output.append(vm_data)
    return jsonify({'vms': output}), 200

@vm_bp.route('/vms/<id>', methods=['DELETE'])
@jwt_required()
def delete_vm(id):
    vm = VMTable.query.get(id)
    if not vm:
        return jsonify({'message': 'VM not found'}), 404

    db.session.delete(vm)
    db.session.commit()
    return jsonify({'message': 'VM deleted successfully'}), 200

@vm_bp.route('/vms/grant_access', methods=['POST'])
@jwt_required()
def grant_access():
    data = request.get_json()
    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)
    if not user.is_admin:
        return jsonify({'message': 'Unauthorized'}), 403

    user_id = data.get('user_id')
    vm_id = data.get('vm_id')

    if not User.query.get(user_id):
        return jsonify({'message': 'User not found'}), 404

    if not VMTable.query.get(vm_id):
        return jsonify({'message': 'VM not found'}), 404

    existing_access = VMAccess.query.filter_by(user_id=user_id, vm_id=vm_id).first()
    if existing_access:
        return jsonify({'message': 'Access already granted'}), 400

    access = VMAccess(user_id=user_id, vm_id=vm_id)
    db.session.add(access)
    db.session.commit()

    return jsonify({'message': 'Access granted successfully'}), 200

@vm_bp.route('/vms/revoke_access', methods=['POST'])
@jwt_required()
def revoke_access():
    data = request.get_json()
    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)
    if not user.is_admin:
        return jsonify({'message': 'Unauthorized'}), 403

    user_id = data.get('user_id')
    vm_id = data.get('vm_id')

    access = VMAccess.query.filter_by(user_id=user_id, vm_id=vm_id).first()
    if not access:
        return jsonify({'message': 'Access not found'}), 404

    db.session.delete(access)
    db.session.commit()

    return jsonify({'message': 'Access revoked successfully'}), 200