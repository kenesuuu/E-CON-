"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ControlPanel() {
  const rooms = [
    { id: 1, name: "Lecture Room 101" },
    { id: 2, name: "Lecture Room 102" },
    { id: 3, name: "Lecture Room 103" },
  ];

  // Load initial states from localStorage or set default values
  const [roomControls, setRoomControls] = useState(() => {
    return rooms.reduce((acc, room) => {
      acc[room.id] = {
        lightsOn: JSON.parse(localStorage.getItem(`room-${room.id}-light`) || "false"),
        acOn: JSON.parse(localStorage.getItem(`room-${room.id}-ac`) || "false"),
      };
      return acc;
    }, {} as Record<number, { lightsOn: boolean; acOn: boolean }>);
  });

  // Manage dropdown state
  const [openRoom, setOpenRoom] = useState<number | null>(null);

  // Update localStorage whenever states change
  useEffect(() => {
    rooms.forEach((room) => {
      localStorage.setItem(`room-${room.id}-light`, JSON.stringify(roomControls[room.id].lightsOn));
      localStorage.setItem(`room-${room.id}-ac`, JSON.stringify(roomControls[room.id].acOn));
    });
  }, [roomControls, rooms]);

  // Toggle light for a specific room
  const toggleLight = (id: number) => {
    setRoomControls((prev) => ({
      ...prev,
      [id]: { ...prev[id], lightsOn: !prev[id].lightsOn },
    }));
  };

  // Toggle AC for a specific room
  const toggleAC = (id: number) => {
    setRoomControls((prev) => ({
      ...prev,
      [id]: { ...prev[id], acOn: !prev[id].acOn },
    }));
  };

  // Toggle dropdown for a specific room
  const toggleRoom = (id: number) => {
    setOpenRoom(openRoom === id ? null : id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-primary">Control Panel</h2>
      <div className="space-y-4">
        {rooms.map((room) => (
          <div key={room.id} className="border-b pb-4 last:border-b-0">
            {/* Dropdown Button */}
            <button
              className="flex items-center justify-between w-full text-lg font-semibold text-earth"
              onClick={() => toggleRoom(room.id)}
            >
              {room.name}
              {openRoom === room.id ? <ChevronUp /> : <ChevronDown />}
            </button>

            {/* Room Controls (Only show if dropdown is open) */}
            {openRoom === room.id && (
              <div className="mt-2 space-y-2">
                <div className="flex space-x-2">
                  {/* Toggle Lighting */}
                  <button
                    onClick={() => toggleLight(room.id)}
                    className={`px-4 py-2 rounded-md transition duration-300 w-full sm:w-auto ${
                      roomControls[room.id].lightsOn ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                    } text-white`}
                  >
                    {roomControls[room.id].lightsOn ? "Turn Off Lights" : "Turn On Lights"}
                  </button>

                  {/* Toggle AC */}
                  <button
                    onClick={() => toggleAC(room.id)}
                    className={`px-4 py-2 rounded-md transition duration-300 w-full sm:w-auto ${
                      roomControls[room.id].acOn ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                  >
                    {roomControls[room.id].acOn ? "Turn Off AC" : "Turn On AC"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
