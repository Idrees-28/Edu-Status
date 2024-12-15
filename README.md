
# Edu Status Web Application

## Project Overview
Edu Status is a responsive and feature-rich web application designed to simplify various student services like **No Dues Clearance**, **Bonafide Certificates**, **Fee Balance Information**, and **Attendance Management**. Built using the **MERN Stack** (MongoDB, Express, React, and Node.js), this application provides seamless interaction for students and admin users, with secure authentication and user-friendly design.

---

## Features

### Authentication
- **User Login/Signup**: Validates users and prompts non-registered users to sign up.
- Prevents duplicate applications for **No Dues** and **Bonafide Certificates** on the same day.

### Dashboard (Student Portal)
1. **No Dues Clearance**:
   - Form submission with student details.
   - Provides status tracking and a downloadable PDF with a placeholder for the principal’s signature.
2. **Bonafide Certificate**:
   - Form submission with student details and purpose validation.
   - Status tracking and downloadable digitally signed PDF.
3. **Fees Balance**:
   - Displays detailed fee structure (tuition, bus, hostel, etc.) based on user input.
   - Generates and downloads a PDF report of fee details.
4. **Attendance Maintenance**:
   - Displays attendance percentage, present/absent days, and fines.
   - Allows report download for reference.

### Admin Panel
- Manages student records.
- Tracks submitted forms and application statuses.
- Restricts application resubmissions.

### Additional Features
- **Validation**: Only 3rd-year, 5th-semester students can apply for services.
- **Design**:
  - Header with the app name, "Edu Status", and a placeholder for a logo.
  - Interactive card-based navigation with hover effects.
  - Footer with placeholders for contact information and college logo.
- **PDF Generation**:
  - No Dues and Bonafide forms include placeholders for a digital principal's signature.
- **Database**:
  - Seeded with student data (Roll Numbers: CB2201 to CB2262) and preconfigured validations.
  - Randomized data for fees, attendance, and other attributes.

---

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **Axios**: For making API requests.
- **React Router**: For navigation.
- **CSS/Tailwind CSS**: For responsive and visually appealing design.

### Backend
- **Node.js**: For server-side scripting.
- **Express.js**: For building RESTful APIs.
- **MongoDB**: For database management.
- **Mongoose**: For schema modeling and database interaction.

### Deployment
- Preconfigured for deployment on Heroku or any other Node.js-compatible platform.

---

## Installation Guide

### Prerequisites
- **Node.js** (v16 or later)
- **MongoDB** (local or cloud-based)
- **Google App Password** for email service (if notifications are required)

---

### Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/Idrees-28/edu-status.git
```

#### 2. Navigate to the Project Directory
```bash
cd edu-status
```

#### 3. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

#### 4. Configure Environment Variables

Create a `.env` file in the `backend` directory and add the following:

```env
PORT=5000
DB_URI=mongodb://127.0.0.1:27017/Edu_Status
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@edustatus.com
ADMIN_PASSWORD=admin123
EMAIL_USER=idreesjee2810@gmail.com
EMAIL_PASS=mldz xfaz bszc deps
```

#### 5. Seed the Database
Run the following script to populate the database with sample student data:
```bash
cd backend
node seed.js
```

#### 6. Start the Application

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm start
```

#### 7. Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

---

## API Endpoints

### Authentication
- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Authenticate a user.

### Services
- **POST /api/nodues/apply**: Apply for No Dues Clearance.
- **POST /api/bonafide/apply**: Apply for a Bonafide Certificate.
- **GET /api/fees**: Fetch fee details.
- **GET /api/attendance**: Fetch attendance details.

### Admin
- **GET /api/admin/students**: Retrieve all students.
- **PATCH /api/admin/approve**: Approve submitted forms.

---

## Contribution Guidelines
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## Acknowledgments
- **MERN Stack**: For providing a robust full-stack framework.
- **Libraries**: Tools like Axios, React Router, and Tailwind CSS for enhancing the application.
- Special thanks to **Edu Status** for the project idea.

---

## Contact
- **Email**: idreesjee2810@gmail.com  
- **GitHub**: [Idrees-28](https://github.com/Idrees-28)

---
