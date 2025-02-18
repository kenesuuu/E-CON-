"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data for projections and predictions
const data = [
  { month: "Jan", energyUsage: 120, prediction: 125 },
  { month: "Feb", energyUsage: 130, prediction: 128 },
  { month: "Mar", energyUsage: 125, prediction: 130 },
  { month: "Apr", energyUsage: 140, prediction: 135 },
  { month: "May", energyUsage: 150, prediction: 145 },
  { month: "Jun", energyUsage: 160, prediction: 155 },
];

export default function Analytics() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-primary">Energy Usage Analytics</h2>
      <div className="space-y-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="energyUsage" stroke="#4CAF50" name="Energy Usage (kWh)" />
              <Line type="monotone" dataKey="prediction" stroke="#2196F3" name="Prediction (kWh)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="text-earth">
          <p>
            <strong>Projection:</strong> Energy usage is expected to increase gradually over the next few months due to seasonal changes.
          </p>
          <p>
            <strong>Prediction:</strong> By June, energy usage is predicted to reach 155 kWh, which is a 25% increase from January.
          </p>
        </div>
      </div>
    </div>
  );
}