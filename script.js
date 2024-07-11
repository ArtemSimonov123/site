// script.js
const vehicleList = document.getElementById('vehicle-list-items');
const bookingForm = document.getElementById('booking-form');

// Fetch vehicles from API
fetch('/api/vehicles')
 .then(response => response.json())
 .then(vehicles => {
    vehicles.forEach(vehicle => {
      const vehicleListItem = document.createElement('li');
      vehicleListItem.textContent = `${vehicle.make} ${vehicle.model} (${vehicle.year})`;
      vehicleListItem.dataset.vehicleId = vehicle._id;
      vehicleList.appendChild(vehicleListItem);
    });
  });

// Add event listener to vehicle list items
vehicleList.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    const vehicleId = event.target.dataset.vehicleId;
    const vehicleSelect = document.getElementById('vehicle-id');
    vehicleSelect.value = vehicleId;
  }
});

// Add event listener to booking form
bookingForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  fetch('/api/bookings', {
    method: 'POST',
    body: formData
  })
 .then(response => response.json())
 .then(booking => {
    console.log(`Booking created: ${booking._id}`);
  })
 .catch(error => {
    console.error(`Error creating booking: ${error}`);
  });
});