# EduCashback — Next.js Fullstack Admission & Fee Rebate Platform

A unified Next.js (App Router) + Tailwind CSS application connected directly to **MongoDB Atlas** and **Cloudinary** for an educational admission referral and cashback sharing business model.

---

## 💼 Business Model Concept
- **Standard Tuition Fee:** e.g., ₹1,00,000 / year (paid 100% directly to the college/school)
- **Direct Student / Parent Cashback:** ₹10,000 (transferred back to student/parent bank account/UPI)
- **Public Website Transparency:** Students and parents are clearly informed that they **pay 100% of fees directly to the college/school** (never to us), and receive their guaranteed cashback refund directly upon admission verification.

---

## 🔐 Admin Authentication (`/backend`)
Visiting `/backend` now requires authentication:
- **Default Seeded Admin Credentials:**
  - **Email:** `admin@educashback.com` (or username: `admin`)
  - **Password:** `admin123`
- **Security & Cookies:**
  - Password hashed with salted **bcrypt** (`bcryptjs`).
  - Upon successful login, an **HTTP-only, Secure JWT cookie** (`admin_token`) is stored in the browser (valid for 7 days).
  - Includes a one-click **"Auto-Fill Credentials"** button on the login screen for testing convenience.
  - One-click **Logout** button clears the cookie session immediately.

---

## 🛠️ Stack & Infrastructure
- **Framework:** Next.js 14 (App Router) — Frontend & Backend API routes combined
- **Authentication:** JWT + HTTP-only Cookies + Bcrypt
- **Styling:** Tailwind CSS + Lucide Icons + Canvas Confetti
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Document & Asset Storage:** Cloudinary (Brochures, Prospectuses, Fee Cards, Affiliation Certificates)
- **Environment Variables:** Kept secure in `.env.local`

---

## 📁 Key Routes & Pages

### 1. Public Landing Page (`/`)
- **Hero Section with High-Resolution Images**: Grid showcasing college campuses, classrooms, and cheerful students with floating badges.
- **Pay Direct to College Banner**: Assures parents and students that they never pay fees to third parties.
- **Interactive Cashback Calculator**: Students and parents can type their annual tuition fee or use the slider to immediately see their guaranteed cashback refund.
- **How It Works**: 4-step transparent admission workflow explaining how institutional marketing budgets are shared.
- **Partner School & College Directory**:
  - Filter by State (Karnataka, Maharashtra, Delhi, Tamil Nadu, etc.)
  - Filter by Type (Colleges vs. Schools)
  - Search by Name, Address, or Course
  - Cards show Institution Name, Fees, Address, State, and prominent **"Get ₹X Back!"** cashback banner.
  - **Document Viewer**: Allows students & parents to open and download official brochures and documents stored on Cloudinary!
- **Admission Enquiry Form**:
  - Student Name, Parent Name, Mobile (WhatsApp enabled), Email, Selected College, Target Course, State, Message.
  - Confetti celebration upon submission with generated Referral Voucher ID stored in MongoDB.
- **Testimonials & FAQs**: Explains why cashback is given, fee receipts, payment methods, and legal accreditation.

### 2. Admin Control Panel (`/backend`)
Accessible exclusively via the **`/backend`** route with login gate:
- **Login Screen**: Requires admin authentication.
- **School & College Management**:
  - Add & Edit institutions with all required fields:
    - `Name of college/school`
    - `Fees` (Annual tuition fees in ₹)
    - `How much will they get back` (Guaranteed student cashback in ₹)
    - `In which state the college is in`
    - `Address of that school/college`
    - `Documents` (**Add as many documents as needed** uploaded directly to Cloudinary)
    - `Institution Type` (College / School)
    - `Courses Offered`
    - `Campus Photo URL`
- **Student Enquiry Management**:
  - View all student enquiries live from MongoDB.
  - Quick action buttons to directly call (`tel:`) or chat on WhatsApp (`wa.me`).
  - Status updates: `New`, `In Discussion`, `Admitted`, `Cashback Disbursed`.
  - Counselor notes field with auto-save.
  - Export all enquiries to CSV.
- **Financial & Unit Economics Dashboard**:
  - Internal commission and margin projections.

---

## ⚙️ Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public landing page, or [http://localhost:3000/backend](http://localhost:3000/backend) for the admin portal.

### 3. Build & Run Production
```bash
npm run build
npm start
```
