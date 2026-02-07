/**
 * GALERI.JS - Modul untuk galeri perusahaan
 */
export function loadMenu(container, employeesData) {
    container.innerHTML = `
        <div class="table-header">
            <h3><i class="fas fa-images"></i> Company Gallery</h3>
        </div>
        <div class="gallery-container">
            <div class="gallery-categories">
                <button class="filter-btn active">All Photos</button>
                <button class="filter-btn">Events</button>
                <button class="filter-btn">Team Building</button>
                <button class="filter-btn">Office</button>
            </div>
            <div class="gallery-grid">
                <div class="gallery-item">
                    <img src="https://via.placeholder.com/300x200/00008B/FFFFFF?text=Event+1" alt="Event">
                    <div class="gallery-caption">Company Anniversary</div>
                </div>
                <div class="gallery-item">
                    <img src="https://via.placeholder.com/300x200/0afeff/000000?text=Team+Building" alt="Team Building">
                    <div class="gallery-caption">Team Building 2024</div>
                </div>
                <div class="gallery-item">
                    <img src="https://via.placeholder.com/300x200/FFD700/000000?text=Office" alt="Office">
                    <div class="gallery-caption">New Office</div>
                </div>
            </div>
        </div>
    `;
}