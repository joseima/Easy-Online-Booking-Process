const order = {
    initialDate: '',
    endDate: '',
    days: '',
    vehicle: '',
    insurance: false,
    wifi: false,
  };
  
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const startDate = document.getElementById('startDate');
  const endDate = document.getElementById('endDate');
  const vehicleInputs = document.querySelectorAll('input[name="vehicle"]');
  const insurance = document.getElementById('insurance');
  const wifi = document.getElementById('wifi');
  const daysAmountDiv = document.querySelector('.days-amount');
  const startDateLabel = document.querySelector('.start-date-label');
  const endDateLabel = document.querySelector('.end-date-label');
  
  const dateSummary = document.getElementById('dateSummary');
  const daysSummary = document.getElementById('daysSummary');
  const vehicleSummary = document.getElementById('vehicleSummary');
  const insuranceSummary = document.getElementById('insuranceSummary');
  const wifiSummary = document.getElementById('wifiSummary');
  
  const progressStep1 = document.getElementById('progressStep1');
  const progressStep2 = document.getElementById('progressStep2');
  const progressStep3 = document.getElementById('progressStep3');
  const navStep1 = document.querySelector('.nav:nth-of-type(1)')
  const navStep2 = document.querySelector('.nav:nth-of-type(2)')
  const navStep3 = document.querySelector('.nav:nth-of-type(3)')
  const validationError = document.getElementById('validationError');
  
  function updateSummary() {
    validationError.textContent = '';
    dateSummary.textContent = `${order.initialDate || ''} - ${order.endDate || ''}`;
    daysSummary.textContent = order.days || '';
    vehicleSummary.textContent = order.vehicle || '';
    insuranceSummary.textContent = order.insurance ? 'Yes' : 'No';
    wifiSummary.textContent = order.wifi ? 'Yes' : 'No';
  
    if (order.initialDate && order.endDate && order.days !== null) {
      navStep1.classList.add('completed');
      progressStep1.classList.add('completed');
    } else {
      navStep1.classList.remove('completed');
      progressStep1.classList.remove('completed');
    }
  
    if (order.vehicle) {
      navStep2.classList.add('completed');
      progressStep2.classList.add('completed');
    } else {
      navStep2.classList.remove('completed');
      progressStep2.classList.remove('completed');
    }
  
    if (order.insurance == true || order.wifi == true) {
      navStep3.classList.add('completed');
      progressStep3.classList.add('completed');
    } else {
      navStep3.classList.remove('completed');
      progressStep3.classList.remove('completed');
    }
  }
  
  vehicleInputs.forEach(input => {
    input.addEventListener('change', () => {
      order.vehicle = input.value;
      updateSummary();
    });
  });
  
  insurance.addEventListener('change', () => {
    order.insurance = insurance.checked;
    updateSummary();
  });
  
  wifi.addEventListener('change', () => {
    order.wifi = wifi.checked;
    updateSummary();
  });

  function calculateDays() {
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
  
    if (start && end && start <= end) {
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      daysAmountDiv.textContent = `${diffDays} Days selected`;
      order.days = diffDays;  
    } else {
      daysAmountDiv.textContent = 'Select your days'; 
      order.days = null;  
    }
  }

  startDate.addEventListener('change', function() {
    const startDateActualValue = startDate.value;
    order.initialDate = startDateActualValue;
    endDate.min = startDateActualValue;
    const selectedDate = new Date(startDateActualValue);
    const dayNumber = selectedDate.getDate();
    const dayName = dayNames[selectedDate.getDay()];
    startDateLabel.innerHTML = `${dayNumber} <span>${dayName}</span>` ;
    calculateDays(); 
    updateSummary();
  });

  endDate.addEventListener('change', function() {
    const endDateActualValue = endDate.value;
    order.endDate = endDateActualValue;
    startDate.max = endDateActualValue;
    const selectedDate = new Date(endDateActualValue);
    const dayNumber = selectedDate.getDate();
    const dayName = dayNames[selectedDate.getDay()];
    endDateLabel.innerHTML = `${dayNumber} <span>${dayName}</span>` ;
    calculateDays();
    updateSummary();
  });
  
  function resetOrder() {
      order.initialDate = '';
      order.endDate = '';
      order.days = '';
      order.vehicle = '';
      order.insurance = false;
      order.wifi = false;
      startDateLabel.textContent = 'Initial date:' ;
      endDateLabel.textContent = 'Ending date:' ;
      daysAmountDiv.textContent = 'Select your days'; 
      updateSummary()
  }

  rentalForm.addEventListener('reset', resetOrder);
  
  document.getElementById('rentalForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (order.initialDate === ''  || order.endDate  === ''  || order.vehicle  === '' ) {
      validationError.textContent = 'Please select required options';
    } else {
      fetch('/api/scandinavian-rent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Ordeer sent:', data);
        })
        .catch(error => {
          alert('Order process pending');
          console.error('There was an error processing the order:', error);
        });

    }
  });
  