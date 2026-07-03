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
    disclaimer: "All event logos, promoter names, and concert posters featured in the screenshots and demo data of this project belong to their respective copyright owners (official promoters/events). They are used purely for educational and demonstration purposes to simulate a real-world ticketing catalog.",
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
    tagline: "Desktop employee payroll and webcam QR attendance system with robust OOP architecture.",
    overview: "Sistem Informasi Penggajian Karyawan (Employee Payroll Information System) is a desktop application based on Windows Forms (C# .NET Framework 4.8) designed to manage employee profiles, track daily attendance, configure custom salary components, calculate monthly payroll automatically, and print/view salary slips. Built as a practical assignment for the Object-Oriented Programming (OOP) Lab Course at Politeknik Negeri Cilacap, the application features database auto-initialization and seeding, dynamic salary configs, and a dedicated Kiosk Mode for contactless check-in/out via QR Code scanner using a live webcam feed.",
    problem: "Manual monthly salary calculations (allowances, deductions, and grace-period late penalties based on raw logs) trigger math discrepancies and delays, while standard biometric attendance hardware is expensive to implement.",
    solution: "A desktop C# WinForms application integrated with MySQL that automatically seeds its database on launch, computes dynamic salaries, and utilizes a standard computer webcam to scan employee QR badge cards for automated kiosk attendance tracking.",
    keyFeatures: [
      "Secure role-based dashboards (Admin, HRD, Employee, and Kiosk Mode)",
      "Automated database schema creation & self-healing data seeder on startup",
      "Dynamic salary components configuration (allowances & deductions by nominal or %)",
      "Live webcam QR code scanner for contactless self-attendance checking (kiosk)",
      "Automatic monthly salary calculation & GDI+ dynamic slip rendering and printing",
      "Secure cryptography service for user passwords and login sessions"
    ],
    techStack: [
      { category: "Application Layer", list: ["C#", ".NET Framework 4.8", "Windows Forms (WinForms)"] },
      { category: "Data Layer", list: ["MySQL Server", "ADO.NET Provider (MySql.Data v9.7.0)", "Database Auto-Seeder"] },
      { category: "Third-Party Libraries", list: ["AForge.Video (Webcam API)", "ZXing.Net (QR Code)", "BouncyCastle (Cryptography)"] }
    ],
    roles: [
      {
        roleName: "Administrator",
        color: "var(--accent-lavender)",
        icon: "⚙️",
        features: [
          "User Management: CRUD operations for login accounts",
          "Employee Management: CRUD operations for employee records (Permanent, Contract, Daily)",
          "QR Identity Cards: Automatically generate and download badges as PNG"
        ]
      },
      {
        roleName: "HRD Staff",
        color: "var(--accent-peach)",
        icon: "👔",
        features: [
          "Configure salary components dynamically (allowances and deductions)",
          "Configure shifts, normal hours, and late tolerance grace periods",
          "Process monthly payroll calculations and review recaps/reports"
        ]
      },
      {
        roleName: "Employee (Karyawan)",
        color: "var(--accent-blue)",
        icon: "👤",
        features: [
          "Personal dashboard showing real-time stats and active payroll status",
          "View individual daily attendance history logs",
          "Print/export monthly salary slips rendered dynamically using GDI+"
        ]
      },
      {
        roleName: "Kiosk Mode",
        color: "var(--accent-pink)",
        icon: "🖥️",
        features: [
          "Contactless check-in/out self-attendance clocking console",
          "Live webcam stream capturing using AForge.Video library",
          "Instantly decode employee QR identity cards using ZXing.Net"
        ]
      }
    ],
    database: {
      description: "Normalized MySQL schema containing tables for employee master profiles (base class with concrete models), attendance logs, login accounts, and salary components.",
      tables: [
        { name: "Karyawan", fields: ["kode_karyawan", "nama", "jabatan", "gaji_pokok", "jenis_karyawan"] },
        { name: "DataAbsensi", fields: ["id_absensi", "kode_karyawan", "tanggal", "status", "jam_masuk", "jam_keluar"] },
        { name: "KomponenGaji", fields: ["id_komponen", "nama_komponen", "jenis", "nilai", "tipe_nilai"] },
        { name: "Gaji", fields: ["id_gaji", "kode_karyawan", "bulan_tahun", "gaji_pokok", "total_tunjangan", "total_potongan", "gaji_bersih"] }
      ],
      specialFeatures: ["Self-healing auto-seeder on startup", "Inheritance-based employee OOP hierarchy", "Dynamic custom salary components binding"]
    },
    payments: null,
    setup: {
      steps: [
        { cmd: "Clone Repository", desc: "Clone files: git clone https://github.com/pratama1246/SistemPenggajianKaryawan.git" },
        { cmd: "Create Database", desc: "Open MySQL and execute: CREATE DATABASE penggajian;" },
        { cmd: "Configure Connection", desc: "Adjust credentials in Koneksi.cs if different from default root / empty password" },
        { cmd: "Compile & Run", desc: "Open in Visual Studio 2022 and compile (F5). Seeder creates tables and sample data automatically" }
      ],
      envVars: [
        { name: "Database Name", val: "penggajian" },
        { name: "Default Host / Port", val: "localhost / 3306" },
        { name: "MySQL User / Password", val: "root / (empty)" }
      ]
    },
    demoAccounts: [
      { role: "Administrator", username: "admin", password: "admin123" },
      { role: "HRD Staff", username: "hrd", password: "hrd123" },
      { role: "Kiosk Mode", username: "kiosk", password: "kiosk123" },
      { role: "Employee (Karyawan)", username: "karyawan", password: "karyawan123" }
    ],
    screenshots: [
      { url: "/assets/projects/penggajian.png", caption: "Form Login & Dynamic Dashboard Routing", type: "Desktop UI" }
    ]
  },
  4: {
    tagline: "Web-based tournament manager demonstrating Stack (LIFO) and Queue (FIFO) data structures in PHP.",
    overview: "Sistem Manajemen Turnamen E-Sport Berbasis Struktur Data is a web application that demonstrates the practical implementation of Stack and Queue data structures using native PHP and PHP Sessions. Built as a midterm project for the Data Structure Programming course at Politeknik Negeri Cilacap, this project models real-world tournament management scenarios like strategy undos (Stack) and match calling lists (Queue).",
    problem: "Visualizing abstract computer science concepts like Stack (LIFO) and Queue (FIFO) can be difficult for students, and applying them in practical, interactive web simulations is key to understanding state management.",
    solution: "An interactive session-based web portal simulating team strategy planning (Stack with Push, Pop/Undo, Print) and tournament schedule execution (Queue with Enqueue, Dequeue/Call, Display).",
    keyFeatures: [
      "Stack-based team strategy inputs with Undo (LIFO) behavior",
      "Queue-based match scheduling with Call Team (FIFO) behavior",
      "PHP Session-based state management that persists data across page refreshes",
      "Flash notification system showing feedback messages after each queue/stack action"
    ],
    techStack: [
      { category: "Backend Core", list: ["PHP 7.4+", "PHP Session State"] },
      { category: "Frontend UI", list: ["HTML5", "CSS3 (Custom Style)"] }
    ],
    roles: [
      {
        roleName: "Tournament Admin / Organizer",
        color: "var(--accent-blue)",
        icon: "🎮",
        features: [
          "Manage team strategies (Push, Pop, Print strategies in Stack)",
          "Queue registered teams for matches in FIFO queue order",
          "Call teams for matches (Dequeue) from the schedule",
          "Reset session data for stack and queue individually"
        ]
      }
    ],
    database: {
      description: "This application does not connect to an external SQL database. Instead, it maintains state entirely in-memory on the server side using native PHP session arrays.",
      tables: [
        { name: "$_SESSION['stack']", fields: ["data[]: ['tim' => string, 'strategi' => string]"] },
        { name: "$_SESSION['queue']", fields: ["data[]: string (team names)"] }
      ],
      specialFeatures: [
        "In-memory PHP session array manipulation",
        "Stack behavior using PHP array_pop",
        "Queue behavior using PHP array_shift"
      ]
    },
    payments: null,
    setup: {
      steps: [
        { cmd: "git clone https://github.com/pratama1246/ALPRO_Stack-Queue.git", desc: "Clone the repository to your local directory" },
        { cmd: "cd ALPRO_Stack-Queue", desc: "Change directory into the cloned folder" },
        { cmd: "php -S localhost:8080", desc: "Run application using PHP's built-in web server" },
        { cmd: "Open URL in Browser", desc: "Navigate to http://localhost:8080/ in your browser" }
      ],
      envVars: []
    },
    demoAccounts: [],
    screenshots: []
  },
  5: {
    tagline: "My very first legacy web project, showcasing a simple native wallpaper gallery.",
    overview: "TheGreatesWallpaper.com is a simple static website created to showcase high-quality wallpapers. Developed using native HTML5, CSS3, and simple vanilla JavaScript during the early stages of my coding journey, this project serves as a nostalgic milestone showing how I first learned structure, styling, and navigation on the web.",
    problem: "When first starting out with web development, understanding how to lay out articles, structure responsive grids, and implement hamburger navigation menus using native CSS and JavaScript can be challenging.",
    solution: "A multi-page static site with a responsive navbar, dark/light styling, and a clean gallery card layout displaying curated nature and landscape wallpapers.",
    keyFeatures: [
      "Responsive hamburger navigation menu using vanilla JavaScript",
      "Multi-page architecture (Beranda, Tentang Kami, Kegiatan, Kontak)",
      "Curated fullscreen image gallery cards with hover interactions",
      "Pure HTML5 markup and custom CSS layouts without frameworks"
    ],
    techStack: [
      { category: "Web Core", list: ["HTML5", "CSS3", "JavaScript (Vanilla)"] }
    ],
    roles: [
      {
        roleName: "Guest Viewer",
        color: "var(--accent-pink)",
        icon: "🖼️",
        features: [
          "Browse aesthetic landscape wallpapers",
          "Read about the organization's vision",
          "Submit feedback via contact form"
        ]
      }
    ],
    database: null,
    payments: null,
    setup: {
      steps: [
        { cmd: "git clone https://github.com/pratama1246/pratama1246.github.io.git", desc: "Clone the repository to your local computer" },
        { cmd: "cd pratama1246.github.io", desc: "Navigate to the project folder" },
        { cmd: "Open index.html", desc: "Open the file directly in any modern browser to view the site" }
      ],
      envVars: []
    },
    demoAccounts: [],
    screenshots: []
  },
  6: {
    tagline: "My true first web project, built at SMKN 1 Binangun for Apache server validation.",
    overview: "Explore Central Java is a static website created during my vocational high school years. Originally, this project was developed as a validation tool for the Administrasi Sistem Jaringan (ASJ) course. The goal was to verify that the Apache web server and local virtual host configurations on our Debian server were running correctly. The website lists popular tourism spots across Central Java with a neat vertical sidebar navigation.",
    problem: "Validating server configurations during networking classes typically involves dull text or basic placeholders. We wanted to verify our Apache server configuration with a beautiful, fully functional multi-page site.",
    solution: "A responsive static HTML/CSS/JS site featuring beautiful fullscreen landscape photography, smooth transitions, and a Boxicons-driven vertical navigation menu to showcase landmarks like Borobudur and Dieng.",
    keyFeatures: [
      "Modern vertical sidebar navigation menu utilizing Boxicons",
      "Multi-page architecture with separate detail files for major tourist spots",
      "Fullscreen hero sections with overlaid high-contrast typography",
      "Pure, lightweight HTML5 and CSS3 without frontend dependencies"
    ],
    techStack: [
      { category: "Web Core", list: ["HTML5", "CSS3", "JavaScript (Vanilla)"] },
      { category: "Design Assets", list: ["Boxicons", "FontAwesome Icons"] }
    ],
    roles: [
      {
        roleName: "Guest Visitor",
        color: "var(--accent-blue)",
        icon: "🧭",
        features: [
          "Browse historical landmarks and mountains in Central Java",
          "Collapse/expand the left vertical navigation bar",
          "Read detailed history and facts about each destination"
        ]
      }
    ],
    database: null,
    payments: null,
    setup: {
      steps: [
        { cmd: "git clone https://github.com/pratama1246/explore-central-java.git", desc: "Clone the repository to your local computer" },
        { cmd: "cd explore-central-java", desc: "Navigate to the project folder" },
        { cmd: "Open index.html", desc: "Open the file directly in any modern browser to view the site" }
      ],
      envVars: []
    },
    demoAccounts: [],
    screenshots: []
  }
}
