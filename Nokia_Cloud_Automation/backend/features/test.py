import paramiko
import time

def test_ssh_connection(hostname, username, password):
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    hostname_ = hostname.replace("'", "")

    try:
        ssh_client.connect(hostname=hostname_, username=username, password=password)
        print("SSH connection established successfully to " + hostname)

        shell = ssh_client.invoke_shell()
        time.sleep(1)  

        if shell.recv_ready():
            shell.recv(1024)

        while True:
            command = input("Enter a command to execute (or 'close' to end connection): ")

            if command.lower() == 'close':
                print("Closing SSH connection.")
                break

            shell.send(command + "\n")
            time.sleep(1) 

            output = ""
            while shell.recv_ready():
                output += shell.recv(1024).decode()

            print(f"Output:\n{output}")

        return True, "SSH connection closed successfully to " + hostname

    except Exception as e:
        return False, "An error occurred while connecting to " + hostname + ": " + str(e)

    finally:
        ssh_client.close()

if __name__ == "__main__":
    hostname = input("Enter the hostname: ")
    username = input("Enter the username: ")
    password = input("Enter the password: ")
    success, message = test_ssh_connection(hostname, username, password)
    print(message)
