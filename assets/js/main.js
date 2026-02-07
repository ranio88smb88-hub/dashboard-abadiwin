/**
 * MAIN.JS - File utama untuk mengelola dashboard Abadiwin Management
 * Tanggung jawab: Menangani navigasi dan memuat modul menu secara dinamis
 */

// Data karyawan dummy (akan diganti dengan data dari employees.json)
let employeesData = [];

// Elemen DOM utama
const contentContainer = document.getElementById('content-container');
const navItems = document.querySelectorAll('.nav-item');
const summaryElements = {
    totalEmployees: document.getElementById('total-employees'),
    presentToday: document.getElementById('present-today'),
    lateToday: document.getElementById('late-today'),
    presentPercentage: document.getElementById('present-percentage')
};

// Fungsi untuk memuat data karyawan dari file JSON
async function loadEmployeesData() {
    try {
        const response = await fetch('data/employees.json');
        if (!response.ok) throw new Error('Gagal memuat data karyawan');
        employeesData = await response.json();
        updateDashboardSummary();
    } catch (error) {
        console.error('Error:', error);
        // Gunakan data dummy jika gagal memuat
        employeesData = [
            {"id": 1, "name": "Ranio8888", "role": "Manager", "status": "Present", "clockIn": "08:00", "clockOut": "17:00"},
            {"id": 2, "name": "Staff2", "role": "Staff IT", "status": "Late", "clockIn": "08:15", "clockOut": "17:00"},
            {"id": 3, "name": "Staff3", "role": "HR", "status": "Present", "clockIn": "07:55", "clockOut": "16:45"},
            {"id": 4, "name": "Staff4", "role": "Finance", "status": "Absent", "clockIn": "-", "clockOut": "-"}
        ];
        updateDashboardSummary();
    }
}

// Fungsi untuk memperbarui ringkasan dashboard
function updateDashboardSummary() {
    const total = employeesData.length;
    const present = employeesData.filter(emp => emp.status === 'Present').length;
    const late = employeesData.filter(emp => emp.status === 'Late').length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    
    summaryElements.totalEmployees.textContent = total;
    summaryElements.presentToday.textContent = present;
    summaryElements.lateToday.textContent = late;
    summaryElements.presentPercentage.textContent = `${percentage}% of present employees (${present} present)`;
}

// Fungsi untuk mengubah menu aktif
function setActiveMenu(menuName) {
    navItems.forEach(item => {
        if (item.dataset.menu === menuName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Fungsi untuk memuat modul menu
async function loadMenuModule(menuName) {
    try {
        // Hapus konten sebelumnya
        contentContainer.innerHTML = '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Memuat...</div>';
        
        // Import modul yang sesuai
        const module = await import(`./${menuName}.js`);
        
        // Panggil fungsi loadMenu dari modul
        if (typeof module.loadMenu === 'function') {
            module.loadMenu(contentContainer, employeesData);
        } else {
            throw new Error(`Fungsi loadMenu tidak ditemukan di ${menuName}.js`);
        }
    } catch (error) {
        console.error('Gagal memuat modul:', error);
        contentContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Gagal memuat menu ${menuName}</h3>
                <p>${error.message}</p>
                <button class="btn btn-primary" onclick="loadMenu('absen')">Kembali ke Dashboard</button>
            </div>
        `;
    }
}

// Fungsi utama untuk memuat menu
window.loadMenu = async function(menuName) {
    setActiveMenu(menuName);
    await loadMenuModule(menuName);
    
    // Simpan menu terakhir yang dibuka di sessionStorage
    sessionStorage.setItem('lastActiveMenu', menuName);
}

// Event Listeners untuk menu navigasi
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const menuName = item.dataset.menu;
        loadMenu(menuName);
    });
});

// Fungsi inisialisasi saat halaman dimuat
async function initializeDashboard() {
    // Muat data karyawan terlebih dahulu
    await loadEmployeesData();
    
    // Cek menu terakhir yang dibuka, atau default ke 'absen'
    const lastActiveMenu = sessionStorage.getItem('lastActiveMenu') || 'absen';
    
    // Muat menu default (Absen)
    await loadMenu(lastActiveMenu);
}

// Inisialisasi dashboard saat halaman siap
document.addEventListener('DOMContentLoaded', initializeDashboard);

// Ekspor fungsi yang diperlukan untuk modul lain
export { employeesData, updateDashboardSummary };