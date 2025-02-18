"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SystemControl() {
  const rooms = [
    { id: 1, name: "Lecture Room 101" },
    { id: 2, name: "Lecture Room 102" },
    { id: 3, name: "Lecture Room 103" },
  ];

  const initialRoomState = () => {
    const storedState = localStorage.getItem("roomControls");
    return storedState
      ? JSON.parse(storedState)
      : rooms.reduce(
          (acc, room) => ({
            ...acc,
            [room.id]: { isOccupied: false, acPower: 0, airQuality: 50, isOpen: false },
          }),
          {}
        );
  };

  const [roomControls, setRoomControls] = useState(initialRoomState);

  useEffect(() => {
    localStorage.setItem("roomControls", JSON.stringify(roomControls));
  }, [roomControls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoomControls((prev) => {
        const updatedRooms = { ...prev };
        Object.keys(updatedRooms).forEach((id) => {
          updatedRooms[id].airQuality = Math.max(20, Math.min(100, updatedRooms[id].airQuality + (Math.random() * 10 - 5)));
          adjustAcPower(parseInt(id));
        });
        return updatedRooms;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleOccupancy = (id: number) => {
    setRoomControls((prev) => {
      const newOccupied = !prev[id].isOccupied;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOccupied: newOccupied,
          acPower: newOccupied ? 100 : 0,
        },
      };
    });
  };

  const adjustAcPower = (id: number) => {
    setRoomControls((prev) => {
      const airQuality = prev[id].airQuality;
      let newAcPower;
      if (airQuality < 50) {
        newAcPower = 100;
      } else if (airQuality >= 50 && airQuality < 75) {
        newAcPower = 50;
      } else {
        newAcPower = 25;
      }
      return {
        ...prev,
        [id]: { ...prev[id], acPower: newAcPower },
      };
    });
  };

  const toggleDropdown = (id: number) => {
    setRoomControls((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: !prev[id].isOpen },
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-primary">System Control by Room</h2>
      <div className="space-y-4">
        {rooms.map((room) => (
          <div key={room.id} className="border-b pb-4 last:border-b-0">
            <button
              className="flex items-center justify-between w-full text-lg font-semibold text-earth"
              onClick={() => toggleDropdown(room.id)}
            >
              {room.name}
              {roomControls[room.id].isOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            {roomControls[room.id].isOpen && (
              <div className="mt-2 space-y-2 text-earth">
                <div className="flex items-center space-x-4">
                  <p>Room Status: {roomControls[room.id].isOccupied ? "Occupied" : "Not Occupied"}</p>
                  <button
                    onClick={() => toggleOccupancy(room.id)}
                    className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    {roomControls[room.id].isOccupied ? "Mark as Not Occupied" : "Mark as Occupied"}
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <p>Air Quality: {roomControls[room.id].airQuality.toFixed(1)}</p>
                  <button
                    onClick={() => adjustAcPower(room.id)}
                    className="bg-accent text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Adjust AC Power
                  </button>
                </div>
                <div>
                  <p>AC Power: {roomControls[room.id].acPower}%</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
