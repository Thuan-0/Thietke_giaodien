document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }

  const faqButtons = document.querySelectorAll(".faq-question");
  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      item.classList.toggle("active");
    });
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  const filterCards = document.querySelectorAll("[data-brand]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const value = button.dataset.filter;

      filterCards.forEach((card) => {
        if (value === "all" || card.dataset.brand === value) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  const financeForm = document.getElementById("finance-form");
  if (financeForm) {
    financeForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const price = parseFloat(document.getElementById("carPrice").value) || 0;
      const down = parseFloat(document.getElementById("downPayment").value) || 0;
      const years = parseFloat(document.getElementById("loanYears").value) || 1;
      const rate = parseFloat(document.getElementById("interestRate").value) || 0;

      const loanAmount = price - down;
      const months = years * 12;
      const monthlyRate = rate / 100 / 12;

      let monthlyPayment = 0;

      if (monthlyRate === 0) {
        monthlyPayment = loanAmount / months;
      } else {
        monthlyPayment =
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
      }

      const totalPayment = monthlyPayment * months;
      const totalInterest = totalPayment - loanAmount;

      document.getElementById("monthlyPayment").textContent =
        monthlyPayment.toLocaleString("vi-VN") + " VNĐ";
      document.getElementById("loanAmount").textContent =
        loanAmount.toLocaleString("vi-VN") + " VNĐ";
      document.getElementById("totalInterest").textContent =
        totalInterest.toLocaleString("vi-VN") + " VNĐ";
      document.getElementById("financeResult").classList.remove("hidden");
    });
  }

  const simpleForms = [
    "contact-form",
    "login-form",
    "register-form",
    "test-drive-form",
  ];

  simpleForms.forEach((formId) => {
    const form = document.getElementById(formId);
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Đã gửi thành công. Bạn có thể nối backend sau.");
        form.reset();
      });
    }
  });

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});