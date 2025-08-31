# Employee Management Web

---

## 🚀 Tech Stack

- **Angular 20**  
  Framework utama untuk membangun aplikasi web berbasis SPA (Single Page Application).

- **Standalone Components**  
  Digunakan untuk menghindari boilerplate `NgModule`, membuat struktur aplikasi lebih modular dan ringan.

- **Lazy Loading**
  Digunakan bersama Angular Router untuk memuat modul/fitur hanya saat dibutuhkan (on-demand).

- **Signals**  
  Dipakai untuk state management reaktif yang lebih sederhana dan efisien dibanding `@Input` / `@Output`.

- **RxJS**  
  Digunakan untuk menangani asynchronous stream seperti HTTP request, event handling, dan data flow reaktif.

- **Angular Material**  
  Dipakai untuk membangun antarmuka aplikasi yang modern, responsif, dan konsisten. Contoh: `Snackbar` (notifikasi), `Dialog`, `Table`, `Button`, dsb.

---

## ⚙️ Environment Setup

### 1. Install Node.js (Minimal Requirement)

Angular CLI membutuhkan Node.js versi minimal:

- **v20.19.x** atau
- **v22.12.x**

Disarankan menggunakan **nvm** agar mudah berpindah versi Node.js.

Install Node.js via nvm
nvm install 22
nvm use 22

Cek versi Node.js:

```bash
node -v
```

## ▶️ Cara Menjalankan Project

Clone repository

```bash
git clone https://github.com/urayfajri/employee-management-web.git
cd employee-management-web
```

Install dependencies

```bash
npm install
```

Jalankan aplikasi

```bash
ng serve
```

Secara default aplikasi akan jalan di:

```bash
👉 http://localhost:4200
```

## 📌 Catatan

- Pastikan Node.js sesuai versi agar Angular CLI bisa berjalan dengan lancar.

- Project ini sepenuhnya menggunakan standalone architecture tanpa NgModule.

- State management sebagian besar ditangani menggunakan signals & RxJS untuk pola reaktif.

- Angular Material dipakai untuk mempercepat pembuatan UI dengan desain konsisten.
