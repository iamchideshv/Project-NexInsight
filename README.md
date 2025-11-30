# NexInsight 🎓

**Smart Campus. Smarter Insights.**

NexInsight is a comprehensive, role-based college management platform built with **React 19**, **TypeScript**, and **Tailwind CSS**. It empowers administrators, faculty, and students with data-driven insights, real-time tracking, and AI-assisted academic management tools.

## 🚀 Features

### Core Functionality
*   **Role-Based Access Control (RBAC):** Distinct dashboards and features for Admins, Faculty, and Students.
*   **Dark Mode Support:** Fully responsive interface with a built-in light/dark theme toggle.
*   **Responsive Design:** Optimized for desktop and mobile viewing with custom sidebars and mobile navigation.

### 🤖 AI Integration (Powered by Gemini)
*   **Smart Marks Analysis:** The Faculty dashboard utilizes the **Google GenAI SDK** to analyze student marks (CAT1, CAT2, Internal) and attendance. It generates specific, actionable academic advice and identifies weak concepts automatically using the `gemini-2.5-flash` model.

### 👥 Role-Specific Modules

#### 👨‍💼 Administrator
*   **Campus Analytics:** High-level overview of total students, faculty, and attendance metrics.
*   **Staff & Student Attendance:** Monitor daily attendance status across departments.
*   **Bus Tracking:** Real-time status indicators for campus transport.
*   **Complaints Management:** Oversee and update the status of campus issues (Urgent, Frustrated, Suggestion).
*   **Master Timetable:** View schedules across all departments.

#### 👩‍🏫 Faculty
*   **Smart Attendance Marking:** "Management by Exception" interface—enter only absentees, and the system marks the rest as present.
*   **Marks Management:** Enter marks and generate AI-powered performance feedback.
*   **My Timetable:** Personalized class schedule view.
*   **Notifications:** Send broadcasts to specific sections or classes.

#### 👨‍🎓 Student
*   **Academic Tracking:** View personal attendance percentage and visual charts for subject-wise performance.
*   **Marks View:** Detailed breakdown of assessments with pass/fail indicators.
*   **On-Duty Requests:** Submit and track status of OD requests.
*   **Bus Details:** Track specific route info and driver contact details.
*   **Lost & Found:** Report lost items or claim found items with a verification flow.

## 🛠️ Tech Stack

*   **Frontend Library:** React 19
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (via CDN/Config)
*   **Icons:** Custom SVG Component Library
*   **AI/LLM:** Google GenAI SDK (`@google/genai`)
*   **Build Tool:** Vite (Recommended)

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/nexinsight.git
    cd nexinsight
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory to enable AI features:
    ```env
    # Required for AI Suggestions in Marks Manager
    API_KEY=your_google_genai_api_key
    ```

4.  **Run the application**
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```
nexinsight/
├── components/
│   ├── admin/          # Admin-specific views (Staff Attendance, Bus Details, etc.)
│   ├── faculty/        # Faculty views (Marks Entry, My Timetable)
│   ├── student/        # Student views (My Marks, On Duty)
│   ├── shared/         # Reusable components (NavCard, Toast, ProfileModal)
│   ├── charts/         # Visualization components
│   ├── icons/          # SVG Icon set
│   ├── AdminDashboard.tsx
│   ├── FacultyDashboard.tsx
│   ├── StudentDashboard.tsx
│   ├── LoginPage.tsx
│   └── ...
├── data/               # Mock data for prototyping (students, marks, faculty)
├── types.ts            # TypeScript interfaces and enums
├── App.tsx             # Main routing/state logic
└── index.html          # Entry point (Tailwind config embedded)
```

## 🔐 Login Credentials (Demo)

The application uses mock authentication. You can use the following default credentials or the "Continue as Guest" button.

*   **Admin:** `admin@nexinsight.edu` (Username: Harish, Pass: HR)
*   **Faculty:** `faculty@nexinsight.edu` (Username: Harish, Pass: HR - *logic routes based on email substring*)
*   **Student:** Any other email (Default fallback)

## 🎨 Customization

*   **Tailwind Config:** The `tailwind.config` is currently embedded in `index.html` for rapid prototyping. It includes custom animations (`fade-in`, `zoom-in`, `slide-up`) and color palettes.
*   **Dashboard Widgets:** Users can customize their dashboards by clicking the "Settings" (Cog) icon to toggle widgets on/off. Preferences are persisted in `localStorage`.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
