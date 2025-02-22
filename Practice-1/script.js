function calculateTask1() {
  let HP = parseFloat(document.getElementById("hp1").value);
  let CP = parseFloat(document.getElementById("cp1").value);
  let SP = parseFloat(document.getElementById("sp1").value);
  let NP = parseFloat(document.getElementById("np1").value);
  let OP = parseFloat(document.getElementById("op1").value);
  let WP = parseFloat(document.getElementById("wp1").value);
  let AP = parseFloat(document.getElementById("ap1").value);

  const r2 = (x) => parseFloat(x.toFixed(2));
  const r4 = (x) => parseFloat(x.toFixed(4));

  let K_RtoC = r2(100 / (100 - WP));
  let K_RtoG = r2(100 / (100 - WP - AP));

  let Hc = r2(HP * K_RtoC);
  let Cc = r2(CP * K_RtoC);
  let Sc = r2(SP * K_RtoC);
  let Nc = r2(NP * K_RtoC);
  let Oc = r2(OP * K_RtoC);
  let Ac = r2(AP * K_RtoC);

  let Hg = r2(HP * K_RtoG);
  let Cg = r2(CP * K_RtoG);
  let Sg = r2(SP * K_RtoG);
  let Ng = r2(NP * K_RtoG);
  let Og = r2(OP * K_RtoG);

  let Qr_kJ = 339 * CP + 1030 * HP - 108.8 * (OP - SP) - 25 * WP;
  let Qr = r4(Qr_kJ / 1000);

  let Qd_kJ = 339 * Cc + 1030 * Hc - 108.8 * (Oc - Sc);
  let Qd = r2(Qd_kJ / 1000);

  let Qg_kJ = 339 * Cg + 1030 * Hg - 108.8 * (Og - Sg);
  let Qg = parseFloat((Qg_kJ / 1000).toFixed(1));

  let out = `<h3>Результати (Завдання №1)</h3>
      <p><strong>Коефіцієнти переходу:</strong><br>
      Робоча → Суха: ${K_RtoC}<br>
      Робоча → Горюча: ${K_RtoG}</p>
  
      <p><strong>Склад сухої маси (у %):</strong><br>
      H<sub>C</sub>=${Hc}%, C<sub>C</sub>=${Cc}%, S<sub>C</sub>=${Sc}%, 
      N<sub>C</sub>=${Nc}%, O<sub>C</sub>=${Oc}%, A<sub>C</sub>=${Ac}%</p>
  
      <p><strong>Склад горючої маси (у %):</strong><br>
      H<sub>G</sub>=${Hg}%, C<sub>G</sub>=${Cg}%, S<sub>G</sub>=${Sg}%, 
      N<sub>G</sub>=${Ng}%, O<sub>G</sub>=${Og}%</p>
  
      <p><strong>Нижча теплота згоряння (МДж/кг):</strong><br>
      Робоча маса: ${Qr}<br>
      Суха маса: ${Qd}<br>
      Горюча маса: ${Qg}</p>`;

  document.getElementById("result1").innerHTML = out;
}

function calculateTask2() {
  let cG = parseFloat(document.getElementById("cG").value);
  let hG = parseFloat(document.getElementById("hG").value);
  let oG = parseFloat(document.getElementById("oG").value);
  let sG = parseFloat(document.getElementById("sG").value);
  let qDaf = parseFloat(document.getElementById("qDaf").value);
  let wR = parseFloat(document.getElementById("wR").value);
  let aD = parseFloat(document.getElementById("aD").value);
  let vG = parseFloat(document.getElementById("vG").value);

  const r2 = (x) => parseFloat(x.toFixed(2));

  let factorComb = (100 - wR - aD) / 100;
  let factorAsh = (100 - wR) / 100;

  let cR = r2(cG * factorComb);
  let hR = r2(hG * factorComb);
  let oR = r2(oG * factorComb);
  let sR = r2(sG * factorComb);
  let aR = r2(aD * factorAsh);
  let vR = r2(vG * factorAsh);

  let factorHV = (100 - wR - aR) / 100;
  let Qr_raw = qDaf * factorHV - 0.025 * wR;
  let Qr_val = r2(Qr_raw);

  let out = `<h3>Результати (Завдання №2)</h3>
    <p><strong>Склад робочої маси мазуту:</strong><br>
    C<sub>r</sub>=${cR}%, H<sub>r</sub>=${hR}%, O<sub>r</sub>=${oR}%, S<sub>r</sub>=${sR}%, 
    W<sub>r</sub>=${wR}%, A<sub>r</sub>=${aR}%, V<sub>r</sub>=${vR} мг/кг</p>
  
    <p><strong>Нижча теплота згоряння (робоча маса):</strong> ${Qr_val} МДж/кг</p>`;

  document.getElementById("result2").innerHTML = out;
}
