document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("UjKNynjv7ynXx2Zn7"); // Replace with your actual public key

  // Set default date to today
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("date").value = today;

  // Toggle dropdown display
  const dropdown = document.getElementById("pests");
  dropdown.addEventListener("click", () => {
    dropdown.size = dropdown.size === 1 ? dropdown.options.length : 1;
  });

  // Close dropdown when a selection is made
  dropdown.addEventListener("change", () => {
    dropdown.size = 1;
  });

  // Form submission
  const form = document.getElementById("pestForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const status = document.getElementById("status");
    const name = document.getElementById("name").value.trim();
    const area = document.getElementById("area").value.trim();
    const pests = document.getElementById("pests").value.trim();
    const date = document.getElementById("date").value.trim();
    const photoInput = document.getElementById("photo");

    if (!name || !area || !pests || !date) {
      status.textContent = "Please fill in all required fields.";
      status.style.color = "red";
      return;
    }

    // Prepare the email data
    const emailData = {
      name: name,
      area: area,
      pests: pests,
      date: date
    };

    // Check if a photo is uploaded
    if (photoInput.files.length > 0) {
      const file = photoInput.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        emailData.photo = reader.result; // This will store the image as base64 string
        sendEmail(emailData);
      };

      reader.readAsDataURL(file); // Start reading the image file
    } else {
      sendEmail(emailData);
    }
  });

  // Send email function
  function sendEmail(emailData) {
    // Use the form element for sendForm() to avoid the "Expected HTML form element" error
    emailjs.sendForm("service_ji27tvn", "template_baw0xb6", form) // Change 'your_template_id' to the correct ID
      .then(() => {
        const status = document.getElementById("status");
        status.textContent = "Report and email sent successfully!";
        status.style.color = "green";
        form.reset();
        document.getElementById("date").value = new Date().toISOString().split("T")[0]; // Reset date to today
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        const status = document.getElementById("status");
        status.textContent = "Failed to send report. Please try again.";
        status.style.color = "red";
      });
  }
});
