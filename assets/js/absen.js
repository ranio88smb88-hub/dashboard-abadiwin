/**
 * ABSEN.JS - Modul untuk manajemen absensi karyawan
 */

// Fungsi utama untuk memuat konten menu Absen
export function loadMenu(container, employeesData) {
    const presentCount = employeesData.filter(emp => emp.status === 'Present').length;
    const lateCount = employeesData.filter(emp => emp.status === 'Late').length;
    const absentCount = employeesData.filter(emp => emp.status === 'Absent').length;
    
    container.innerHTML = `
        <div class="table-header">
            <h3><i class="fas fa-calendar-check"></i> Employee Attendance</h3>
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="search-attendance" placeholder="Search employees...">
            </div>
            <div class="filter-options">
                <button class="filter-btn active" data-filter="all">All (${employeesData.length})</button>
                <button class="filter-btn" data-filter="present">Present (${presentCount})</button>
                <button class="filter-btn" data-filter="late">Late (${lateCount})</button>
                <button class="filter-btn" data-filter="absent">Absent (${absentCount})</button>
            </div>
        </div>
        
        <div class="table-container">
            <table id="attendance-table">
                <thead>
                    <tr>
                        <th>EMPLOYEE</th>
                        <th>ROLE</th>
                        <th>STATUS</th>
                        <th>CLOCK IN</th>
                        <th>CLOCK OUT</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody id="attendance-body">
                    ${generateAttendanceRows(employeesData)}
                </tbody>
            </table>
            
            ${employeesData.length === 0 ? `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <p>NOTHING HERE</p>
                    <p>Tidak ada data absensi untuk ditampilkan</p>
                </div>
            ` : ''}
            
            <div class="pagination">
                <div class="pagination-info">
                    Showing 1 to ${Math.min(employeesData.length, 10)} of ${employeesData.length} entries
                </div>
                <div class="pagination-controls">
                    <button class="pagination-btn" disabled>Previous</button>
                    <div class="pagination-numbers">
                        <span class="page-number active">1</span>
                        ${employeesData.length > 10 ? `<span class="page-number">2</span>` : ''}
                        ${employeesData.length > 20 ? `<span class="page-number">3</span>` : ''}
                    </div>
                    <button class="pagination-btn" ${employeesData.length <= 10 ? 'disabled' : ''}>Next</button>
                </div>
            </div>
        </div>
        
        <div class="action-buttons" style="margin-top: 20px;">
            <button class="btn btn-primary" id="export-attendance">
                <i class="fas fa-file-export"></i> Export to Excel
            </button>
            <button class="btn btn-primary" id="add-attendance">
                <i class="fas fa-plus"></i> Add Manual Attendance
            </button>
            <button class="btn btn-secondary" id="refresh-attendance">
                <i class="fas fa-sync-alt"></i> Refresh Data
            </button>
        </div>
    `;
    
    // Tambahkan event listeners setelah konten dimuat
    attachAttendanceEventListeners(container, employeesData);
}

// Fungsi untuk menghasilkan baris tabel absensi
function generateAttendanceRows(employees) {
    if (employees.length === 0) {
        return '';
    }
    
    return employees.map(employee => `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="avatar-small">
                        <i class="fas fa-user-circle" style="font-size: 2rem; color: #0afeff;"></i>
                    </div>
                    <div>
                        <strong>${employee.name}</strong><br>
                        <small>ID: ${employee.id || 'N/A'}</small>
                    </div>
                </div>
            </td>
            <td>${employee.role || 'Staff'}</td>
            <td>
                <span class="status-badge status-${employee.status.toLowerCase()}">
                    ${employee.status}
                </span>
            </td>
            <td><strong>${employee.clockIn}</strong></td>
            <td><strong>${employee.clockOut}</strong></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-small btn-primary" data-action="edit" data-id="${employee.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-small btn-secondary" data-action="detail" data-id="${employee.id}">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Fungsi untuk menambahkan event listeners
function attachAttendanceEventListeners(container, employeesData) {
    // Filter berdasarkan status
    const filterBtns = container.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            let filteredEmployees = employeesData;
            
            if (filter !== 'all') {
                filteredEmployees = employeesData.filter(emp => 
                    emp.status.toLowerCase() === filter
                );
            }
            
            const tbody = container.querySelector('#attendance-body');
            tbody.innerHTML = generateAttendanceRows(filteredEmployees);
            
            // Update info pagination
            const info = container.querySelector('.pagination-info');
            info.textContent = `Showing 1 to ${Math.min(filteredEmployees.length, 10)} of ${filteredEmployees.length} entries`;
        });
    });
    
    // Pencarian
    const searchInput = container.querySelector('#search-attendance');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filterActive = container.querySelector('.filter-btn.active').dataset.filter;
        
        let filteredEmployees = employeesData;
        
        if (filterActive !== 'all') {
            filteredEmployees = employeesData.filter(emp => 
                emp.status.toLowerCase() === filterActive
            );
        }
        
        if (searchTerm) {
            filteredEmployees = filteredEmployees.filter(emp => 
                emp.name.toLowerCase().includes(searchTerm) ||
                (emp.role && emp.role.toLowerCase().includes(searchTerm))
            );
        }
        
        const tbody = container.querySelector('#attendance-body');
        tbody.innerHTML = generateAttendanceRows(filteredEmployees);
    });
    
    // Tombol aksi
    container.addEventListener('click', function(e) {
        if (e.target.closest('[data-action]')) {
            const button = e.target.closest('[data-action]');
            const action = button.dataset.action;
            const id = button.dataset.id;
            
            if (action === 'edit') {
                alert(`Edit absensi untuk karyawan ID: ${id}`);
                // Di sini bisa ditambahkan modal untuk edit
            } else if (action === 'detail') {
                alert(`Lihat detail absensi untuk karyawan ID: ${id}`);
                // Di sini bisa ditambahkan modal untuk detail
            }
        }
        
        if (e.target.closest('#export-attendance')) {
            alert('Fitur export to Excel akan diimplementasikan');
        }
        
        if (e.target.closest('#add-attendance')) {
            alert('Fitur tambah absensi manual akan diimplementasikan');
        }
        
        if (e.target.closest('#refresh-attendance')) {
            location.reload();
        }
    });
}