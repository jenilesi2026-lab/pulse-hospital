# 🏥 Pulse Life Care Hospital — Backend API

Node.js + Express + PostgreSQL + Prisma + JWT

---

## 🚀 How to Run (Step by Step)

### Prerequisites
- Node.js v18+
- PostgreSQL 14+ installed and running locally

---

### Step 1 — Open terminal in the backend folder

```bash
cd pulse-backend
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Set up your database credentials

Edit the `.env` file and update:

```env
DATABASE_URL="postgresql://postgres:YOUR_POSTGRES_PASSWORD@localhost:5432/pulse_db?schema=public"
JWT_SECRET=change_this_to_a_long_random_string
```

> 💡 Create the database first in psql:  `CREATE DATABASE pulse_db;`

### Step 4 — Generate Prisma client

```bash
npm run prisma:gen
```

### Step 5 — Run migrations (creates all tables)

```bash
npm run prisma:migrate
```

### Step 6 — Seed the database (inserts all doctors, departments, staff, admin user)

```bash
npm run seed
```

Seeded credentials:
| Role    | Email                   | Password     |
|---------|-------------------------|--------------|
| Admin   | admin@pulselife.com     | admin123     |
| Patient | patient@example.com     | patient123   |

### Step 7 — Start the dev server

```bash
npm run dev
```

Server runs at: **http://localhost:4000**

Health check: http://localhost:4000/health

---

## 📂 Project Structure

```
pulse-backend/
├── prisma/
│   ├── schema.prisma        # Database models
│   └── seed.js              # Sample data seeder
├── src/
│   ├── app.js               # Express app + middleware
│   ├── server.js            # Entry point, DB connect
│   ├── prisma.js            # Prisma client singleton
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── departments.routes.js
│   │   ├── doctors.routes.js
│   │   ├── staff.routes.js
│   │   └── appointments.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── departments.controller.js
│   │   ├── doctors.controller.js
│   │   ├── staff.controller.js
│   │   └── appointments.controller.js
│   ├── middleware/
│   │   ├── auth.js          # JWT requireAuth + requireRole
│   │   └── errorHandler.js  # Global error handler
│   └── utils/
│       └── validators.js    # Zod schemas
├── .env
├── .env.example
└── package.json
```

---

## 🔌 API Endpoints Reference

### Auth
| Method | Endpoint           | Access  | Description              |
|--------|--------------------|---------|--------------------------|
| POST   | /api/auth/register | Public  | Create a new account     |
| POST   | /api/auth/login    | Public  | Login → returns JWT      |
| GET    | /api/auth/me       | JWT     | Get current user profile |

### Departments
| Method | Endpoint                         | Access | Description                    |
|--------|----------------------------------|--------|--------------------------------|
| GET    | /api/departments                 | Public | All departments                |
| GET    | /api/departments/:slug           | Public | Single department              |
| GET    | /api/departments/:slug/doctors   | Public | Doctors in a department        |

### Doctors
| Method | Endpoint                              | Access | Description                        |
|--------|---------------------------------------|--------|------------------------------------|
| GET    | /api/doctors                          | Public | All doctors (filter: ?department=slug&search=name) |
| GET    | /api/doctors/:id                      | Public | Single doctor                      |
| GET    | /api/doctors/:id/availability?date=   | Public | Booked time slots for a date       |

### Staff
| Method | Endpoint             | Access | Description                          |
|--------|----------------------|--------|--------------------------------------|
| GET    | /api/staff           | Public | All staff (?type=NURSE&department=)  |
| GET    | /api/staff/:id       | Public | Single staff member                  |

### Appointments
| Method | Endpoint                        | Access                    | Description                |
|--------|---------------------------------|---------------------------|----------------------------|
| POST   | /api/appointments               | JWT (any logged-in user)  | Book an appointment        |
| GET    | /api/appointments/my            | JWT (patient)             | My own appointments        |
| GET    | /api/appointments               | JWT (ADMIN, RECEPTIONIST) | All appointments (admin)   |
| GET    | /api/appointments/:id           | JWT (ADMIN, RECEPTIONIST) | Single appointment         |
| PATCH  | /api/appointments/:id/status    | JWT (ADMIN, RECEPTIONIST) | Update status              |

---

## ⚛️ Frontend Integration (React Changes)

### 1. Login — store token instead of `isAuthenticated`

In your `LoginPage.jsx` after successful login:

```js
const res = await fetch("http://localhost:4000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
const data = await res.json();

if (res.ok) {
  localStorage.setItem("token", data.token);        // store JWT
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("isAuthenticated", "true");  // keep existing guard working
  navigate("/dashboard");
}
```

### 2. Replace hardcoded DOCTORS_DATA

In `DoctorsPage.jsx`, replace the static array with:

```js
const [doctors, setDoctors] = useState([]);

useEffect(() => {
  fetch("http://localhost:4000/api/doctors")
    .then(r => r.json())
    .then(setDoctors);
}, []);
```

### 3. Replace hardcoded SPECIALITIES (for SpecialitiesPage)

```js
useEffect(() => {
  fetch("http://localhost:4000/api/departments")
    .then(r => r.json())
    .then(setDepartments);
}, []);
```

Click on body part → fetch that department's doctors:
```js
fetch(`http://localhost:4000/api/departments/${slug}/doctors`)
  .then(r => r.json())
  .then(data => setDoctorsForModal(data.doctors));
```

### 4. Replace booking console.log() with POST

In your booking form `handleSubmit`:

```js
const token = localStorage.getItem("token");
if (!token) { navigate("/login"); return; }

const res = await fetch("http://localhost:4000/api/appointments", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
  body: JSON.stringify({
    doctorId: doctor.id,
    fullName:       form.fullName,
    dob:            form.dob,
    gender:         form.gender,
    bloodGroup:     form.bloodGroup,
    phone:          form.phone,
    email:          form.email,
    address:        form.address,
    city:           form.city,
    pincode:        form.pincode,
    emergencyName:  form.emergencyName,
    emergencyPhone: form.emergencyPhone,
    symptoms:       form.symptoms,
    appointmentDate: form.appointmentDate,
    appointmentTime: form.appointmentTime,
  }),
});

if (res.ok) {
  setSubmitted(true); // show success screen
} else {
  const err = await res.json();
  alert(err.message); // e.g. "Slot already booked"
}
```

### 5. Update ProtectedRoute in App.jsx

Your existing check `localStorage.getItem('isAuthenticated') === 'true'` still works.
For stronger security, additionally verify the token is present:

```js
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const token = localStorage.getItem('token');
  if (!isAuthenticated || !token) return <Navigate to="/login" replace />;
  return children;
};
```

---

## 🔧 Useful Prisma Commands

```bash
# Open Prisma Studio (visual DB browser)
npm run prisma:studio

# Reset DB and re-run migrations (destroys all data!)
npx prisma migrate reset

# View migration history
npx prisma migrate status
```
