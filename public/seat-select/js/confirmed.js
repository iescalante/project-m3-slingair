    const flightNum = document.getElementById('flight');
    const seatNum = document.getElementById('seat');
    const fullname = document.getElementById('name');
    const givenEmail = document.getElementById('email');
    const btnReservation = document.getElementById('view-reservation');

const renderConfirmation = () => {
    fetch('/users', 
//     {
//         method: 'GET',
//         body: {
//         flight: flight,
//         seat: seat,
//         name : givenName + surname,
//         email: email,
//     },
// }
)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        flightNum.innerText =`${data[0].flight}`;
        seatNum.innerText = `${data[0].seat}`;
        fullname.innerText = `${data[0].givenName} ${data[0].surname}`;
        givenEmail.innerText = `${data[0].email}`;
    })
}

renderConfirmation();
btnReservation.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href ='/seat-select/view-reservation.html';
});