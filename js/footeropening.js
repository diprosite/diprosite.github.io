document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("footer-container");
  if (!footerContainer) return;

  footerContainer.innerHTML = `
		
<footer class="dexo-footer">
  <div class="footer-top-line"></div>

  <div class="footer-container">

    <div class="footer-main">
      <div class="footer-brand">
        <a href="index.html" class="footer-logo">
          DEXO<span>3</span><i>.</i>
        </a>

        <p>
          One connected digital ecosystem.<br>
          Everything. Simplified.
        </p>

        <a href="https://dexo3.wasmer.app/" class="footer-visit">
          EXPLORE DEXO3 <span>↗</span>
        </a>
      </div>

      <div class="footer-links">
        <div class="footer-column">
          <h4>EXPLORE</h4>
          <a href="index.html">Home</a>
          <a href="products.html">Our Products</a>
          <a href="features.html">Features</a>
          <a href="vision.html">Our Vision</a>
        </div>

        <div class="footer-column">
          <h4>ECOSYSTEM</h4>
          <a href="#">DEXO Coding Studio</a>
          <a href="#">DEXO Calculator</a>
          <a href="#">DEXO Utilities</a>
          <a href="#">All Services</a>
        </div>

        <div class="footer-column">
          <h4>COMPANY</h4>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact</a>
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms</a>
        </div>
      </div>
    </div>

    <div class="footer-big-text">
      DEXO3<span>.</span>
    </div>

    <div class="footer-bottom">
      <p>© <span id="footer-year"></span> DEXO3. ALL RIGHTS RESERVED.</p>

      <p class="footer-status">
        <span class="status-dot"></span>
        BUILDING THE FUTURE
      </p>

      <a href="#top" class="back-top">
        BACK TO TOP ↑
      </a>
    </div>

  </div>
</footer>

<script>
  document.getElementById("footer-year").textContent =
    new Date().getFullYear();
</script>

  `;

  // Automatically update the current year
  const yearElement = document.getElementById("footer-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});