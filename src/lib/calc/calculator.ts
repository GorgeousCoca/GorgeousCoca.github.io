type CalculatorInput = {
  length: number;
  width: number;
  material: "quartz" | "acrylic";
  thickness: "12" | "20" | "30";
  sinkCutout: boolean;
  hobCutout: boolean;
};

const materialRates = {
  quartz: 22000,
  acrylic: 16500
};

const thicknessRate = {
  "12": 1,
  "20": 1.15,
  "30": 1.32
};

export function estimatePrice(input: CalculatorInput) {
  const area = (input.length / 1000) * (input.width / 1000);
  const base = area * materialRates[input.material] * thicknessRate[input.thickness];
  const extras = (input.sinkCutout ? 6500 : 0) + (input.hobCutout ? 4500 : 0);

  return Math.round(base + extras);
}
