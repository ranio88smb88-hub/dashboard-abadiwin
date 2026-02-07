/**
 * REPORTS.JS - Modul untuk laporan dan analisis
 */
export function loadMenu(container, employeesData) {
    container.innerHTML = `
        <div class="table-header">
            <h3><i class="fas fa-chart-bar"></i> Reports & Analytics</h3>
        </div>
        <div class="reports-dashboard">
            <div class="report-cards">
                <div class="report-card">
                    <h4><i class="fas fa-calendar-check"></i> Attendance Report</h4>
                    <p>Monthly attendance summary</p>
                    <button class="btn btn-primary">View Report</button>
                </div>
                <div class="report-card">
                    <h4><i class="fas fa-file-invoice-dollar"></i> Payroll Report</h4>
                    <p>Salary and deductions</p>
                    <button class="btn btn-primary">View Report</button>
                </div>
                <div class="report-card">
                    <h4><i class="fas fa-chart-line"></i> Performance Report</h4>
                    <p>Employee performance metrics</p>
                    <button class="btn btn-primary">View Report</button>
                </div>
            </div>
        </div>
    `;
}