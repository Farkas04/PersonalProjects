# Nokia_Cloud_Automation

## Installation Guide

### Prerequisites
Before installing Nokia_Cloud_Automation, ensure you have the following prerequisites installed on your system:
- Python (version 3.6 or higher)
- pip (Python package manager)
- Git

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/serbanples/Nokia_Cloud_Automation.git

2. **Create python Env**
    ```markdown
    <!-- If the following command does not work, try using pip3 instead -->
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    cd server
    pip install -r requirements.txt
    cd backend
    export FLASK_APP=server:create_app


2. **Install JavaScript dependencies**
    ```bash
    cd frontend
    npm install

3. **Run python Backend service**
    ```markdown
    cd backend
    flask run

4. **Run JavaScript Frontend**
    ```bash
    cd fronten
    npm run dev

5. **Already made accounts for testing**

    user account:
     - test1@mail.com
     - Test1Test1*

    admin account:
     - TO DO