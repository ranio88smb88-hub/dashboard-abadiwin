/**
 * JADWAL.JS - Modul untuk manajemen jadwal kerja
 */
export function loadMenu(container, employeesData) {
    container.innerHTML = `
        <div class="table-header">
            <h3><i class="fas fa-calendar-alt"></i> Work Schedule Management</h3>
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search schedules...">
            </div>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr><th>EMPLOYEE</th><th>SHIFT</th><th>START</th><th>END</th><th>DAYS</th><th>ACTIONS</th></tr>
                </thead>
                <tbody>
                    <tr><td>Ranio8888</td><td>Regular</td><td>08:00</td><td>17:00</td><td>Mon-Fri</td><td><button class="btn btn-small btn-primary">Edit</button></td></tr>
                    <tr><td>Staff2</td><td>Shift 2</td><td>14:00</td><td>22:00</td><td>Tue-Sat</td><td><button class="btn btn-small btn-primary">Edit</button></td></tr>
                </tbody>
            </table>
        </div>
    `;
}