/**
 * IZIN.JS - Modul untuk manajemen izin karyawan
 */

// Data dummy untuk izin
const leaveRequests = [
    { id: 1, name: "Ranio8888", type: "Sakit", date: "2024-01-15", status: "Approved", note: "Demam dan flu" },
    { id: 2, name: "Staff2", type: "Izin Pribadi", date: "2024-01-16", status: "Pending", note: "Keperluan keluarga" },
    { id: 3, name: "Staff3", type: "Izin Setengah Hari", date: "2024-01-14", status: "Rejected", note: "Kontrol dokter" },
    { id: 4, name: "Staff4", type: "Sakit", date: "2024-01-17", status: "Pending", note: "Tidak masuk karena sakit" }
];

// Fungsi utama untuk memuat konten menu Izin
export function loadMenu(container, employeesData) {
    const pendingCount = leaveRequests.filter(req => req.status === 'Pending').length;
    const approvedCount = leaveRequests.filter(req => req.status === 'Approved').length;
    const rejectedCount = leaveRequests.filter(req => req.status === 'Rejected').length;
    
    container.innerHTML = `
        <div class="table-header">
            <h3><i class="fas fa-file-signature"></i> Leave Permission Management</h3>
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="search-leave" placeholder="Search leave requests...">
            </div>
            <div class="filter-options">
                <button class="filter-btn active" data-filter="all">All (${leaveRequests.length})</button>
                <button class="filter-btn" data-filter="pending">Pending (${pendingCount})</button>
                <button class="filter-btn" data-filter="approved">Approved (${approvedCount})</button>
                <button class="filter-btn" data-filter="rejected">Rejected (${rejectedCount})</button>
            </div>
        </div>
        
        <div class="table-container">
            <table id="leave-table">
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>EMPLOYEE</th>
                        <th>TYPE</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                        <th>NOTE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody id="leave-body">
                    ${generateLeaveRows(leaveRequests)}
                </tbody>
            </table>
            
            <div class="action-buttons" style="margin-top: 20px;">
                <button class="btn btn-primary" id="new-leave-request">
                    <i class="fas fa-plus"></i> New Leave Request
                </button>
                <button class="btn btn-secondary" id="print-leave-report">
                    <i class="fas fa-print"></i> Print Report
                </button>
            </div>
        </div>
    `;
    
    attachLeaveEventListeners(container);
}

