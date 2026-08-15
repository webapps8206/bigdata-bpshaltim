async function loadFooter() {
  try {
    const response = await fetch("/components/footer.html");
    const html = await response.text();

    const footerContainer = document.getElementById("footer-container");

    if (footerContainer) {
      footerContainer.innerHTML = html;
    }
  } catch (error) {
    console.error("Gagal memuat footer:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadFooter();
});
