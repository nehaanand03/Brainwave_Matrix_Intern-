const plannerContainer = document.getElementById('planner');
const currentDateTime = document.getElementById('currentDateTime');

const startHour = 8;
const endHour = 20;

// Clock
function updateClock() {
  const now = new Date();
  currentDateTime.textContent = now.toLocaleString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
setInterval(updateClock, 1000);
updateClock();

// Generate planner
for (let hour = startHour; hour <= endHour; hour++) {
  const hourLabel = formatHour(hour);
  const timeBlock = document.createElement('div');
  timeBlock.className = 'time-block';

  const hourDiv = document.createElement('div');
  hourDiv.className = 'hour';
  hourDiv.textContent = hourLabel;

  const taskInput = document.createElement('input');
  taskInput.type = 'text';
  taskInput.className = 'task';
  taskInput.id = `task-${hour}`;

  const saveBtn = document.createElement('button');
  saveBtn.className = 'saveBtn';
  saveBtn.innerHTML = '💾';

  const savedTask = localStorage.getItem(`task-${hour}`);
  if (savedTask) taskInput.value = savedTask;

  const nowHour = new Date().getHours();
  if (hour < nowHour) taskInput.classList.add('past');
  else if (hour === nowHour) taskInput.classList.add('present');
  else taskInput.classList.add('future');

  saveBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    localStorage.setItem(`task-${hour}`, task);
    saveBtn.innerHTML = '✅';
    saveBtn.style.background = '#28a745';

    setTimeout(() => {
      saveBtn.innerHTML = '💾';
      saveBtn.style.background = '#007bff';
    }, 1500);
  });

  timeBlock.appendChild(hourDiv);
  timeBlock.appendChild(taskInput);
  timeBlock.appendChild(saveBtn);
  plannerContainer.appendChild(timeBlock);
}

function formatHour(hour) {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour} ${ampm}`;
}