// Fungsi untuk menghasilkan baris tabel izin
function generateLeaveRows(requests) {
    return requests.map((req, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${req.name}</strong></td>
            <td>${req.type}</td>
            <td>${req.date}</td>
            <td>
                <span class="status-badge status-${req.status.toLowerCase()}">
                    ${req.status}
                </span>
            </td>
            <td>${req.note}</td>
            <td>
                <div class="action-buttons">
                    ${req.status === 'Pending' ? `
                        <button class="btn btn-small btn-primary" data-action="approve" data-id="${req.id}">
                            <i class="fas fa-check"></i> Approve
                        </button>
                        <button class="btn btn-small btn-secondary" data-action="reject" data-id="${req.id}">
                            <i class="fas fa-times"></i> Reject
                        </button>
                    ` : `
                        <button class="btn btn-small btn-secondary" data-action="view" data-id="${req.id}">
                            <i class="fas fa-eye"></i> View
                        </button>
                    `}
                </div>
            </td>
        </tr>
    `).join('');
}

// Fungsi untuk menambahkan event listeners
function attachLeaveEventListeners(container) {
    // Filter
    const filterBtns = container.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            let filtered = leaveRequests;
            
            if (filter !== 'all') {
                filtered = leaveRequests.filter(req => 
                    req.status.toLowerCase() === filter
                );
            }
            
            const tbody = container.querySelector('#leave-body');
            tbody.innerHTML = generateLeaveRows(filtered);
        });
    });
    
    // Search
    const searchInput = container.querySelector('#search-leave');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filterActive = container.querySelector('.filter-btn.active').dataset.filter;
        
        let filtered = leaveRequests;
        
        if (filterActive !== 'all') {
            filtered = leaveRequests.filter(req => 
                req.status.toLowerCase() === filterActive
            );
        }
        
        if (searchTerm) {
            filtered = filtered.filter(req => 
                req.name.toLowerCase().includes(searchTerm) ||
                req.type.toLowerCase().includes(searchTerm) ||
                req.note.toLowerCase().includes(searchTerm)
            );
        }
        
        const tbody = container.querySelector('#leave-body');
        tbody.innerHTML = generateLeaveRows(filtered);
    });
    
    // Action buttons
    container.addEventListener('click', function(e) {
        if (e.target.closest('[data-action]')) {
            const button = e.target.closest('[data-action]');
            const action = button.dataset.action;
            const id = parseInt(button.dataset.id);
            
            if (action === 'approve') {
                if (confirm('Approve izin ini?')) {
                    alert(`Izin ID ${id} telah disetujui`);
                    // Di sini akan ada update data
                }
            } else if (action === 'reject') {
                if (confirm('Tolak izin ini?')) {
                    alert(`Izin ID ${id} telah ditolak`);
                    // Di sini akan ada update data
                }
            } else if (action === 'view') {
                alert(`Lihat detail izin ID: ${id}`);
            }
        }
        
        if (e.target.closest('#new-leave-request')) {
            showLeaveRequestForm(container);
        }
        
        if (e.target.closest('#print-leave-report')) {
            alert('Mencetak laporan izin...');
            window.print();
        }
    });
}

// Fungsi untuk menampilkan form pengajuan izin
function showLeaveRequestForm(container) {
    const formHtml = `
        <div class="modal-overlay" id="leave-form-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-file-medical"></i> New Leave Request</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="leaveRequestForm">
                        <div class="form-group">
                            <label for="employee">Employee:</label>
                            <select id="employee" class="form-control">
                                <option value="">Select Employee</option>
                                <option value="Ranio8888">Ranio8888</option>
                                <option value="Staff2">Staff2</option>
                                <option value="Staff3">Staff3</option>
                                <option value="Staff4">Staff4</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="leaveType">Leave Type:</label>
                            <select id="leaveType" class="form-control">
                                <option value="Sakit">Sakit</option>
                                <option value="Izin Pribadi">Izin Pribadi</option>
                                <option value="Izin Setengah Hari">Izin Setengah Hari</option>
                                <option value="Lainnya">Lainnya</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="leaveDate">Date:</label>
                            <input type="date" id="leaveDate" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="note">Notes:</label>
                            <textarea id="note" class="form-control" rows="3" placeholder="Reason for leave..."></textarea>
                        </div>
                        <div class="form-group">
                            <label for="attachment">Attachment:</label>
                            <input type="file" id="attachment" class="form-control">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancel-leave">Cancel</button>
                    <button class="btn btn-primary" id="submit-leave">Submit Request</button>
                </div>
            </div>
        </div>
    `;
    
    // Tambahkan modal ke body
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = formHtml;
    document.body.appendChild(modalDiv.firstElementChild);
    
    // Event listeners untuk modal
    const modal = document.getElementById('leave-form-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = modal.querySelector('#cancel-leave');
    const submitBtn = modal.querySelector('#submit-leave');
    
    closeBtn.addEventListener('click', () => modal.remove());
    cancelBtn.addEventListener('click', () => modal.remove());
    
    submitBtn.addEventListener('click', () => {
        const employee = modal.querySelector('#employee').value;
        const leaveType = modal.querySelector('#leaveType').value;
        const leaveDate = modal.querySelector('#leaveDate').value;
        const note = modal.querySelector('#note').value;
        
        if (employee && leaveDate) {
            alert(`Leave request submitted for ${employee} on ${leaveDate}`);
            modal.remove();
        } else {
            alert('Please fill in all required fields');
        }
    });
    
    // Close modal ketika klik di luar
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}