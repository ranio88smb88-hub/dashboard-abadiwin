/**
 * KESALAHAN.JS - Modul untuk pelaporan kesalahan
 */
export function loadMenu(container, employeesData) {
    container.innerHTML = `
        <div class="table-header">
            <h3><i class="fas fa-exclamation-triangle"></i> Error & Issue Reporting</h3>
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search issues...">
            </div>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr><th>ID</th><th>TYPE</th><th>DESCRIPTION</th><th>REPORTED BY</th><th>STATUS</th><th>ACTIONS</th></tr>
                </thead>
                <tbody>
                    <tr><td>#001</td><td>System Error</td><td>Login issue</td><td>Ranio8888</td><td><span class="status-badge status-pending">Pending</span></td><td><button class="btn btn-small btn-primary">Resolve</button></td></tr>
                    <tr><td>#002</td><td>Data Error</td><td>Incorrect attendance</td><td>Staff2</td><td><span class="status-badge status-approved">Resolved</span></td><td><button class="btn btn-small btn-secondary">View</button></td></tr>
                </tbody>
            </table>
        </div>
    `;
}