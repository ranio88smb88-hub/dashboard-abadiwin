# Abadiwin Management Dashboard

Dashboard manajemen staf dengan fitur lengkap untuk mengelola kehadiran, izin, cuti, jadwal, dan lainnya.

## Fitur
1. **Absen** - Manajemen kehadiran karyawan
2. **Izin** - Pengajuan dan persetujuan izin
3. **Cuti** - Manajemen cuti tahunan
4. **Jadwal** - Pengaturan jadwal kerja
5. **Reports** - Laporan dan analisis
6. **Chat** - Komunikasi internal
7. **Kesalahan** - Pelaporan masalah
8. **Bank** - Informasi rekening karyawan
9. **Galeri** - Galeri perusahaan

## Instalasi dan Menjalankan

### Cara Lokal
1. Clone repository atau download semua file
2. Pastikan struktur folder sesuai
3. Buka `index.html` di browser
4. Tidak memerlukan server karena menggunakan ES6 modules

### Edit Menu
Setiap menu memiliki file JavaScript terpisah di folder `assets/js/`:
- `absen.js` - Menu absensi
- `izin.js` - Menu izin
- `cuti.js` - Menu cuti
- dll...

Untuk mengedit konten menu, buka file JavaScript terkait dan edit fungsi `loadMenu()`.

### Data Karyawan
Data karyawan disimpan di `data/employees.json`. Format:
```json
{
  "id": 1,
  "name": "Nama Karyawan",
  "role": "Posisi",
  "status": "Present/Late/Absent",
  "clockIn": "HH:MM",
  "clockOut": "HH:MM"
}