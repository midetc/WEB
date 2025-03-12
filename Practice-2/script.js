// Функція для розрахунків
function calculate() {
  const coalMass  = parseFloat(document.getElementById("coalMass").value);
  const mazutMass = parseFloat(document.getElementById("mazutMass").value);
  const gasVolume = parseFloat(document.getElementById("gasVolume").value);

  const coalQr  = parseFloat(document.getElementById("coalQr").value);
  const mazutQr = parseFloat(document.getElementById("mazutQr").value);
  const gasQr   = parseFloat(document.getElementById("gasQr").value);

  const kCoal  = parseFloat(document.getElementById("kCoal").value);  
  const kMazut = parseFloat(document.getElementById("kMazut").value); 
  const kGas   = parseFloat(document.getElementById("kGas").value);   

  const GJ_coal  = coalMass  * coalQr;

  const GJ_mazut = mazutMass * mazutQr;

  const GJ_gas   = gasVolume * gasQr;

  const E_coal  = (kCoal  * GJ_coal)  / 1e6;
  const E_mazut = (kMazut * GJ_mazut) / 1e6;
  const E_gas   = (kGas   * GJ_gas)   / 1e6;

  const E_coal_str  = E_coal.toFixed(2);
  const E_mazut_str = E_mazut.toFixed(2);
  const E_gas_str   = E_gas.toFixed(2);

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
    <p><strong>Показник емісії (вугілля)</strong>: ${kCoal} г/ГДж</p>
    <p>Валовий викид (вугілля): <strong>${E_coal_str} т</strong></p>
    <hr>
    <p><strong>Показник емісії (мазут)</strong>: ${kMazut} г/ГДж</p>
    <p>Валовий викид (мазут): <strong>${E_mazut_str} т</strong></p>
    <hr>
    <p><strong>Показник емісії (газ)</strong>: ${kGas} г/ГДж</p>
    <p>Валовий викид (газ): <strong>${E_gas_str} т</strong></p>
  `;
}
