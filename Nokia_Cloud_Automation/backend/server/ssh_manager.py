import paramiko
import time

class SSHManager:
    def __init__(self):
        self.ssh_client = None
        self.shell = None
        self.connected = False

    def connect(self, hostname, username, password):
        self.ssh_client = paramiko.SSHClient()
        self.ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        hostname_ = hostname.replace("'", "")

        try:
            self.ssh_client.connect(hostname=hostname_, username=username, password=password)
            self.shell = self.ssh_client.invoke_shell()
            time.sleep(1)  

            if self.shell.recv_ready():
                self.shell.recv(1024)  # Clear the buffer

            self.connected = True
            return True, "SSH connection established successfully to " + hostname
        except Exception as e:
            self.connected = False
            return False, "An error occurred while connecting to " + hostname + ": " + str(e)

    def execute_command(self, command):
        if self.connected and self.shell:
            try:
                self.shell.send(command + "\n")
                time.sleep(1)  # Wait for command execution

                output = ""
                while self.shell.recv_ready():
                    output += self.shell.recv(1024).decode()

                return output, None
            except Exception as e:
                return None, str(e)
        else:
            return None, "SSH connection not established."

    def close_connection(self):
        if self.ssh_client:
            self.ssh_client.close()
            self.connected = False
            return True, "SSH connection closed successfully."
        return False, "No SSH connection to close."
