'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Modal variables
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event to all form input fields
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // Check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Ensure Supabase library is available
  if (typeof supabase === 'undefined') {
    console.error('Supabase library not loaded');
    return;
  }

  // Supabase client initialization
  const { createClient } = supabase;

  const supabaseUrl = 'https://qykriqpfxqdlyyiodpqt.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5a3JpcXBmeHFkbHl5aW9kcHF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MjczNjksImV4cCI6MjAzNzQwMzM2OX0.n7vUJrucX1LnqqMP9VxuE4cPkHhPjfkhNmHLHnI5KHk';
  const supabase = createClient(supabaseUrl, supabaseKey);

  document.querySelector('[data-form]').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fullname = document.querySelector('input[name="fullname"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    console.log('Form Data:', { fullname, email, message });

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{ fullname, email, message }]);

      if (error) {
        console.error('Supabase Error:', error);
        alert('Failed to send message');
      } else {
        console.log('Supabase Data:', data);
        alert('Message sent successfully');
        document.querySelector('[data-form]').reset();
      }
    } catch (err) {
      console.error('Unexpected Error:', err);
      alert('An unexpected error occurred');
    }
  });
});
