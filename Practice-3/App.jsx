import React, { useState, useEffect } from 'react';

function App() {
  const [Pc, setPc] = useState(5);
  const [sigmaOld, setSigmaOld] = useState(1);
  const [sigmaNew, setSigmaNew] = useState(0.25);
  const [B, setB] = useState(7);
  const [allowedPercent, setAllowedPercent] = useState(5);
  const [results, setResults] = useState({});

  const erf = x => {
    const sign = x >= 0 ? 1 : -1;
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
    const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const absX = Math.abs(x);
    const t = 1 / (1 + p * absX);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  };

  const normalCDF = x => 0.5 * (1 + erf(x / Math.sqrt(2)));

  const calculate = () => {
    const eps = allowedPercent / 100;
    const fracOld = 2 * normalCDF((eps * Pc) / sigmaOld) - 1;
    const fracNew = 2 * normalCDF((eps * Pc) / sigmaNew) - 1;
    const energy = Pc * 24;
    const netOld = energy * (2 * fracOld - 1) * 1000 * B;
    const netNew = energy * (2 * fracNew - 1) * 1000 * B;
    const gain = netNew - netOld;

    setResults({
      fracOld: (fracOld * 100).toFixed(0),
      fracNew: (fracNew * 100).toFixed(0),
      netOld: (netOld / 1000).toFixed(1),
      netNew: (netNew / 1000).toFixed(1),
      gain: (gain / 1000).toFixed(1)
    });
  };

  useEffect(() => calculate(), []);

  const styles = {
    container: { width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#121212', color: '#eee', fontFamily: 'Arial, sans-serif' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' },
    section: { display: 'flex', flexDirection: 'column' },
    label: { marginBottom: '0.3rem', fontSize: '0.9rem' },
    input: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#333', color: '#fff', fontSize: '1rem' },
    btn: { padding: '0.7rem 1.5rem', background: '#1e88e5', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer' },
    results: { marginTop: '1.5rem', lineHeight: '1.5', textAlign: 'center' }
  };

  return (
    <div style={styles.container}>
      <h1>Калькулятор прибутку СЕС</h1>
      <div style={styles.grid}>
        <div style={styles.section}>
          <label style={styles.label}>Pc (MW)</label>
          <input style={styles.input} type="number" value={Pc} onChange={e => setPc(+e.target.value)} />
        </div>
        <div style={styles.section}>
          <label style={styles.label}>σ до (MW)</label>
          <input style={styles.input} type="number" value={sigmaOld} onChange={e => setSigmaOld(+e.target.value)} />
        </div>
        <div style={styles.section}>
          <label style={styles.label}>σ після (MW)</label>
          <input style={styles.input} type="number" value={sigmaNew} onChange={e => setSigmaNew(+e.target.value)} />
        </div>
        <div style={styles.section}>
          <label style={styles.label}>B (UAH/kWh)</label>
          <input style={styles.input} type="number" value={B} onChange={e => setB(+e.target.value)} />
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Доп. похибка (%)</label>
          <input style={styles.input} type="number" step="0.1" value={allowedPercent} onChange={e => setAllowedPercent(+e.target.value)} />
        </div>
      </div>
      <button style={styles.btn} onClick={calculate}>Порахувати</button>
      <div style={styles.results}>
        <p>Доля без небалансу до вдосконалення: {results.fracOld}%</p>
        <p>Доля без небалансу після вдосконалення: {results.fracNew}%</p>
        <p>Прибуток до вдосконалення: {results.netOld} тис. UAH</p>
        <p>Прибуток після вдосконалення: {results.netNew} тис. UAH</p>
        <p>Зміна прибутку: {results.gain} тис. UAH</p>
      </div>
    </div>
  );
}

export default App;
