"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SensorData() {
  const rooms = [
    { id: 1, name: "Lecture Room 101", temperature: 24.5, humidity: 60, motion: "Detected" },
    { id: 2, name: "Lecture Room 102", temperature: 22.0, humidity: 55, motion: "Not Detected" },
    { id: 3, name: "Lecture Room 103", temperature: 23.8, humidity: 58, motion: "Detected" },
  ];

  const [openRoom, setOpenRoom] = useState<number | null>(null);

  const toggleRoom = (id: number) => {
    setOpenRoom(openRoom === id ? null : id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-primary">Sensor Data by Room</h2>
      <div className="space-y-4">
        {rooms.map((room) => (
          <div key={room.id} className="border-b pb-4 last:border-b-0">
            <button
              className="flex items-center justify-between w-full text-lg font-semibold text-earth"
              onClick={() => toggleRoom(room.id)}
            >
              {room.name}
              {openRoom === room.id ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openRoom === room.id && (
              <div className="mt-2 space-y-2 text-earth">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🌡️</span>
                  <p>Temperature: {room.temperature}°C</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">💧</span>
                  <p>Humidity: {room.humidity}%</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🚶</span>
                  <p>Motion: {room.motion}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
