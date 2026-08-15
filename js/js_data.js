async function loadDatasets() {
  const url =
    "https://script.google.com/macros/s/AKfycbzSUxUtpGOwCGcau0OK6ZJL1SKUqdLw8vaSDCEyV098XR--VovY05Gu4LUWqD00ed7I/exec?page=dataset";

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Datasets:", data);

    eventsData = data.map((item) => ({
      date: item.date,
      title: item.title,
      image: item.image,
      desc: item.desc,
      type: item.type,
      link: item.link,
    }));

    filteredData = [...eventsData];

    displayEvents(currentPage);
  } catch (error) {
    console.error("Gagal mengambil data dataset:", error);
  }
}

// 2. KONFIGURASI PAGINATION
let eventsData = [];
let filteredData = [];

// 2. KONFIGURASI PAGINATION
const itemsPerPage = 5;
let currentPage = 1;

function displayEvents(page) {
  const container = document.getElementById("events-container");
  container.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = filteredData.slice(start, end);

  paginatedItems.forEach((event, index) => {
    const bgClass = index % 2 !== 0 ? "custom-block-bg" : "";

    // Format tanggal agar hanya menampilkan tanggal saja
    const formattedDate = event.date
      ? new Date(event.date).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "";

    container.innerHTML += `
      <div class="row custom-block mb-3 ${bgClass}">
          
          <!-- Kolom Gambar -->
          <div class="col-lg-5 col-md-12 col-12">
              <div class="custom-block-image-wrap">
                  <a href="${event.link}">
                      <img src="${event.image}" class="custom-block-image img-fluid" alt="">
                      <i class="custom-block-icon bi-link"></i>
                  </a>
              </div>
          </div>

          <!-- Kolom Informasi -->
          <div class="col-lg-7 col-12">
              <div class="custom-block-info mt-2 mt-lg-0">

                  <span class="badge bg-secondary mb-2">${formattedDate}</span>

                  <a href="${event.link}" class="events-title mb-3 d-block">
                    ${event.title}
                  </a>

                  <p class="mb-0">${event.desc}</p>

                  <div class="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-2 ms-lg-auto w-100">

                    <div class="d-flex align-items-center gap-1">
                      <span class="custom-block-span">Type:</span>
                      <p class="mb-0">${event.type}</p>
                    </div>

                    <a href="${event.link}" target="_blank" class="btn custom-btn ms-lg-auto">
                      View Datasets
                    </a>

                  </div>
              </div>
          </div>
      </div>
    `;
  });

  renderPagination();
}

// Fungsi membuat tombol angka
function renderPagination() {
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  if (pageCount > 1) {
    for (let i = 1; i <= pageCount; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${currentPage === i ? "active" : ""}`;
      li.innerHTML = `<a class="page-link" href="#section_3" onclick="changePage(event, ${i})">${i}</a>`;
      paginationContainer.appendChild(li);
    }
  }
}

// Fungsi pindah halaman
function changePage(event, page) {
  event.preventDefault(); // Mencegah loncat halaman mendadak
  currentPage = page;
  displayEvents(currentPage);

  // Scroll smooth ke judul section
  document.getElementById("section_3").scrollIntoView({ behavior: "smooth" });
}

function filterAndSort() {
  const keyword = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  const sortValue = document.getElementById("sortSelect").value;

  filteredData = eventsData.filter((item) => {
    return (
      item.title.toLowerCase().includes(keyword) ||
      item.desc.toLowerCase().includes(keyword) ||
      item.type.toLowerCase().includes(keyword) ||
      item.date.toLowerCase().includes(keyword)
    );
  });

  switch (sortValue) {
    case "titleAsc":
      filteredData.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case "titleDesc":
      filteredData.sort((a, b) => b.title.localeCompare(a.title));
      break;

    case "oldest":
      filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;

    case "newest":
      filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
  }

  currentPage = 1;

  displayEvents(currentPage);
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  const sortSelect = document.getElementById("sortSelect");

  if (searchInput) {
    searchInput.addEventListener("input", filterAndSort);
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", filterAndSort);
  }

  loadDatasets();
});
