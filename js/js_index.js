async function loadPublications() {
  const url =
    "https://script.google.com/macros/s/AKfycbzSUxUtpGOwCGcau0OK6ZJL1SKUqdLw8vaSDCEyV098XR--VovY05Gu4LUWqD00ed7I/exec?page=publikasi";

  try {
    const response = await fetch(url);
    const data = await response.json();

    const top2 = data.slice(0, 2);

    renderPublication(top2);
  } catch (error) {
    console.error(error);
  }
}

async function loadDashboard() {
  const url =
    "https://script.google.com/macros/s/AKfycbzSUxUtpGOwCGcau0OK6ZJL1SKUqdLw8vaSDCEyV098XR--VovY05Gu4LUWqD00ed7I/exec?page=dashboard";

  try {
    const response = await fetch(url);
    const data = await response.json();

    const top2 = data.slice(0, 2);

    renderDashboard(top2);
  } catch (error) {
    console.error(error);
  }
}

// Format tanggal Indonesia
function formatDate(dateString) {
  return dateString
    ? new Date(dateString).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";
}

function renderPublication(data) {
  const container = document.getElementById("publication-container");

  container.innerHTML = data
    .map(
      (item) => `
            <div class="col-lg-6 col-12">
              <div class="custom-block-image-wrap">
                <a href="${item.link}">
                  <img
                    src="${item.image}"
                    class="custom-block-image img-fluid"
                    alt=""
                  />
    
                  <i class="custom-block-icon bi-link"></i>
                </a>
    
                <div class="custom-block-date-wrap">
                  <strong class="text-white">
                    ${formatDate(item.date)}
                  </strong>
                </div>
    
                <div class="custom-btn-wrap">
                  <a href="${item.link}" class="btn custom-btn">
                    Selengkapnya
                  </a>
                </div>
              </div>
    
              <div class="custom-block-info">
                <a href="${item.link}" class="events-title mb-2">
                  ${item.title}
                </a>
    
                <p class="mb-0">
                  ${item.desc}
                </p>
              </div>
            </div>
          `
    )
    .join("");
}

function renderDashboard(data) {
  const container = document.getElementById("dashboard-container");

  container.innerHTML = data
    .map(
      (item) => `
            <div class="col-lg-6 col-12">
              <div class="custom-block-image-wrap">
                <a href="${item.link}">
                  <img
                    src="${item.image}"
                    class="custom-block-image img-fluid"
                    alt=""
                  />
    
                  <i class="custom-block-icon bi-link"></i>
                </a>
    
                <div class="custom-block-date-wrap">
                  <strong class="text-white">
                    ${formatDate(item.date)}
                  </strong>
                </div>
    
                <div class="custom-btn-wrap">
                  <a href="${item.link}" class="btn custom-btn">
                    Selengkapnya
                  </a>
                </div>
              </div>
    
              <div class="custom-block-info">
                <a href="${item.link}" class="events-title mb-2">
                  ${item.title}
                </a>
    
                <p class="mb-0">
                  ${item.desc}
                </p>
              </div>
            </div>
          `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", function () {
  loadPublications();
  loadDashboard();
});
