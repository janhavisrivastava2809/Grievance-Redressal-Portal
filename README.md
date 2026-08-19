#  Grievance Redressal Portal

A web-based **Grievance Redressal Portal** designed to provide a simple, transparent, and efficient platform for students/users to submit complaints and track their resolution status. The system enables administrators to manage complaints, users, colleges, sessions, and complaint categories through a centralized dashboard.

##  Project Overview

The **Grievance Redressal Portal** digitizes the traditional complaint management process. Users can register/login, submit grievances, view their complaint history, and track the current status of submitted complaints.

Administrators can manage registered users, colleges, sessions, complaint types, and grievances from an interactive admin dashboard. Complaints can be categorized and their status can be updated throughout the resolution process.

##  Key Features

###  User Features

* User registration and secure login
* Submit new grievances
* Select complaint type, college, and session
* View submitted complaints
* Track grievance status
* View complaint details
* Discussion/forum functionality
* Update profile information
* Change password

###  Admin Features

* Admin authentication
* Interactive admin dashboard
* User management
* College management
* Session management
* Complaint type management
* View and manage all complaints
* Filter complaints by status
* Monitor pending and ongoing grievances
* Update complaint status
* Manage complaint categories

### 📊 Complaint Status

The portal supports different grievance stages such as:

`Pending → In Process → Closed`

It can also identify grievances that are **Not Proceeded** based on administrative action.

##  Technology Stack

**Frontend**

* React.js
* HTML5
* CSS3
* JavaScript
* Bootstrap

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB

**Other Tools**

* Axios
* React Router
* Git & GitHub
* REST APIs

##  System Architecture

```text
User
  │
  ▼
React.js Frontend
  │
  │ REST API
  ▼
Node.js + Express.js Backend
  │
  ▼
MongoDB Database
  │
  ▼
Admin Dashboard
```

##  Main Modules

├── Authentication
│   ├── User Login
│   ├── User Registration
│   └── Admin Login
│
├── User Dashboard
│   ├── My Complaints
│   ├── Add Complaint
│   ├── Discussion Forum
│   ├── Update Profile
│   └── Change Password
│
└── Admin Dashboard
    ├── Dashboard
    ├── User Management
    ├── College Management
    ├── Session Management
    ├── Complaint Type Management
    └── Complaint Management
```

##  How It Works

1. User creates an account and logs into the portal.
2. User submits a grievance by providing the required details.
3. The complaint is stored in the MongoDB database through REST APIs.
4. Admin views the submitted grievance from the dashboard.
5. Admin processes the complaint and updates its status.
6. User can track the grievance and view its latest status.
7. Once resolved, the complaint is marked as **Closed**.

## 🎯 Project Objectives

* Digitize the grievance submission process.
* Reduce manual complaint handling.
* Provide transparent complaint tracking.
* Improve communication between users and administrators.
* Centralize grievance and user data.
* Provide an efficient admin management system.

##  Security

* Separate user and admin authentication
* Protected admin dashboard
* API-based communication between frontend and backend
* Password management functionality
* Role-based access to system features

##  Future Enhancements

* Email/SMS notifications for complaint status updates
* Complaint priority levels
* File and image attachments
* Advanced analytics and reports
* Real-time notifications
* Role-based admin permissions
* Complaint escalation system
* Deployment using cloud services

##  Learning Outcomes

Through this project, I gained practical experience in:

* React.js component development
* REST API integration
* Node.js and Express.js backend development
* MongoDB database management
* CRUD operations
* Authentication and routing
* Frontend-backend integration
* Responsive UI development
* Git and GitHub version control

##  Developer

**Janhavi Srivastava**
B.Tech – Computer Science & Engineering

