"use client";
import Header from "./components/Header";
import SensorData from "./components/SensorData";
import ControlPanel from "./components/ControlPanel";
import UserFeedback from "./components/UserFeedback";
import Monitoring from "./components/Monitoring";
import Analytics from "./components/Analytics";
import SystemControl from "./components/SystemControl";


export default function Home() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SensorData />
          <ControlPanel />
        </div>
        <SystemControl />
        <Analytics />
        <UserFeedback />
        <Monitoring />
      </div>
    </div>
  );
}