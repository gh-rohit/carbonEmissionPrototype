document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('emission-form');
    const activitySelect = document.getElementById('activity');
    const quantityContainer = document.getElementById('quantity-container');
    const distanceContainer = document.getElementById('distance-container');
    const miningResultsDiv = document.getElementById('mining-results');
    const transportationResultsDiv = document.getElementById('transportation-results');
    const fuelTypeSelect = document.getElementById('fuelType');
   
    activitySelect.addEventListener('change', (event) => {
        const activity = event.target.value;

        if (activity === 'mining') {
            quantityContainer.style.display = 'block';
            distanceContainer.style.display = 'none';

            // Hide LPG and CNG options for mining
            fuelTypeSelect.querySelectorAll('option').forEach(option => {
                if (option.value === 'LPG' || option.value === 'CNG') {
                    option.style.display = 'none';
                } else {
                    option.style.display = 'block';
                }
            });
        } else if (activity === 'transportation') {
            quantityContainer.style.display = 'none';
            distanceContainer.style.display = 'block';

            // Show all options for transportation
            fuelTypeSelect.querySelectorAll('option').forEach(option => {
                option.style.display = 'block';
            });
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting the traditional way

        // Get form data
        const activity = document.getElementById('activity').value;
        const quantity = parseFloat(document.getElementById('quantity').value) || 0;
        const fuelType = document.getElementById('fuelType').value;
        const distance = parseFloat(document.getElementById('distance').value) || 0;

        let emission = 0;
        let oxygenRequired = 0;
        let treesRequired = 0;

        // Clear previous results
        miningResultsDiv.innerHTML = '';
        transportationResultsDiv.innerHTML = '';

        if (activity === 'mining') {
            if (fuelType === 'diesel') {
                // Diesel values for mining
                const fuelConsumptionPerTon = 50; // liters per ton
                const emissionFactorDiesel = 2.7; // kg CO2 per liter

                const totalFuelConsumption = quantity * fuelConsumptionPerTon;
                emission = totalFuelConsumption * emissionFactorDiesel;

            } else if (fuelType === 'gasoline') {
                // Gasoline values for mining
                const fuelConsumptionPerTon = 55; // liters per ton
                const emissionFactorGasoline = 2.3; // kg CO2 per liter

                const totalFuelConsumption = quantity * fuelConsumptionPerTon;
                emission = totalFuelConsumption * emissionFactorGasoline;

            } else if (fuelType === 'LPG') {
                // LPG values for mining (assuming it's valid)
                const emissionFactorLPG = 0.234; // kg CO2 per kWh (example value)

                // Assuming quantity represents kWh in this case
                emission = quantity * emissionFactorLPG;

            } else if (fuelType === 'CNG') {
                // CNG values for mining (assuming it's valid)
                const emissionFactorCNG = 0.214; // kg CO2 per kWh (example value)

                // Assuming quantity represents kWh in this case
                emission = quantity * emissionFactorCNG;

            } else {
                // Handle invalid fuel types for mining
                miningResultsDiv.innerHTML = `
                    <h2>Mining Activity Results</h2>
                    <p>Invalid fuel type selected for mining.</p>
                `;
                return;
            }

            // Display results for mining
            miningResultsDiv.innerHTML = `
                <h2>Mining Activity Results</h2>
                <p>Emission: ${emission.toFixed(2)} kg CO₂</p>
            `;

        } else if (activity === 'transportation') {
            if (fuelType === 'diesel') {
                // Diesel values for transportation
                const fuelConsumptionPerKm = 0.5; // liters per km
                const emissionFactorDiesel = 2.7; // kg CO2 per liter

                const totalFuelConsumption = distance * fuelConsumptionPerKm;
                emission = totalFuelConsumption * emissionFactorDiesel;

            } else if (fuelType === 'gasoline') {
                // Gasoline values for transportation
                const fuelConsumptionPerKm = 0.4; // liters per km
                const emissionFactorGasoline = 2.3; // kg CO2 per liter

                const totalFuelConsumption = distance * fuelConsumptionPerKm;
                emission = totalFuelConsumption * emissionFactorGasoline;

            } else if (fuelType === 'LPG') {
                // LPG values for transportation
                const energyConsumptionPerKm = 0.1; // kWh per km
                const emissionFactorLPG = 1.66; // kg CO2 per kWh (example value)

                const totalEnergyConsumption = distance * energyConsumptionPerKm;
                emission = totalEnergyConsumption * emissionFactorLPG;

            } else if (fuelType === 'CNG') {
                // CNG values for transportation
                const energyConsumptionPerKm = 0.12; // kWh per km (example value)
                const emissionFactorCNG = 1.30; // kg CO2 per kWh (example value)

                const totalEnergyConsumption = distance * energyConsumptionPerKm;
                emission = totalEnergyConsumption * emissionFactorCNG;

            } else {
                // Handle invalid fuel types for transportation
                transportationResultsDiv.innerHTML = `
                    <h2>Transportation Activity Results</h2>
                    <p>Invalid fuel type selected for transportation.</p>
                `;
                return;
            }

            // Display results for transportation
            transportationResultsDiv.innerHTML = `
                <h2>Transportation Activity Results</h2>
                <p>Emission: ${emission.toFixed(2)} kg CO₂</p>
            `;
        }

        // Calculate oxygen required and trees needed
        oxygenRequired = emission * 2.29; // The factor 2.29 is an approximation; adjust as needed
        treesRequired = emission / 0.022; // Assuming 1 tree can absorb 22kg of CO2 per year

        // Display the oxygen required and trees needed
        if(emission===0){
            document.getElementById('trees-required').innerText=" To sustain life, there must be trees "
        }
        else{
            document.getElementById('total-co2').innerText = emission.toFixed(2);
            document.getElementById('oxygen-needed').innerText = oxygenRequired.toFixed(2);
            document.getElementById('trees-required').innerText = treesRequired.toFixed(0);
           

        }
      
    });
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.remove('active');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const wasteDropdown = document.getElementById('waste-dropdown');

    wasteDropdown.addEventListener('change', function() {
        // Hide all management info sections
        document.querySelectorAll('.management-info').forEach(item => {
            item.classList.remove('active');
        });

        // Show the selected management info section
        const selectedValue = this.value;
        if (selectedValue) {
            const selectedElement = document.getElementById(selectedValue);
            if (selectedElement) {
                selectedElement.classList.add('active');
            }
        }
    });
});


