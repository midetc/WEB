import React, { useState } from 'react';

export default function App() {

  const [u3, setU3] = useState('');
  const [z3, setZ3] = useState('');
  const [u1, setU1] = useState('');
  const [z1, setZ1] = useState('');
  const [ik, setIk] = useState('');
  const [tau, setTau] = useState('');
  const [ct, setCt] = useState('');
  const [idyn, setIdyn] = useState('');
  const [cdyn, setCdyn] = useState('');

  
  const [i3, setI3] = useState('');
  const [i1, setI1] = useState('');
  const [sTherm, setSTherm] = useState('');
  const [sDyn, setSDyn] = useState('');


  const loadExample7_1 = () => {
    setIk('2500'); setTau('2.5'); setCt('92');
    setU3(''); setZ3(''); setU1(''); setZ1(''); setIdyn(''); setCdyn('');
    clearResults();
  };
  const loadExample7_2 = () => {
    setU3('10500'); setZ3('2.39');
    setU1(''); setZ1(''); setIk(''); setTau(''); setCt(''); setIdyn(''); setCdyn('');
    clearResults();
  };
  const loadExample7_4 = () => {
    setU3('6000'); setZ3('23.8');
    setIk('3900'); setTau('0.6'); setCt('92');
    setIdyn('9400'); setCdyn('92');
    setU1(''); setZ1('');
    clearResults();
  };


  const clearResults = () => {
    setI3(''); setI1(''); setSTherm(''); setSDyn('');
  };


  const calculateAll = () => {
    const U3 = parseFloat(u3);
    const Z3 = parseFloat(z3);
    if (U3 > 0 && Z3 > 0) setI3((U3 / (Math.sqrt(3) * Z3)).toFixed(2)); else setI3('');
    const U1 = parseFloat(u1);
    const Z_1 = parseFloat(z1);
    if (U1 > 0 && Z_1 > 0) setI1((U1 / Z_1).toFixed(2)); else setI1('');
    const I_k = parseFloat(ik);
    const t = parseFloat(tau);
    const C_t = parseFloat(ct);
    if (I_k > 0 && t > 0 && C_t > 0) setSTherm(((I_k * Math.sqrt(t)) / C_t).toFixed(2)); else setSTherm('');
    const I_dyn = parseFloat(idyn);
    const C_dyn = parseFloat(cdyn);
    if (I_dyn > 0 && t > 0 && C_dyn > 0) setSDyn(((I_dyn * Math.sqrt(t)) / C_dyn).toFixed(2)); else setSDyn('');
  };


  const styles = {
    page: { background: '#121212', color: '#E0E0E0', padding: 20, minHeight: '100vh' },
    btn: { margin: '0 8px 8px 0', padding: '8px 12px', background: '#333', border: 'none', color: '#E0E0E0', borderRadius: 4, cursor: 'pointer' },
    grid: { display: 'grid', gridTemplateColumns: '150px 1fr', gap: '8px 12px', alignItems: 'center', marginBottom: 12 },
    input: { width: '100%', padding: 6, borderRadius: 4, border: '1px solid #444', background: '#1E1E1E', color: '#E0E0E0' },
    section: { marginTop: 24 },
    calculate: { marginTop: 16, padding: '8px 16px', background: '#0066CC', border: 'none', color: '#FFF', borderRadius: 4, cursor: 'pointer' },
    resultBlock: { marginTop: 32, padding: 16, background: '#1E1E1E', borderRadius: 4 }
  };

  return (
    <div style={styles.page}>
      <h1>Калькулятор КЗ — Контрольні приклади</h1>

      <div>
        <button style={styles.btn} onClick={loadExample7_1}>Приклад 7.1</button>
        <button style={styles.btn} onClick={loadExample7_2}>Приклад 7.2</button>
        <button style={styles.btn} onClick={loadExample7_4}>Приклад 7.4</button>
      </div>

      <div style={styles.section}>
        <h2>Вхідні дані</h2>
        <div style={styles.grid}>
          <label>U₃ф (L-L) (В):</label>
          <input type="number" style={styles.input} value={u3} onChange={e=>{setU3(e.target.value); setI3('');}} />
        </div>
        <div style={styles.grid}>
          <label>ΣZ₃ (Ω):</label>
          <input type="number" style={styles.input} value={z3} onChange={e=>{setZ3(e.target.value); setI3('');}} />
        </div>
        <div style={styles.grid}>
          <label>U₁ф (В):</label>
          <input type="number" style={styles.input} value={u1} onChange={e=>{setU1(e.target.value); setI1('');}} />
        </div>
        <div style={styles.grid}>
          <label>Z₁ф (Ω):</label>
          <input type="number" style={styles.input} value={z1} onChange={e=>{setZ1(e.target.value); setI1('');}} />
        </div>
        <div style={styles.grid}>
          <label>Iₖ (А):</label>
          <input type="number" style={styles.input} value={ik} onChange={e=>{setIk(e.target.value); setSTherm('');}} />
        </div>
        <div style={styles.grid}>
          <label>τ (с):</label>
          <input type="number" style={styles.input} value={tau} onChange={e=>{setTau(e.target.value); setSTherm(''); setSDyn('');}} />
        </div>
        <div style={styles.grid}>
          <label>Cₜ (A·√s/mm²):</label>
          <input type="number" style={styles.input} value={ct} onChange={e=>{setCt(e.target.value); setSTherm('');}} />
        </div>
        <div style={styles.grid}>
          <label>I_dyn (А):</label>
          <input type="number" style={styles.input} value={idyn} onChange={e=>{setIdyn(e.target.value); setSDyn('');}} />
        </div>
        <div style={styles.grid}>
          <label>C_dyn (A·√s/mm²):</label>
          <input type="number" style={styles.input} value={cdyn} onChange={e=>{setCdyn(e.target.value); setSDyn('');}} />
        </div>
        <button style={styles.calculate} onClick={calculateAll}>Розрахувати</button>
      </div>

      {(i3 || i1 || sTherm || sDyn) && (
        <div style={styles.resultBlock}>
          <h2>Результати</h2>
          <ul>
            {i3 && <li>Трифазний струм I₃ = {i3} A</li>}
            {i1 && <li>Однофазний струм I₁ = {i1} A</li>}
            {sTherm && <li>Мін. переріз (терм.) sₘᵢₙ = {sTherm} мм²</li>}
            {sDyn && <li>Мін. переріз (дінам.) sₘᵢₙ = {sDyn} мм²</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
