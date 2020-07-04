const flightInput = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');

let selection = '';

const renderSeats = (data) => {
  document.querySelector('.form-container').style.display = 'block';
  console.log(data);
  data.forEach((rowSeats) => {
    const row = document.createElement('ol');
    row.classList.add('row');
    seatsDiv.appendChild(row);
    console.log(rowSeats);
    rowSeats.forEach((seat) => {
      const seatNumber = seat.id;
      const seatElem = document.createElement('li');

      const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
      const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;
      
      if (seat.isAvailable === false) {
        seatElem.innerHTML = seatOccupied;
      } else {
        seatElem.innerHTML = seatAvailable;
      }
      row.appendChild(seatElem)
        
    });
  });
  // const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
  // for (let r = 1; r < 11; r++) {
  //   const row = document.createElement('ol');
  //   row.classList.add('row');
  //   row.classList.add('fuselage');
  //   seatsDiv.appendChild(row);
  //   for (let s = 1; s < 7; s++) {
  //     const seatNumber = `${r}${alpha[s - 1]}`;
  //     const seat = document.createElement('li');
  //     let id = seatNumber;
  //     // Two types of seats to render
  //     const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
  //     const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;
      
  //     // TODO: render the seat availability based on the data...
  //     if (data[isAvailable] === false) {
  //       console.log(data);
  //       seat.innerHTML = seatOccupied;
  //     } else { seat.innerHTML = seatAvailable}
  //     row.appendChild(seat);
  //   }
  // }

  let seatMap = document.forms['seats'].elements['seat'];
  seatMap.forEach((seat) => {
    seat.onclick = () => {
      selection = seat.value;
      seatMap.forEach((x) => {
        if (x.value !== seat.value) {
          document.getElementById(x.value).classList.remove('selected');
        }
      });
      document.getElementById(seat.value).classList.add('selected');
      document.getElementById('seat-number').innerText = `(${selection})`;
      confirmButton.disabled = false;
    };
  });
};

const toggleFormContent = (event) => {
  const flightNumber = flightInput.value;
  console.log('toggleFormContent: ', flightNumber);
  fetch(`/flights/SA${flightNumber}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      // if (data.message === 'This flight does not exist in our database') {
      //   let flightError = document.getElementById('flight-error');
      //   flightError.innerText = "Sorry, we couldn't find this flight # in our database";
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 1500)
      // } else {
        // data.flight.forEach( seat => {
        //     console.log(seat);
        // });
        if ( data.message === 'not in database') {
        let flightError = document.getElementById('flight-error');
        flightError.innerText = "Sorry, we couldn't find this flight # in our database";
        setTimeout(() => {
              window.location.reload();
            }, 1500)
        } else {
          renderSeats(data);
        }
        
      }
    )}
  // TODO: contact the server to get the seating availability
  //      - only contact the server if the flight number is this format 'SA###'.
  //      - Do I need to create an error message if the number is not valid?

  // TODO: Pass the response data to renderSeats to create the appropriate seat-type.
  
// };

const handleConfirmSeat = (event) => {
  event.preventDefault();
  // TODO: everything in here!
  fetch('/users', {
    method: 'POST',
    body: JSON.stringify({
      flight: `SA${flightInput.value}`,
      seat: selection,
      givenName: document.getElementById('givenName').value,
      surname: document.getElementById('surname').value,
      email: document.getElementById('email').value,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then( res => {
    const { status } = res;
    if (status === 200) {
      window.location.href = '/seat-select/confirmed.html';
    } else { window.location.href = '/'}
  } )
};

flightInput.addEventListener('blur', toggleFormContent);
confirmButton.addEventListener('submit', handleConfirmSeat);
