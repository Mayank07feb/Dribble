// Function to handle avatar upload and preview
function handleAvatarUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
      const avatarContainer = document.getElementById('avatarContainer');
      avatarContainer.innerHTML = ''; // Clear existing content
      const imgElement = document.createElement('img');
      imgElement.src = e.target.result;
      avatarContainer.appendChild(imgElement);
  };

  reader.readAsDataURL(file);
}

// Function to handle "Next" button click event
document.addEventListener('DOMContentLoaded', function() {
  const nextButton = document.getElementById('nextButton');
  if (nextButton) {
      nextButton.addEventListener('click', function() {
          window.location.href = 'third.html'; // Replace 'next_page.html' with your actual page URL
      });
  }
});
