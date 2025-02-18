"use client";

import { useState, useEffect } from "react";

export default function Monitoring() {
  const initialRooms = [
    { id: 101, energyUsage: 120 },
    { id: 102, energyUsage: 110 },
    { id: 103, energyUsage: 130 },
    { id: 104, energyUsage: 125 },
  ];

  const [rooms, setRooms] = useState(initialRooms);
  const [systemStatus, setSystemStatus] = useState("Operational");

  useEffect(() => {
    const interval = setInterval(() => {
      setRooms((prevRooms) =>
        prevRooms.map((room) => ({
          ...room,
          energyUsage: room.energyUsage + Math.floor(Math.random() * 5) - 2, // Simulating small fluctuations
        }))
      );

      const totalEnergy = rooms.reduce((acc, room) => acc + room.energyUsage, 0);
      setSystemStatus(totalEnergy > 600 ? "⚠️ High Consumption" : "✅ Operational");
    }, 5000);

    return () => clearInterval(interval);
  }, [rooms]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-primary">System Monitoring</h2>
      <div className="space-y-3 text-earth">
        {rooms.map((room) => (
          <div key={room.id} className="flex items-center justify-between border-b pb-2">
            <p className="text-lg">📍 Room {room.id}</p>
            <p className="text-gray-700">{room.energyUsage} kWh</p>
          </div>
        ))}
        <div className="flex items-center space-x-2 mt-4">
          <span className="text-lg">{systemStatus.includes("⚠️") ? "⚠️" : "✅"}</span>
          <p className="font-semibold">{systemStatus}</p>
        </div>
      </div>
    </div>
  );
}
