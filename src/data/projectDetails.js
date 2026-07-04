export const projectDetails = {
  1: {
    tagline: "Laravel 13 powered campus canteen pre-ordering and pickup system with multi-role access control.",
    overview: "PickupOrder-App is a modern and responsive Laravel 13 (PHP 8.3+) web application designed to streamline food pre-ordering and pickup operations at Politeknik Negeri Cilacap. By enabling students to order and pay ahead, the platform effectively eliminates queue bottlenecks in the campus canteens during peak hours. Payments are integrated via Midtrans, and the app supports automatic webhook callbacks.",
    problem: "Crowded canteen queues during class breaks waste student time, vendors struggle to project daily sales targets, and admins face hurdles managing campus user data manually.",
    solution: "A pre-order system integrated with Midtrans Snap for cashless payments, vendor dashboards with sales target trackers, and bulk user onboarding via CSV templates.",
    keyFeatures: [
      "Midtrans Snap Integration (Snap Popup & Webhook Notification)",
      "3 Checkout Payment Methods: Midtrans, QRIS Manual, and Pay Direct",
      "Vendor Dashboard to track daily targets & sales reports using ApexCharts",
      "Scan QR & Order Code to speed up canteen pickup",
      "Bulk user import via CSV & download template",
      "Force password change on first login & login throttling security controls"
    ],
    techStack: [
      { category: "Backend Core", list: ["PHP 8.3+", "Laravel 13", "MySQL"] },
      { category: "Frontend UI", list: ["Blade Templates", "Tailwind CSS v4", "Alpine.js", "Vite", "DaisyUI v5", "ApexCharts"] },
      { category: "Integrations & Mail", list: ["Midtrans PHP SDK", "Resend (Email)", "Intervention Image"] }
    ],
    roles: [
      {
        roleName: "Student (Mahasiswa)",
        color: "var(--accent-pink)",
        icon: "👩‍🎓",
        features: [
          "Browse campus canteens and active menus",
          "Interactive database-persistent shopping cart (add/update/remove items)",
          "Secure checkout flow with Midtrans Snap, QRIS Manual, or Pay Direct",
          "Order history tracking, cancel orders, review menus, and reorder",
          "Real-time payment status polling in frontend JavaScript"
        ]
      },
      {
        roleName: "Vendor (Kantin)",
        color: "var(--accent-mint)",
        icon: "🏪",
        features: [
          "Interactive Vendor Dashboard & sales reports with ApexCharts",
          "Update canteen profile, set daily target, and toggle open/closed status",
          "Menu management (CRUD) with photo upload & category binding",
          "Incoming order management with barcode/QR scanning or code entry",
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
        { name: "reviews", fields: ["id", "order_item_id", "user_id", "rating", "comment", "timestamps"] },
        { name: "cart_items", fields: ["id", "user_id", "menu_id", "quantity", "timestamps"] }
      ],
      specialFeatures: [
        "Database-persistent shopping carts via cart_items table.",
        "Soft-deletes and cascaded foreign key protection.",
        "Optimized indexes for fast menu category lookups and history retrieval."
      ]
    },
    payments: {
      provider: "Midtrans Snap, Manual QRIS, and Direct Cash",
      endpoints: [
        { method: "POST", path: "/payment/notification", desc: "Webhook callback (CSRF excluded) where Midtrans sends transaction updates." },
        { method: "GET", path: "/api/order/{id}/payment-status", desc: "Polling endpoint called by student cart to auto-redirect on successful transaction." }
      ]
    },
    setup: {
      steps: [
        { cmd: "composer install", desc: "Install backend PHP dependencies via Composer" },
        { cmd: "cp .env.example .env && php artisan key:generate", desc: "Create environment file and generate secure encryption key" },
        { cmd: "php artisan migrate --seed", desc: "Create MySQL schema, run migrations, and seed demo accounts" },
        { cmd: "php artisan storage:link", desc: "Create storage symlink required for uploaded images" },
        { cmd: "npm install", desc: "Install frontend NPM packages" },
        { cmd: "npm run build", desc: "Build assets for production (or run dev server)" }
      ],
      envVars: [
        { name: "ORDER_START_TIME / END_TIME", val: "07:30 / 15:30 (Enforces operational hours)" },
        { name: "MIDTRANS_SERVER_KEY / CLIENT_KEY", val: "Obtained from Midtrans Sandbox/Production dashboard" },
        { name: "RESEND_API_KEY", val: "Obtained from Resend dashboard for email notifications" },
        { name: "QUEUE_CONNECTION", val: "database (Enables database-backed queue workers)" }
      ]
    },
    demoAccounts: [
      { role: "Administrator", username: "admin", email: "admin@pnc.ac.id", password: "pncpickup123" },
      { role: "Vendor (Harmoni)", username: "vendor_harmoni", email: "kantinharmoni@pnc.ac.id", password: "pncpickup123" },
      { role: "Vendor (MI Academy)", username: "vendor_mi", email: "miacademy@pnc.ac.id", password: "pncpickup123" },
      { role: "Student (Mahasiswa)", username: "demo_student", email: "demo.student@pnc.ac.id", password: "pncpickup123", note: "Forces change password on first login" }
    ],
    screenshots: [
      { url: "https://github.com/user-attachments/assets/4f1f8180-c962-4472-ac7f-78ed208991f1", caption: "Main Page Dashboard (Desktop Version)", type: "Web App" },
      { url: "https://github.com/user-attachments/assets/0186e14e-5eae-4453-8e4a-bc1c334d728b", caption: "Main Page Dashboard (Mobile responsive view)", type: "Mobile View" },
      { url: "https://github.com/user-attachments/assets/04d379f8-bc73-411c-a7e1-c2a21e5985c2", caption: "Browse Canteens and Menus", type: "Web App" },
      { url: "https://github.com/user-attachments/assets/48df6952-a5ce-4505-84d1-65ef45cf3c72", caption: "Menu Detail Page & Cart Operations", type: "Web App" },
      { url: "https://github.com/user-attachments/assets/3a467efb-f938-4e31-ab98-1fa361633cf6", caption: "Vendor Dashboard with sales analytics", type: "Vendor Panel" },
      { url: "https://github.com/user-attachments/assets/95b1b740-6cb6-4b66-8346-d8846c9defeb", caption: "Admin Dashboard with user quotas", type: "Admin Panel" }
    ]
  },
  2: {
    tagline: "CodeIgniter 4 powered event ticketing platform with secure user booking and JWT RESTful APIs.",
    overview: "Ticketly is a robust and modern event ticketing platform powered by CodeIgniter 4 (PHP 8.1+). It provides a comprehensive solution for managing events, selling tickets, and processing bookings. The system features a web-based user portal, an administrative dashboard, and a custom JWT-protected RESTful API for mobile Flutter client integrations.",
    disclaimer: "All event logos, promoter names, and concert posters featured in this project belong to their respective copyright owners. They are used purely for educational and academic demonstration purposes to simulate a realistic ticketing catalog.",
    problem: "Event registration and booking processes on campus are often disorganized, leading to issues with quota management, manual ticketing, and slow attendance checks.",
    solution: "A centralized web application utilizing CodeIgniter 4 MVC architecture to automate ticket bookings, manage ticket quotas in real-time, provide an administrative control board, and expose JWT RESTful API endpoints for mobile companion apps.",
    keyFeatures: [
      "Custom authentication for user & admin (Web Shield & custom JWT token for Mobile API)",
      "Interactive event catalog showcasing upcoming concert listings and descriptions",
      "Ticket booking system with dynamic category pricing and real-time quota validation",
      "Comprehensive Admin Dashboard monitoring transactions, sales statistics, and seat quotas",
      "Scalar-powered interactive REST API documentation (public/openapi.json)",
      "Forgot password flows with email verification codes (OTP via SMTP)"
    ],
    techStack: [
      { category: "Backend Core", list: ["PHP 8.1+", "CodeIgniter 4", "MySQL"] },
      { category: "Security & Auth", list: ["CodeIgniter Shield (Web)", "firebase/php-jwt (Mobile API)", "OTP via SMTP"] },
      { category: "Libraries & Frontend", list: ["Tailwind CSS v3", "Flowbite UI", "Dompdf (PDF Generator)", "Simple Qrcode (QR Generator)"] }
    ],
    roles: [
      {
        roleName: "User (Web)",
        color: "var(--accent-pink)",
        icon: "👩‍💻",
        features: [
          "Browse and search available concert and show events",
          "Purchase tickets with custom seat/category quantity selections",
          "Track personal order history details and transaction status",
          "Manage personal profile details and edit accounts"
        ]
      },
      {
        roleName: "Administrator (Web Panel)",
        color: "var(--accent-mint)",
        icon: "🛠️",
        features: [
          "Monitor ticket sales statistics, transaction logs, and capacity thresholds",
          "Manage events database (CRUD operations: create, edit, delete events)",
          "Configure ticket tiers, prices, and event quotas in real-time",
          "Audit incoming ticket transaction entries"
        ]
      },
      {
        roleName: "Mobile API Integration",
        color: "var(--accent-blue)",
        icon: "📱",
        features: [
          "User registration, JWT login, OTP requests, and password resets",
          "Retrieve banner landing events and featured listings",
          "Real-time mobile shopping cart calculation endpoint",
          "Start checkout, upload payment proof/confirm, and cancel bookings via API"
        ]
      }
    ],
    database: {
      description: "Relational MySQL schema structured with clean relational integrity, performance indexes, and database foreign key cascades.",
      tables: [
        { name: "users", fields: ["id", "username", "email", "password", "role", "created_at", "updated_at"] },
        { name: "events", fields: ["id", "title", "description", "date", "time", "venue", "ticket_price", "ticket_quota", "image", "created_at"] },
        { name: "ticket_types", fields: ["id", "event_id", "name", "price", "quota", "created_at"] },
        { name: "seats", fields: ["id", "event_id", "seat_number", "status"] },
        { name: "orders", fields: ["id", "user_id", "event_id", "quantity", "total_price", "booking_status", "created_at"] },
        { name: "order_items", fields: ["id", "order_id", "ticket_type_id", "quantity", "price_at_purchase"] },
        { name: "payment_methods", fields: ["id", "name", "code", "is_active"] }
      ],
      specialFeatures: [
        "Real-time ticket type quota subtractions on order creation.",
        "Custom database tracking for seat maps per event venue.",
        "Relational CASCADE rules on event catalog edits."
      ]
    },
    payments: {
      provider: "JWT Rest Checkout & Web Gateway Payments",
      endpoints: [
        { method: "POST", path: "/api/checkout/calculate", desc: "Calculates cart subtotals, admin fees, and totals in real-time." },
        { method: "POST", path: "/api/checkout/start", desc: "Locks seat quotas and starts a pending transaction." },
        { method: "POST", path: "/api/checkout/confirm", desc: "Confirm booking and upload proof of payment file." },
        { method: "GET", path: "/api/docs", desc: "Scalar interactive endpoint to view and test Swagger/OpenAPI specifications." }
      ]
    },
    setup: {
      steps: [
        { cmd: "composer install", desc: "Install dependencies via Composer" },
        { cmd: "cp env .env", desc: "Duplicate configuration environment file" },
        { cmd: "Configure Env Configs", desc: "Adjust app.baseURL, JWT_SECRET_KEY, and SMTP email parameters in .env" },
        { cmd: "php spark migrate", desc: "Create database schema using CodeIgniter migrations" },
        { cmd: "php spark db:seed --all", desc: "Seed database with PaymentMethodSeeder, EventSeeder, AdminUserSeeder, and FakeUserSeeder" },
        { cmd: "php spark serve", desc: "Launch development server at http://localhost:8080" }
      ],
      envVars: [
        { name: "app.baseURL", val: "http://localhost:8080/" },
        { name: "database.default.database", val: "ticketly" },
        { name: "JWT_SECRET_KEY", val: "your_secret_key_here" },
        { name: "email.SMTPHost / SMTPPort", val: "live.smtp.mailtrap.io / 2525" }
      ]
    },
    demoAccounts: [
      { role: "Administrator", username: "admin", email: "admin@ticketly.com", password: "admin123" },
      { role: "Mock User (Budi)", username: "budi_santoso", email: "budi@example.com", password: "password123" },
      { role: "Mock User (Ani)", username: "ani_wijaya", email: "ani@example.com", password: "password123" }
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
  },
  7: {
    tagline: "Stateless cross-platform mobile client for ticket booking built with Flutter & JWT REST APIs.",
    overview: "Ticketly Mobile is a cross-platform mobile application built using Flutter (Dart) that serves as the client interface for the Ticketly event ticketing system. It connects to the CodeIgniter 4 Backend RESTful API to deliver a seamless event discovery and ticket purchasing experience on mobile devices, supporting JWT-based stateless authentication, real-time shopping cart validation, and payment proof uploading.",
    disclaimer: "All event logos, promoter names, and concert posters featured in this project belong to their respective copyright owners. They are used purely for educational and academic demonstration purposes to simulate a realistic ticketing catalog.",
    problem: "Booking event tickets on campus usually requires using web-based portals that are not mobile-responsive or optimized for on-the-go checks and scanning.",
    solution: "A native-performing Flutter app that integrates with the backend API, utilizing local caching for sessions, interactive seat category quotas, and dynamically rendered e-tickets with barcode/QR verification.",
    keyFeatures: [
      "JWT-Based Stateless Auth & Session caching via shared_preferences",
      "Dynamic Home Banner & Event categories discovery flow",
      "Real-time ticket category quota checking & cart checkout calculations",
      "Camera/Gallery payment proof uploading for vendor manual validation",
      "E-Ticket dashboard showing active barcodes/QRs for check-in",
      "Pull-to-refresh mechanism to reload concert poster updates dynamically"
    ],
    techStack: [
      { category: "Mobile Framework", list: ["Flutter SDK v3.11+", "Dart 3.x"] },
      { category: "State & Storage", list: ["shared_preferences (Local Cache)", "HTTP Client (REST API)", "Flutter SVG"] },
      { category: "Typography & Theme", list: ["Poppins Font (Google Fonts)", "Figma UI/UX Prototypes"] }
    ],
    roles: [
      {
        roleName: "Mobile App User",
        color: "var(--accent-pink)",
        icon: "📱",
        features: [
          "Stateless registration, login, OTP recovery, and profiles",
          "Browse events, filter by categories, and view seat capacities",
          "Reserve ticket tiers and upload camera checkout payment proofs",
          "Display e-tickets with barcode/QR check-in stamps"
        ]
      },
      {
        roleName: "API Integration Gateway",
        color: "var(--accent-mint)",
        icon: "🌐",
        features: [
          "Exposes routes to Android emulator loopback (10.0.2.2:8080)",
          "Exposes iOS/Web local network interfaces (localhost:8080)",
          "JWT authorization header security verification"
        ]
      }
    ],
    database: {
      description: "Local device persistent storage utilizing key-value structures to maintain user sessions and offline state indicators.",
      tables: [
        { name: "shared_preferences", fields: ["jwt_token", "user_profile_cache", "is_first_open_state"] }
      ],
      specialFeatures: [
        "Stateless token caching to avoid repeated credential inputs.",
        "Automatic connection host resolver based on device platform."
      ]
    },
    payments: {
      provider: "JWT API Checkout Flow",
      endpoints: [
        { method: "POST", path: "/api/auth/login", desc: "Exchanges user credentials for a secure JWT Bearer authorization token." },
        { method: "POST", path: "/api/checkout/start", desc: "Locks ticket seat quotas and registers order state on the backend." },
        { method: "POST", path: "/api/checkout/confirm", desc: "Sends mobile file upload payload containing checkout payment receipts." },
        { method: "GET", path: "/api/orders", desc: "Retrieves user ticket dashboard and order transaction logs." }
      ]
    },
    setup: {
      steps: [
        { cmd: "flutter devices", desc: "Ensure your Android Emulator or iOS Simulator is active and connected" },
        { cmd: "git clone https://github.com/pratama1246/ticketly.git", desc: "Clone the Flutter repository into your workspace" },
        { cmd: "flutter pub get", desc: "Fetch and download all required packages in pubspec.yaml" },
        { cmd: "Configure API URL", desc: "Double check lib/constants/api_constants.dart points to backend (10.0.2.2:8080 or localhost:8080)" },
        { cmd: "flutter run", desc: "Launch the compiler and deploy the app to your active device/emulator" }
      ],
      envVars: [
        { name: "baseUrl (Android Emulator)", val: "http://10.0.2.2:8080" },
        { name: "baseUrl (iOS / Web)", val: "http://localhost:8080" },
        { name: "Poppins Font", val: "Loaded dynamically via google_fonts package" }
      ]
    },
    demoAccounts: [
      { role: "Test Customer (Budi)", username: "budi_santoso", email: "budi@example.com", password: "password123" },
      { role: "Test Customer (Ani)", username: "ani_wijaya", email: "ani@example.com", password: "password123" }
    ],
    screenshots: []
  },
  8: {
    tagline: "Vanilla PHP web application with flat-file database and NIK Linear Search algorithm.",
    overview: "Employee Payroll Program is a simple Native PHP (Vanilla) web application using a Flat-File Database (.txt) designed to manage employee records and calculate monthly payroll details automatically. Built as a course evaluation mini-project for the Algorithm & Programming (ALPRO) course at Politeknik Negeri Cilacap, the application showcases custom salary logic, Linear Search-based employee lookups, and local text file data persistence.",
    problem: "Evaluating and testing programming logic usually involves terminal/console interfaces that are hard to present, and managing small datasets without heavy database setups like MySQL can be cumbersome.",
    solution: "A web-based interface built with native PHP and custom styling that stores data in local flat text files, handles NIK-based employee searches via a Linear Search algorithm, and calculates allowances/overtime dynamically.",
    keyFeatures: [
      "Admin Login & Session Protection at line 1 on all internal pages",
      "Complete Employee CRUD operations (Create, Read, Update, Delete) stored locally",
      "Linear Search search engine to locate employee records by NIK (16-digit ID)",
      "Automatic monthly salary calculation (Basic, Overtime, Child/Meal Allowances)",
      "Visual user interface styled in NCT-inspired Neo Pearl Champagne green theme",
      "HTML5 numeric pattern validations and XSS prevention using htmlspecialchars()"
    ],
    techStack: [
      { category: "Backend Core", list: ["PHP 8.0+ (Native)", "Flat-File Database (.txt)"] },
      { category: "Frontend & Design", list: ["HTML5", "Vanilla CSS", "Google Fonts (Poppins)"] },
      { category: "Algorithms & Logic", list: ["Linear Search", "Ascending Sorting by NIK", "Session State Management"] }
    ],
    roles: [
      {
        roleName: "Administrator",
        color: "var(--accent-mint)",
        icon: "⚙️",
        features: [
          "Access to Employee CRUD management views",
          "Execute linear searches for employee NIK records",
          "Manage administrator logins (Create accounts, update passwords)",
          "Inspect calculated salary slip details table"
        ]
      }
    ],
    database: {
      description: "Local text-based flat files using custom separators to represent columns and persist data locally without MySQL server dependency.",
      tables: [
        { name: "pengguna.txt (Users)", fields: ["username", "password"] },
        { name: "pegawai.txt (Employees)", fields: ["nik", "name", "address", "grade", "number_of_children", "weekly_hours_worked", "monthly_working_days", "total_salary"] }
      ],
      specialFeatures: [
        "Pipe-separated user credentials format (username|password).",
        "Comma-separated employee records including computed salary values."
      ]
    },
    payments: null,
    setup: {
      steps: [
        { cmd: "git clone https://github.com/pratama1246/Payroll-System-PHP-Native-Alpro-Kelompok3.git", desc: "Clone the ALPRO project files to your local workstation" },
        { cmd: "Check PHP version", desc: "Ensure you have PHP 8.0 or higher installed by running: php -v" },
        { cmd: "php -S localhost:8000", desc: "Start the PHP built-in web server in the project root directory" },
        { cmd: "Open Browser", desc: "Visit http://localhost:8000 in your browser and log in with default credentials" }
      ],
      envVars: [
        { name: "Server URL", val: "http://localhost:8000" },
        { name: "Flat-file paths", val: "data/pegawai.txt and data/pengguna.txt (Must be writable by server)" }
      ]
    },
    demoAccounts: [
      { role: "Administrator", username: "admin", password: "12345" },
      { role: "Administrator (Nata)", username: "nata", password: "12345" }
    ],
    screenshots: []
  },
  9: {
    tagline: "Native PHP web application with MySQL and Respect/Validation for Komdigi JWD certification.",
    overview: "Scholarship Registration System is a web-based application built with native PHP and MySQL, developed as a certification project for the Junior Web Developer (JWD) program by Komdigi (Kementerian Komunikasi dan Digital RI). The system manages end-to-end scholarship application workflows, including student profile submission, document uploading, dynamic GPA fetches via AJAX, and server-side validation using the Respect/Validation library.",
    problem: "Manual scholarship registrations on paper are disorganized and hard to track, while building secure input forms requires robust validation logic to verify files and grades.",
    solution: "A web portal integrating a local MySQL database with native PHP processing, featuring client-side and composer-powered server-side form validations and async IPK fetching.",
    keyFeatures: [
      "Scholarship registration form with multi-field inputs (NIM, name, email, phone)",
      "File upload support for PDF/DOCX academic documents (PHP $_FILES handling)",
      "Dynamic student IPK (GPA) fetching using AJAX and backend script (get_ipk.php)",
      "Server-side validation using Respect/Validation library via Composer",
      "Applicants database management with applicant tables and SQL schema seeder",
      "Modern landing page and registrations result display tables"
    ],
    techStack: [
      { category: "Backend Core", list: ["PHP Native", "MySQL Database"] },
      { category: "Libraries & Dependencies", list: ["Respect/Validation", "Symfony polyfill-mbstring"] },
      { category: "Frontend UI", list: ["HTML5", "CSS3 Custom Styling", "AJAX (JavaScript Fetch)"] }
    ],
    roles: [
      {
        roleName: "Student Applicant",
        color: "var(--accent-pink)",
        icon: "🎓",
        features: [
          "Enter profile data and select scholarship type",
          "See dynamically fetched GPA based on name/NIM",
          "Upload PDF or DOCX format proof documents",
          "View submission result status inside table lists"
        ]
      }
    ],
    database: {
      description: "Relational database schema managed via db_beasiswa.sql file, featuring applicant tracking tables.",
      tables: [
        { name: "pendaftar (Applicants)", fields: ["id", "nama", "email", "nohp", "semester", "ipk", "beasiswa", "berkas", "status_ajuan"] }
      ],
      specialFeatures: [
        "Status check tags (Pending verification / Approved / Cancelled).",
        "Dynamic file path pointer storage."
      ]
    },
    payments: null,
    setup: {
      steps: [
        { cmd: "git clone https://github.com/pratama1246/JWD_project.git", desc: "Clone the JWD project repository to your workspace" },
        { cmd: "composer install", desc: "Download project dependencies (Respect/Validation) using Composer" },
        { cmd: "Import Database Schema", desc: "Create a MySQL database named 'beasiswa' and import db_beasiswa.sql" },
        { cmd: "Configure Database Connection", desc: "Edit conn.php to adjust host, user, password, and database details" },
        { cmd: "php -S localhost:8080", desc: "Launch local PHP web server and open http://localhost:8080 in browser" }
      ],
      envVars: [
        { name: "DB_DATABASE", val: "beasiswa" },
        { name: "DB_USER / PASSWORD", val: "root / (empty)" }
      ]
    },
    demoAccounts: [],
    screenshots: []
  }
}
