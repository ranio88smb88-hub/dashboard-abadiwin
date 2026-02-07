/**
 * BANK.JS - Modul untuk informasi rekening bank karyawan
 */
export function loadMenu(container, employeesData) {
    container.innerHTML = `
        <div class="table-header">
            <h3><i class="fas fa-university"></i> Bank Account Information</h3>
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search bank accounts...">
            </div>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr><th>EMPLOYEE</th><th>BANK NAME</th><th>ACCOUNT NUMBER</th><th>ACCOUNT HOLDER</th><th>ACTIONS</th></tr>
                </thead>
                <tbody>
                    <tr><td>Ranio8888</td><td>BCA</td><td>1234567890</td><td>Ranio</td><td><button class="btn btn-small btn-primary">Edit</button></td></tr>
                    <tr><td>Staff2</td><td>Mandiri</td><td>0987654321</td><td>Staff Dua</td><td><button class="btn btn-small btn-primary">Edit</button></td></tr>
                </tbody>
            </table>
        </div>
    `;
}