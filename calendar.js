let currentDate = new Date();

// Function to format the date in a more readable format
function formatDate(date) {
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    return { monthName, year };
}


function gregorianToNepali(gregorianDate) {
    const nepaliYear = gregorianDate.getFullYear() + 57; // Approximate conversion to Nepali Year
    const nepaliMonth = gregorianDate.getMonth(); // Month remains the same (approx.)
    const nepaliDay = gregorianDate.getDate(); // Day remains the same in this approximation
    return { nepaliYear, nepaliMonth: nepaliMonth + 1, nepaliDay };
}


function displayNepaliDate(gregorianDate) {
    const { nepaliYear, nepaliMonth, nepaliDay } = gregorianToNepali(gregorianDate);
    return `${nepaliDay}/${nepaliMonth}/${nepaliYear}`;
}

// Function to render the calendar
function renderCalendar() {
    const { monthName, year } = formatDate(currentDate);
    const daysContainer = document.getElementById('days');
    const monthNameElement = document.getElementById('month-name');

    // Set month name and year in the header
    monthNameElement.textContent = `${monthName} ${year}`;

    // Get the first day of the current month and the number of days in the month
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const numberOfDays = lastDay.getDate();

    // Clear previous days
    daysContainer.innerHTML = '';

    // Add empty divs for days of the week before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyCell = document.createElement('div');
        daysContainer.appendChild(emptyCell);
    }

    // Add the days of the month
    for (let i = 1; i <= numberOfDays; i++) {
        const dayCell = document.createElement('div');
        dayCell.textContent = i;
        dayCell.addEventListener('click', () => {
            alert(`You clicked on ${i} ${monthName} ${year}`);
        });
        daysContainer.appendChild(dayCell);
    }
}

// Function to go to the previous month
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

// Function to go to the next month
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

// Event listeners for navigation buttons
document.getElementById('prev-month').addEventListener('click', prevMonth);
document.getElementById('next-month').addEventListener('click', nextMonth);

// Initial render of the calendar
renderCalendar();
