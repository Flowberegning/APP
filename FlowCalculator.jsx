import { useState } from "react";

export default function FlowCalculator() {
  const [diameter, setDiameter] = useState(300);
  const [slope, setSlope] = useState(50);
  const [height, setHeight] = useState(12);
  const [flow, setFlow] = useState(null);

  const calculateFlow = () => {
    const D = diameter / 1000;
    const h = height / 100;
    const i = slope / 1000;
    const n = 0.013;

    if (h <= 0 || h > D) {
      setFlow("Ugyldig højde");
      return;
    }

    const theta = 2 * Math.acos(1 - (2 * h) / D);
    const A = (D ** 2 / 8) * (theta - Math.sin(theta));
    const P = (D * theta) / 2;
    const R = A / P;
    const Q = (1 / n) * A * R ** (2 / 3) * Math.sqrt(i);

    setFlow((Q * 1000).toFixed(2));
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "auto", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>Flowberegner</h1>
      <div>
        <label>Rørdiameter (mm)</label>
        <input type="number" value={diameter} onChange={(e) => setDiameter(Number(e.target.value))} />
      </div>
      <div>
        <label>Fald (‰)</label>
        <input type="number" value={slope} onChange={(e) => setSlope(Number(e.target.value))} />
      </div>
      <div>
        <label>Flowhøjde (cm)</label>
        <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
      </div>
      <button onClick={calculateFlow}>Beregn flow</button>
      {flow !== null && <p>Flow: {flow} l/s</p>}
    </div>
  );
}
