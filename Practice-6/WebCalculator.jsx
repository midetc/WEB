import React, { useState } from 'react';  

export default function WebCalculator() { 
  const initialLoads = [
    { id: 1, name: 'Шліфувальний верстат', n: 4, Pn: 20, Kv: 0.15, tg: 1.33 }, 
    { id: 2, name: 'Свердлильний верстат', n: 2, Pn: 14, Kv: 0.12, tg: 1.0 },  
    { id: 3, name: 'Фугувальний верстат', n: 4, Pn: 42, Kv: 0.15, tg: 1.33 },  
    { id: 4, name: 'Циркулярна пила', n: 1, Pn: 36, Kv: 0.3, tg: 1.56 },        
    { id: 5, name: 'Прес', n: 1, Pn: 20, Kv: 0.5, tg: 0.75 },               
    { id: 6, name: 'Полірувальний верстат', n: 1, Pn: 40, Kv: 0.2, tg: 1.0 }, 
    { id: 7, name: 'Фрезерний верстат', n: 2, Pn: 32, Kv: 0.2, tg: 1.0 },       
    { id: 8, name: 'Вентилятор', n: 1, Pn: 20, Kv: 0.65, tg: 0.75 }          
  ];

  const [loads, setLoads] = useState(initialLoads); 
  const [timeConstant, setTimeConstant] = useState(10); 
  const [results, setResults] = useState(null); 

  const handleChange = (id, field, value) => {
    const v = field === 'name' ? value : parseFloat(value) || 0; 
    setLoads(loads.map(l => l.id === id ? { ...l, [field]: v } : l));
  };

  const addLoad = () => {
    const nextId = loads.length ? Math.max(...loads.map(l => l.id)) + 1 : 1;
    setLoads([...loads, { id: nextId, name: '', n: 1, Pn: 0, Kv: 0, tg: 0 }]);
  };

  const removeLoad = id => setLoads(loads.filter(l => l.id !== id));

  const calculate = () => {
    // 1) 
    const sumPn       = loads.reduce((s, { n, Pn }) => s + n * Pn, 0);
    // 2) 
    const sumActive   = loads.reduce((s, { n, Pn, Kv }) => s + n * Pn * Kv, 0);
    // 3) 
    const sumPn2Kv    = loads.reduce((s, { n, Pn, Kv }) => s + n * Pn * Pn * Kv, 0);
    // 4) 
    const sumReactive = loads.reduce((s, { n, Pn, Kv, tg }) => s + n * Pn * Kv * tg, 0);

    // 5) 
    const groupKv = sumActive / sumPn;
    // 6) 
    const ne      = (sumActive * sumActive) / sumPn2Kv;
    // 7) 
    const Kp      = timeConstant === 10
      ? (groupKv <= 0.25 && ne <= 15 ? 1.25 : 1.0)
      : (groupKv <= 0.32 && ne <= 56 ? 0.7  : 1.0);

    // 8) 
    const Pp = Kp * sumActive;                  // активна
    const Qp = sumReactive;                     // реактивна
    const Sp = Math.sqrt(Pp * Pp + Qp * Qp);    // повна
    const Ip = (Pp * 1000) / 380;               // струм лінії

    setResults({ sumPn, sumActive, groupKv, ne, Kp, Pp, Qp, Sp, Ip }); 
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Калькулятор навантажень</h1>

        <div className="space-y-4">
          {loads.map(load => (
            <div key={load.id} className="grid grid-cols-6 gap-2">
              <input
                className="col-span-2 p-2 bg-gray-800 text-white border border-gray-700 rounded"
                placeholder="Назва"
                value={load.name}
                onChange={e => handleChange(load.id, 'name', e.target.value)}
              /> 

              <input
                className="p-2 bg-gray-800 text-white border border-gray-700 rounded"
                type="number"
                placeholder="n"
                value={load.n}
                onChange={e => handleChange(load.id, 'n', e.target.value)}
              /> 
              <input
                className="p-2 bg-gray-800 text-white border border-gray-700 rounded"
                type="number"
                placeholder="Pn, кВт"
                step="any"
                value={load.Pn}
                onChange={e => handleChange(load.id, 'Pn', e.target.value)}
              /> 

              <input
                className="p-2 bg-gray-800 text-white border border-gray-700 rounded"
                type="number"
                placeholder="Kvᵢ"
                step="0.01"
                value={load.Kv}
                onChange={e => handleChange(load.id, 'Kv', e.target.value)}
              /> 

              <input
                className="p-2 bg-gray-800 text-white border border-gray-700 rounded"
                type="number"
                placeholder="tgφ"
                step="0.01"
                value={load.tg}
                onChange={e => handleChange(load.id, 'tg', e.target.value)}
              /> 

              <button
                className="p-2 bg-red-600 rounded hover:bg-red-500"
                onClick={() => removeLoad(load.id)}
              >–</button> 
            </div>
          ))}

          <button
            onClick={addLoad}
            className="w-full py-2 bg-green-600 rounded hover:bg-green-500"
          >Додати елемент</button>
        </div>

        <div className="flex items-center space-x-4">
          <label>Постійна часу T₀:</label>
          <select
            className="p-2 bg-gray-800 text-white border border-gray-700 rounded"
            value={timeConstant}
            onChange={e => setTimeConstant(parseInt(e.target.value))}
          >
            <option value={10}>10 хв (II рівень)</option>
            <option value={150}>150 хв (III рівень)</option>
          </select>
        </div>

        <button
          onClick={calculate}
          className="w-full py-3 bg-blue-600 rounded text-lg font-semibold hover:bg-blue-500"
        >Розрахувати</button>
        {results && (
          <div className="p-4 bg-gray-800 border border-gray-700 rounded space-y-2">
            <p>ΣPₙ: <strong>{results.sumPn.toFixed(2)} кВт</strong></p>
            <p>ΣPₙ·Kvᵢ: <strong>{results.sumActive.toFixed(2)} кВт</strong></p>
            <p>Кᵥ: <strong>{results.groupKv.toFixed(4)}</strong></p>
            <p>nₑ: <strong>{results.ne.toFixed(2)}</strong></p>
            <p>Kₚ: <strong>{results.Kp}</strong></p>
            <p>Pₚ: <strong>{results.Pp.toFixed(2)} кВт</strong></p>
            <p>Qₚ: <strong>{results.Qp.toFixed(3)} квар</strong></p>
            <p>Sₚ: <strong>{results.Sp.toFixed(4)} кВА</strong></p>
            <p>Iₚ: <strong>{results.Ip.toFixed(2)} А</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}
