document.addEventListener('DOMContentLoaded', function () {
  // Initialize FullCalendar
  $('#calendar').fullCalendar({
    // Your FullCalendar configuration options
    defaultView: 'month',
    events: getSavedBookings() // Load saved booking data from local storage
  });

  // Show the modal when the "Book Appointment" button is clicked
  const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));

  const bookButton = document.querySelector('.btn-primary');
  bookButton.addEventListener('click', function () {
    bookingModal.show();
  });

  // Event listener for form submission
  const form = document.getElementById('appointment-form');
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = form.elements.name.value;
    const date = form.elements.date.value;
    const startTime = form.elements.start_time.value;
    const endTime = form.elements.end_time.value;
    const appointmentType = form.elements.appointment_type.value;

    // Create a new booking object
    const newBooking = {
      title: name,
      start: date + 'T' + startTime,
      end: date + 'T' + endTime,
      appointmentType: appointmentType
    };

    // Save the booking to local storage
    saveBooking(newBooking);

    // Refresh the calendar with updated events
    $('#calendar').fullCalendar('refetchEvents');

    // Close the modal after successful form submission
    bookingModal.hide();

    // For demonstration purposes, we will just show an alert indicating successful form submission.
    alert(`Thank you, ${name}! Your ${appointmentType} appointment has been booked.`);
    form.reset(); // Reset the form after successful submission

    // Refresh the page after the modal is hidden and the form is submitted
    location.reload();
  });


  // Rest of the code remains the same...

  function saveBooking(booking) {
    // Retrieve existing bookings from local storage or initialize an empty array
    let savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    // Add the new booking to the array
    savedBookings.push(booking);
    // Save the updated array back to local storage
    localStorage.setItem('bookings', JSON.stringify(savedBookings));
  }

  function getSavedBookings() {
    // Retrieve existing bookings from local storage or return an empty array
    return JSON.parse(localStorage.getItem('bookings')) || [];
  }
});