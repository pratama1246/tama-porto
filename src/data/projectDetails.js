export const projectDetails = {
  1: {
    tagline: "Laravel 13 powered campus canteen ordering system with role-based access control.",
    overview: "PickupOrder-App is a Laravel 13 web application for canteen/food pickup ordering internal to Politeknik Negeri Cilacap. Designed to optimize ordering pipelines, it bridges students, canteen vendors, and administrators into a cohesive ecosystem with seamless payment flows integrated via Midtrans.",
    problem: "Crowded canteen queues during class breaks waste student time, vendors struggle to project daily sales targets, and admins face hurdles managing campus user data manually.",
    solution: "A pre-order system integrated with Midtrans Snap for cashless payments, vendor dashboards with sales target trackers, and bulk user onboarding via CSV templates.",
    keyFeatures: [
      "Midtrans Snap Integration (Snap Popup & Webhook Notification)",
      "Vendor Dashboard to track daily targets & sales reports",
      "Scan QR & Order Code to speed up canteen pickup",
      "Bulk user import via CSV & download template",
      "Force password change on first login for user safety"
    ],
    techStack: [
      { category: "Backend Core", list: ["PHP 8.4+", "Laravel 13", "MySQL"] },
      { category: "Frontend UI", list: ["Blade Templates", "Tailwind CSS v4", "Alpine.js", "Vite", "DaisyUI"] },
      { category: "Integrations & Mail", list: ["Midtrans Snap API", "Resend (Email)", "Intervention Image"] }
    ],
    roles: [
      {
        roleName: "Student (Mahasiswa)",
        color: "var(--accent-pink)",
        icon: "👩‍🎓",
        features: [
          "Browse campus canteens and active menus",
          "Interactive shopping cart (add/update/remove items)",
          "Secure checkout flow with Midtrans Snap",
          "Order history tracking and reordering",
          "Menu reviews and ratings for completed pickups",
          "Real-time payment status polling in frontend"
        ]
      },
      {
        roleName: "Vendor (Kantin)",
        color: "var(--accent-mint)",
        icon: "🏪",
        features: [
          "Interactive Vendor Dashboard & Sales Reports",
          "Update canteen profile & open/closed status toggle",
          "Define daily sales target & progress tracking",
          "Menu management (CRUD) with photo upload",
          "Incoming order management with barcode/QR scanning",
          "Order status updates and cancellation management"
        ]
      },
      {
        roleName: "Admin (Sistem)",
        color: "var(--accent-lavender)",
        icon: "👑",
        features: [
          "Admin Dashboard with metrics overview",
          "Canteen onboarding and management (CRUD & bulk delete)",
          "User administration with bulk status toggle & delete",
          "Bulk student import via CSV with downloadable template",
          "Force password change on first login for users"
        ]
      }
    ],
    database: {
      description: "Designed with normalized relational tables, performance indexes, and clear foreign key constraints to ensure database integrity.",
      tables: [
        { name: "users", fields: ["id", "nim/username", "email", "password", "role", "avatar", "is_first_login", "timestamps"] },
        { name: "canteens", fields: ["id", "vendor_id", "name", "slug", "is_open", "daily_target", "timestamps"] },
        { name: "menus", fields: ["id", "canteen_id", "name", "slug", "price", "description", "category", "image_path", "is_available", "timestamps"] },
        { name: "orders", fields: ["id", "user_id", "canteen_id", "order_code", "status", "total_price", "payment_status", "midtrans_transaction_id", "timestamps"] },
        { name: "order_items", fields: ["id", "order_id", "menu_id", "quantity", "price_at_purchase", "notes"] },
        { name: "reviews", fields: ["id", "order_item_id", "user_id", "rating", "comment", "timestamps"] }
      ],
      specialFeatures: [
        "Index optimization for fast menu lookups and order history scanning.",
        "Soft-deletes and cascaded foreign key protection.",
        "Daily target trackers stored on canteen records."
      ]
    },
    payments: {
      provider: "Midtrans Snap (3-DS Secure Payments)",
      endpoints: [
        { method: "POST", path: "/payment/notification", desc: "Webhook callback (CSRF excluded) where Midtrans sends transaction updates." },
        { method: "GET", path: "/api/order/{id}/payment-status", desc: "Polling endpoint called by student cart to auto-redirect on successful transaction." }
      ]
    },
    setup: {
      steps: [
        { cmd: "composer install", desc: "Install backend PHP dependencies via Composer" },
        { cmd: "cp .env.example .env", desc: "Duplicate environment configuration file" },
        { cmd: "php artisan key:generate", desc: "Generate secure application encryption key" },
        { cmd: "php artisan migrate --seed", desc: "Create database schema and seed demo accounts" },
        { cmd: "npm install", desc: "Install frontend NPM packages" },
        { cmd: "npm run build", desc: "Build assets for production (or run dev server)" }
      ],
      envVars: [
        { name: "DB_CONNECTION", val: "mysql" },
        { name: "DB_DATABASE", val: "pickup_order_db" },
        { name: "MIDTRANS_SERVER_KEY", val: "SB-Mid-server-xxxx" },
        { name: "MIDTRANS_CLIENT_KEY", val: "SB-Mid-client-xxxx" },
        { name: "MIDTRANS_IS_PRODUCTION", val: "false" }
      ]
    },
    demoAccounts: [
      { role: "Administrator", username: "admin", email: "admin@pnc.ac.id" },
      { role: "Vendor (Harmoni)", username: "vendor_harmoni", email: "kantinharmoni@pnc.ac.id" },
      { role: "Vendor (MI Academy)", username: "vendor_mi", email: "miacademy@pnc.ac.id" },
      { role: "Student (Mahasiswa)", username: "demo_student", email: "demo.student@pnc.ac.id", note: "Forces change password on first login" }
    ],
    screenshots: []
  },
  2: {
    tagline: "CodeIgniter 4 powered event ticketing platform with secure user booking and admin controls.",
    overview: "Ticketly is a web-based event ticketing platform built using the CodeIgniter 4 framework. Designed as a college project for the Pemrograman Web 2 course at Politeknik Negeri Cilacap, the platform allows guests to browse and secure digital ticket bookings for various events while giving administrators direct control over quotas, event parameters, and overall transaction logs.",
    problem: "Event registration and booking processes on campus are often disorganized, leading to issues with quota management, manual ticketing, and slow attendance checks.",
    solution: "A centralized web application utilizing CodeIgniter 4 MVC architecture to automate ticket bookings, manage ticket quotas in real-time, and provide an administrative control board for event verification.",
    keyFeatures: [
      "User authentication system (Registration, Login, and Logout)",
      "Interactive event catalog showcasing upcoming listings and descriptions",
      "Ticket booking system with dynamic quantity selection and quota validation",
      "Comprehensive Admin Dashboard monitoring transactions, sales, and capacities",
      "Event management panel (CRUD operations) for organizers"
    ],
    techStack: [
      { category: "Backend Framework", list: ["PHP 8.1+", "CodeIgniter 4", "MySQL"] },
      { category: "Frontend UI", list: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS v4", "Flowbite"] },
      { category: "Workspace & Design", list: ["Figma Prototype", "Composer Manager", "Git"] }
    ],
    roles: [
      {
        roleName: "User (Student / Guest)",
        color: "var(--accent-pink)",
        icon: "👥",
        features: [
          "Browse through all available upcoming events",
          "View specific event details, ticket price, and descriptions",
          "Purchase tickets securely with customized quantity selections",
          "Track personal booking history and current ticket status"
        ]
      },
      {
        roleName: "Administrator (Event Organizer)",
        color: "var(--accent-mint)",
        icon: "🛠️",
        features: [
          "Monitor live ticket sales, remaining quotas, and transaction histories",
          "Manage event catalog (Create, Read, Update, Delete events)",
          "Audit transaction records and update reservation states",
          "Access overall platform analytics and registration stats"
        ]
      }
    ],
    database: {
      description: "Database architecture built on MySQL. The full database structure and seeding data are provisioned directly via the ticketly.sql schema file.",
      tables: [
        { name: "users", fields: ["id", "username", "email", "password", "role", "created_at", "updated_at"] },
        { name: "events", fields: ["id", "title", "description", "date", "time", "venue", "ticket_price", "ticket_quota", "image", "created_at"] },
        { name: "bookings", fields: ["id", "user_id", "event_id", "quantity", "total_price", "booking_status", "created_at"] }
      ],
      specialFeatures: [
        "Cascaded updates on event catalog deletions.",
        "Real-time ticket quota subtraction constraints."
      ]
    },
    payments: null,
    setup: {
      steps: [
        { cmd: "git clone https://github.com/pratama1246/ticketly-project.git", desc: "Clone the project repository to your local directory" },
        { cmd: "composer install", desc: "Install PHP libraries and CodeIgniter dependencies" },
        { cmd: "cp env .env", desc: "Duplicate configuration environment file" },
        { cmd: "Configure Base URL & DB", desc: "Open .env and edit app.baseURL and database.default details" },
        { cmd: "mysql -u root -p ticketly < ticketly.sql", desc: "Import SQL schema structure and seed sample data" },
        { cmd: "php spark serve", desc: "Launch CodeIgniter 4 built-in development server" }
      ],
      envVars: [
        { name: "app.baseURL", val: "http://localhost:8080/" },
        { name: "database.default.database", val: "ticketly" },
        { name: "database.default.username", val: "root" },
        { name: "database.default.DBDriver", val: "MySQLi" }
      ]
    },
    demoAccounts: [
      { role: "Administrator", username: "admin_demo", email: "admin@ticketly.com", note: "Access dashboard" },
      { role: "User / Guest", username: "guest_demo", email: "guest@ticketly.com", note: "Browse & book" }
    ],
    screenshots: []
  },
  3: {
    tagline: "Desktop employee payroll system with robust multi-tier OOP architecture.",
    overview: "Penggajian Karyawan is a C# WinForms enterprise application designed for internal company payroll computations. Using SQL Server and ADO.NET, the system enforces a strict Object-Orient Oriented architecture to calculate allowances, tax deductions, basic salaries, and issue clean slip documents for employees.",
    problem: "Manual calculations for overtime allowances, leave compensation, and PPH 21 taxes trigger math discrepancies and delays.",
    solution: "A desktop C# WinForms system with SQL Server stored procedures to automate net payroll computation and export PDF slips.",
    keyFeatures: [
      "Automated salary calculations (allowances, BPJS, PPH 21 taxes)",
      "Physical slip printing & bulk monthly report export in PDF",
      "Integrated attendance logging (in/out/delay tracking)",
      "Centralized database access using SQL Server Stored Procedures"
    ],
    techStack: [
      { category: "Application Layer", list: ["C#", ".NET Framework 4.8", "Windows Forms"] },
      { category: "Data Layer", list: ["SQL Server", "ADO.NET Database Access", "Stored Procedures"] },
      { category: "Reporting", list: ["Microsoft ReportViewer", "PDF Slip Exporter"] }
    ],
    roles: [
      {
        roleName: "HRD / Payroll Officer",
        color: "var(--accent-peach)",
        icon: "👔",
        features: [
          "Recalculate monthly salary based on attendances & overtime",
          "Process tax deductions (PPH 21) and social insurance",
          "Disburse monthly payroll and generate bulk reports"
        ]
      },
      {
        roleName: "Administrator",
        color: "var(--accent-lavender)",
        icon: "⚙️",
        features: [
          "System configuration, role provisioning, and audit logs tracking",
          "Back up and restore SQL Server payroll database entries"
        ]
      },
      {
        roleName: "Employee (Karyawan)",
        color: "var(--accent-blue)",
        icon: "👤",
        features: [
          "Secure personal portal to view monthly salary breakdown",
          "Download official payroll slip documents in PDF format"
        ]
      }
    ],
    database: {
      description: "Normalized payroll schema on Microsoft SQL Server with database triggers for balance updates.",
      tables: [
        { name: "Karyawan", fields: ["ID_Karyawan", "Nama", "Jabatan", "Departemen", "ID_User"] },
        { name: "Gaji", fields: ["ID_Gaji", "ID_Karyawan", "Bulan_Tahun", "Gaji_Pokok", "Tunjangan", "Potongan", "Total_Bersih"] },
        { name: "Absensi", fields: ["ID_Absen", "ID_Karyawan", "Tanggal", "Status_Kehadiran", "Jam_Masuk", "Jam_Keluar"] }
      ],
      specialFeatures: ["Stored procedures for atomic calculations", "Salary calculation database triggers"]
    },
    payments: null,
    setup: {
      steps: [
        { cmd: "Clone Repository", desc: "Clone files onto local machine" },
        { cmd: "Attach SQL DB", desc: "Open SQL Server Management Studio (SSMS) and attach payroll database (.mdf)" },
        { cmd: "Configure Connection", desc: "Update ConnectionString in App.config configuration file" },
        { cmd: "Build Solution", desc: "Open in Visual Studio 2022 and compile/run the C# project" }
      ],
      envVars: [
        { name: "ConnectionString", val: "Server=.\\SQLEXPRESS;Database=PenggajianDb;Trusted_Connection=True;" }
      ]
    },
    demoAccounts: [
      { role: "HRD User", username: "hrd_demo", email: "hrd@payroll.co.id" },
      { role: "Admin System", username: "admin_payroll", email: "admin@payroll.co.id" }
    ],
  }
}
