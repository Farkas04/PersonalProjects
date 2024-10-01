from flask import Blueprint, request, jsonify, session
from flask_jwt_extended import jwt_required, get_jwt_identity
from server.ssh_manager import SSHManager

ssh_bp = Blueprint('ssh', __name__)
ssh_connections = {}  # Global dictionary to store SSHManager instances

def get_ssh_manager(user_id):
    if user_id not in ssh_connections:
        ssh_connections[user_id] = SSHManager()
    return ssh_connections[user_id]

@ssh_bp.route('/connect', methods=['POST'])
@jwt_required()
def connect_ssh():
    user_id = get_jwt_identity()
    data = request.json
    hostname = data.get('hostname')
    username = data.get('username')
    password = data.get('password')
    
    ssh_manager = get_ssh_manager(user_id)
    success, message = ssh_manager.connect(hostname, username, password)
    
    session['connected'] = success
    return jsonify({'success': success, 'message': message})

@ssh_bp.route('/execute', methods=['POST'])
@jwt_required()
def execute_command():
    user_id = get_jwt_identity()
    ssh_manager = get_ssh_manager(user_id)
    
    if ssh_manager.connected:
        data = request.json
        command = data.get('command')
        
        output, error = ssh_manager.execute_command(command)
        return jsonify({'output': output, 'error': error})
    else:
        return jsonify({'error': 'No SSH connection established.'}), 400

@ssh_bp.route('/close', methods=['POST'])
@jwt_required()
def close_ssh():
    user_id = get_jwt_identity()
    ssh_manager = get_ssh_manager(user_id)
    success, message = ssh_manager.close_connection()
    session.pop('connected', None)
    ssh_connections.pop(user_id, None)
    return jsonify({'success': success, 'message': message})
