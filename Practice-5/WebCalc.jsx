import React, { useState } from 'react';

export default function ReliabilityLossCalculator() {
  const [elements, setElements] = useState([
    { w: 0.01, t: 30 },
    { w: 0.07, t: 10 },
    { w: 0.015, t: 100 },
    { w: 0.02, t: 15 },
    { w: 0.18, t: 2 },
  ]);
  const [kPl, setKPl] = useState(5.89e-3);
  const [omegaSek, setOmegaSek] = useState(0.02);
  const [relResults, setRelResults] = useState(null);

  const [lossParams, setLossParams] = useState({
    omegaEr: 0.01,
    tB: 0.045,
    kPl2: 4e-3,
    P: 5120,  
    Tx: 6451,
    Za: 23.6,
    Zpl: 17.6,
  });
  const [lossResults, setLossResults] = useState(null);

  const computeReliability = () => {
    const sumW = elements.reduce((s, e) => s + e.w, 0);
    const sumWt = elements.reduce((s, e) => s + e.w * e.t, 0);
    const omegaOc = sumW;
    const tBoc = sumW ? sumWt / sumW : 0;
    const kA = (omegaOc * tBoc) / 8760;
    const omegaDk = 2 * omegaOc * (kA + kPl);
    const tBdk = tBoc;
    const omegaDkWithSek = omegaDk + omegaSek;
    setRelResults({ omegaOc, tBoc, kA, kPl, omegaDk, tBdk, omegaDkWithSek });
  };

  const computeLosses = () => {
    const { omegaEr, tB, kPl2, P, Tx, Za, Zpl } = lossParams;
    const M_neav = omegaEr * tB * P * Tx;
    const M_nepl = kPl2 * P * Tx;
    const total = Za * M_neav + Zpl * M_nepl;
    setLossResults({ M_neav, M_nepl, total });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 space-y-12">
      <section>
        <h1 className="text-3xl mb-4">Калькулятор надійності (Приклад 3.1)</h1>
        <table className="w-full mb-4 table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ωᵢ (раз/рік)</th>
              <th className="px-4 py-2">tᵢ (год)</th>
            </tr>
          </thead>
          <tbody>
            {elements.map((e, i) => (
              <tr key={i} className="border-b border-gray-700">
                <td className="px-4 py-2">
                  <input
                    type="number"
                    step="any"
                    value={e.w}
                    onChange={ev => {
                      const arr = [...elements]; arr[i].w = parseFloat(ev.target.value) || 0; setElements(arr);
                    }}
                    className="w-full bg-gray-800 text-gray-100 p-2 rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    step="any"
                    value={e.t}
                    onChange={ev => {
                      const arr = [...elements]; arr[i].t = parseFloat(ev.target.value) || 0; setElements(arr);
                    }}
                    className="w-full bg-gray-800 text-gray-100 p-2 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => setElements([...elements, { w: 0, t: 0 }])}
          className="mb-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Додати елемент
        </button>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <label>
            kₚₗ одноколової:
            <input
              type="number"
              step="any"
              value={kPl}
              onChange={e => setKPl(parseFloat(e.target.value) || 0)}
              className="ml-2 bg-gray-800 text-gray-100 p-2 rounded w-32"
            />
          </label>
          <label>
            ωₛₑₖ (секційний):
            <input
              type="number"
              step="any"
              value={omegaSek}
              onChange={e => setOmegaSek(parseFloat(e.target.value) || 0)}
              className="ml-2 bg-gray-800 text-gray-100 p-2 rounded w-32"
            />
          </label>
        </div>
        <button
          onClick={computeReliability}
          className="px-6 py-3 bg-green-600 rounded hover:bg-green-500 text-lg"
        >
          Обчислити надійність
        </button>
        {relResults && (
          <ul className="list-disc list-inside mt-4 space-y-1">
            <li>ωₒ꜀ = {relResults.omegaOc.toFixed(4)} рік⁻¹</li>
            <li>t_b.ос = {relResults.tBoc.toFixed(2)} год</li>
            <li>kₐ.ос = {relResults.kA.toExponential(3)}</li>
            <li>kₚₗ.ос = {relResults.kPl.toExponential(2)}</li>
            <li>ω_двк = {relResults.omegaDk.toExponential(3)} рік⁻¹</li>
            <li>t_b.двк ≈ {relResults.tBdk.toFixed(2)} год</li>
            <li>ω_двк.з = {relResults.omegaDkWithSek.toFixed(4)} рік⁻¹</li>
          </ul>
        )}
      </section>
      <section>
        <h1 className="text-3xl mb-4">Калькулятор збитків (Приклад 3.2)</h1>
        <div className="space-y-2 mb-4 grid grid-cols-2 gap-4">
          {Object.entries(lossParams).map(([key, val]) => (
            <label key={key} className="block">
              {key === 'tB' ? 't_b (роки)' : key}:
              <input
                type="number"
                step="any"
                value={val}
                onChange={e => setLossParams({ ...lossParams, [key]: parseFloat(e.target.value) || 0 })}
                className="ml-2 bg-gray-800 text-gray-100 p-2 rounded w-32"
              />
            </label>
          ))}
        </div>
        <button
          onClick={computeLosses}
          className="px-6 py-3 bg-green-600 rounded hover:bg-green-500 text-lg"
        >
          Обчислити збитки
        </button>
        {lossResults && (
          <ul className="list-disc list-inside mt-4 space-y-1">
            <li>Mₙₑₐᵥ = {lossResults.M_neav.toFixed(2)} кВт·год</li>
            <li>Mₙₑₚₗ = {lossResults.M_nepl.toFixed(2)} кВт·год</li>
            <li>Загальні збитки = {lossResults.total.toFixed(2)} грн</li>
          </ul>
        )}
      </section>
    </div>
  );
}
