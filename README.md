## AIX-Web

### Prasyarat
- Node.js 18+ disarankan (mendukung Vite 7 dan React 19).

### Instalasi
```bash
npm install
```

### Menjalankan (Development)
```bash
npm run dev
```
Vite akan berjalan di port yang tersedia (biasanya `http://localhost:5173`).

### Build (Production)
```bash
npm run build
npm run preview   # opsional: pratinjau build
```

### Struktur Direktori Ringkas
```
src/
  assets/                 # gambar, video, dll.
  components/
    Elements/
      Loading/Index.jsx   # Loading screen (GSAP + CSS mask)
    Fragments/
      EcosystemContent/   # Grid partner logos + animasi float
      EconomicContent/    # Card dengan efek hover brighten background
      FeatureContent/     # Card dengan efek hover brighten background
      HeaderContent/      # Hero video header
    Layouts/              # Navbar, Footer
  i18n/                   # init i18next
  locales/                # en/id resources
  lib/                    # wagmi, binance helper
  page/                   # Home, Trading, Charts
  style/index.css         # Tailwind + custom CSS animasi/hover
  main.jsx                # Entrypoint + Router + Web3Provider + Loader
```

### Detail Implementasi UI
- Loading Screen (GSAP)
  - Komponen: `src/components/Elements/Loading/Index.jsx`
  - CSS: `src/style/index.css` kelas `.loader-overlay`, `.logo-mask`, `.water-fill`, `.water-wave`
  - Trigger: otomatis hilang setelah event `window.load` (di `src/main.jsx`).
  - Kustomisasi cepat:
    - Warna air: ubah gradient di `.water-wave`.
    - Durasi pengisian: ubah `duration` GSAP di komponen.
    - Warna latar overlay: set variabel CSS `--loader-bg`.

- EcosystemContent (Animasi logo)
  - CSS: keyframes `floatUpDown`/`floatDownUp`, kelas `.eco-float-up`, `.eco-float-down`, dan delay `.eco-delay-1..9` di `style/index.css`.
  - JSX: kelas diterapkan bergantian berdasarkan index item di `EcosystemContent/Index.jsx`.

- Hover Brighten Background (Economic/Feature)
  - CSS: pseudo-element `::before` pada card container untuk memberi `backdrop-filter: brightness(...)` saat hover.
  - Selector:
    - Economic: `.economic-content .card::before`
    - Feature: `.feature-content .cards > div::before`
  - Catatan: `backdrop-filter` butuh browser modern. Intensitas dapat disetel via opacity overlay dan nilai brightness.

### i18n
Inisialisasi di `src/i18n/index.js`, resources di `src/locales/en|id/common.json`. Gunakan `useTranslation()` dari `react-i18next` pada komponen.

### Web3/RainbowKit/Wagmi
Provider dibungkus melalui `src/lib/wagmi.jsx`, dan digunakan di `src/main.jsx`. Tambahkan koneksi chain atau connectors sesuai kebutuhan.

### Skrip NPM
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint ."
}
```

### Kustomisasi Cepat
- Ubah warna tema/hover: edit `src/style/index.css`.
- Ubah rute/halaman: di `src/main.jsx` (React Router).
- Ganti asset logo/video: letakkan di `src/assets` dan update import.

### Troubleshooting
- Loader tidak hilang: pastikan event `window.load` terpanggil; cek network asset besar (video/gambar) yang mungkin menunda. Untuk debug cepat, set `done={true}` sementara di `LoadingScreen`.
- Efek hover tidak terlihat: cek dukungan `backdrop-filter` pada browser. Alternatif: tingkatkan overlay putih (`background: rgba(255,255,255,0.12)`) atau gunakan layering gambar terpisah.
- Port bentrok: jalankan `npm run dev -- --port 5174`.

### Lisensi
Proyek ini menggunakan dependensi open-source sesuai lisensi masing-masing. Konten/brand AIX sesuai ketentuan pemiliknya.
