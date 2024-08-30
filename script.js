document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('emission-form');
    const activitySelect = document.getElementById('activity');
    const quantityContainer = document.getElementById('quantity-container');
    const distanceContainer = document.getElementById('distance-container');
    const miningResultsDiv = document.getElementById('mining-results');
    const transportationResultsDiv = document.getElementById('transportation-results');

    activitySelect.addEventListener('change', (event) => {
        const activity = event.target.value;

        if (activity === 'mining') {
            quantityContainer.style.display = 'block';
            distanceContainer.style.display = 'none';
        } else if (activity === 'transportation') {
            quantityContainer.style.display = 'none';
            distanceContainer.style.display = 'block';
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

                miningResultsDiv.innerHTML = `
                    <h2>Mining Activity Results</h2>
                    <p>Emission: ${emission.toFixed(2)} kg CO₂</p>
                `;
            } else if (fuelType === 'gasoline') {
                // Gasoline values for mining
                const fuelConsumptionPerTon = 55; // liters per ton
                const emissionFactorGasoline = 2.3; // kg CO2 per liter

                const totalFuelConsumption = quantity * fuelConsumptionPerTon;
                emission = totalFuelConsumption * emissionFactorGasoline;

                miningResultsDiv.innerHTML = `
                    <h2>Mining Activity Results</h2>
                    <p>Emission: ${emission.toFixed(2)} kg CO₂</p>
                `;
            } else if (fuelType === 'electricity') {
                // Electricity values for mining
                const emissionFactorElectricity = 0.5; // kg CO2 per kWh (example value)

                // Assuming quantity represents kWh in this case
                emission = quantity * emissionFactorElectricity;

                miningResultsDiv.innerHTML = `
                    <h2>Mining Activity Results</h2>
                    <p>Emission: ${emission.toFixed(2)} kg CO₂</p>
                `;
            }
        } else if (activity === 'transportation') {
            if (fuelType === 'diesel') {
                // Diesel values for transportation
                const fuelConsumptionPerKm = 0.5; // liters per km
                const emissionFactorDiesel = 2.7; // kg CO2 per liter

               

                const totalFuelConsumption = distance * fuelConsumptionPerKm;
                emission = totalFuelConsumption * emissionFactorDiesel;

                transportationResultsDiv.innerHTML = `
                    <h2>Transportation Activity Results</h2>
                    <p>Emission: ${emission.toFixed(2)} kg CO₂</p>
                `;
            } else if (fuelType === 'gasoline') {
                // Gasoline values for transportation
                const fuelConsumptionPerKm = 0.4; // liters per km
                const emissionFactorGasoline = 2.3; // kg CO2 per liter

                const totalFuelConsumption = distance * fuelConsumptionPerKm;
                emission = totalFuelConsumption * emissionFactorGasoline;

                transportationResultsDiv.innerHTML = `
                    <h2>Transportation Activity Results</h2>
                    <p>Emission: ${emission.toFixed(2)} kg CO₂</p>
                `;
            } else if (fuelType === 'electricity') {
                // Electricity values for transportation
                const energyConsumptionPerKm = 0.2; // kWh per km
                const emissionFactorElectricity = 0.5; // kg CO2 per kWh (example value)

                const totalEnergyConsumption = distance * energyConsumptionPerKm;
                emission = totalEnergyConsumption * emissionFactorElectricity;

                transportationResultsDiv.innerHTML = `
                    <h2>Transportation Activity Results</h2>
                    <p>Emission: ${emission.toFixed(2)} kg CO₂</p>
                `;
            }
        }
    });
});

