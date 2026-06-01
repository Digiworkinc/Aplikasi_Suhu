🌤️ Aplikasi Cuaca (Weather App)

Sebuah aplikasi web berbasis Vanilla JavaScript yang memungkinkan pengguna untuk mencari dan melihat informasi cuaca secara real-time di kota-kota seluruh dunia. Aplikasi ini menggunakan Open-Meteo API yang gratis dan tidak memerlukan API Key.

✨ Fitur Utama

Pencarian Lokasi: Cari kondisi cuaca di kota mana saja di seluruh dunia.

Data Real-time: Menampilkan Suhu Utama, "Terasa Seperti" (Apparent Temperature), Kelembapan, dan Kecepatan Angin.

UI Dinamis (Day/Night Mode): Latar belakang aplikasi dan ikon cuaca berubah secara otomatis menyesuaikan kondisi waktu di lokasi tersebut (siang atau malam).

Desain Modern: Menggunakan gaya Glassmorphism (semi-transparan) dengan animasi transisi yang mulus.

State Management Sederhana: Dilengkapi dengan loading skeleton (efek memuat) dan penanganan pesan error jika kota tidak ditemukan.

🛠️ Teknologi yang Digunakan

HTML5 & Vanilla JavaScript (Tanpa framework)

Tailwind CSS (via CDN untuk styling yang cepat dan responsif)

Lucide Icons (Untuk ikon vektor berbasis SVG)

Open-Meteo API (Geocoding API & Weather Forecast API)

🚀 Cara Menjalankan Secara Lokal

Karena aplikasi ini dibangun menggunakan HTML dan JavaScript murni, Anda tidak perlu melakukan instalasi dependensi (NPM) atau menjalankan server lokal khusus.

Clone repositori ini ke komputer Anda:

git clone https://github.com/username-anda/nama-repo-anda.git


Buka folder proyek tersebut.

Klik dua kali pada file index.html untuk membukanya langsung di browser internet Anda.

(Catatan: Pastikan komputer Anda terhubung ke internet karena aplikasi ini mengambil styling Tailwind dan data cuaca dari luar).

📂 Struktur Direktori

Jika Anda mengikuti praktik pemisahan file untuk GitHub, struktur Anda akan terlihat seperti ini:

├── index.html     # Struktur tampilan utama
├── script.js      # Logika aplikasi dan pengambilan data API
└── README.md      # Dokumentasi proyek ini


💡 Sumber API

Data cuaca dan koordinat lokasi disediakan secara gratis oleh Open-Meteo.

Dibuat untuk keperluan pembelajaran dan eksplorasi Vanilla JavaScript.
