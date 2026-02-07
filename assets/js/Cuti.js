/**
 * CUTI.JS - Modul untuk manajemen cuti tahunan
 */
export function loadMenu(container, employeesData) {
    container.innerHTML = `
        <div class="table-header">
            <h3><i class="fas fa-umbrella-beach"></i> Annual Leave Management</h3>
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search annual leave...">
            </div>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr><th>EMPLOYEE</th><th>TOTAL DAYS</th><th>USED</th><th>REMAINING</th><th>ACTIONS</th></tr>
                </thead>
                <tbody>
                    <tr><td>Ranio8888</td><td>12</td><td>3</td><td>9</td><td><button class="btn btn-small btn-primary">Manage</button></td></tr>
                    <tr><td>Staff2</td><td>12</td><td>5</td><td>7</td><td><button class="btn btn-small btn-primary">Manage</button></td></tr>
                </tbody>
            </table>
        </div>
    `;
}