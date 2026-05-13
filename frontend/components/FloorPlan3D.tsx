'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Room {
  id: string;
  label: string;
  sqFt: number;
  sqM: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

// Example floor plan rooms — relative SVG units on a 600×440 canvas
const GROUND_FLOOR: Room[] = [
  { id: 'entrance', label: 'Entrance Hall', sqFt: 215, sqM: 20, x: 245, y: 180, width: 110, height: 80, color: '#F0EBE3' },
  { id: 'living', label: 'Living Room', sqFt: 540, sqM: 50, x: 30, y: 30, width: 210, height: 180, color: '#EDE5D8' },
  { id: 'dining', label: 'Dining Room', sqFt: 380, sqM: 35, x: 30, y: 215, width: 210, height: 145, color: '#E8DFD0' },
  { id: 'kitchen', label: 'Kitchen & Breakfast', sqFt: 430, sqM: 40, x: 245, y: 30, width: 180, height: 145, color: '#EBE3D5' },
  { id: 'study', label: 'Study', sqFt: 215, sqM: 20, x: 430, y: 30, width: 140, height: 145, color: '#EAE0D0' },
  { id: 'utility', label: 'Utility Room', sqFt: 130, sqM: 12, x: 430, y: 180, width: 140, height: 80, color: '#E5DDD1' },
  { id: 'wc', label: 'WC', sqFt: 65, sqM: 6, x: 430, y: 265, width: 65, height: 95, color: '#DDDACF' },
  { id: 'boot', label: 'Boot Room', sqFt: 130, sqM: 12, x: 500, y: 265, width: 70, height: 95, color: '#E0D9CE' },
  { id: 'garage', label: 'Double Garage', sqFt: 540, sqM: 50, x: 245, y: 265, width: 180, height: 95, color: '#D8D2C7' },
];

const FIRST_FLOOR: Room[] = [
  { id: 'landing', label: 'Landing', sqFt: 215, sqM: 20, x: 245, y: 180, width: 110, height: 80, color: '#F0EBE3' },
  { id: 'master', label: 'Master Bedroom', sqFt: 540, sqM: 50, x: 30, y: 30, width: 210, height: 180, color: '#EDE5D8' },
  { id: 'ensuite', label: 'En Suite', sqFt: 130, sqM: 12, x: 30, y: 215, width: 100, height: 80, color: '#E8DFD0' },
  { id: 'dressing', label: 'Dressing Room', sqFt: 130, sqM: 12, x: 135, y: 215, width: 105, height: 80, color: '#EBE3D5' },
  { id: 'bed2', label: 'Bedroom 2', sqFt: 380, sqM: 35, x: 245, y: 30, width: 180, height: 145, color: '#EAE0D0' },
  { id: 'bath1', label: 'Family Bathroom', sqFt: 215, sqM: 20, x: 430, y: 30, width: 140, height: 145, color: '#E5DDD1' },
  { id: 'bed3', label: 'Bedroom 3', sqFt: 300, sqM: 28, x: 430, y: 180, width: 140, height: 80, color: '#DDDACF' },
  { id: 'bed4', label: 'Bedroom 4', sqFt: 270, sqM: 25, x: 245, y: 265, width: 180, height: 95, color: '#E0D9CE' },
  { id: 'bath2', label: 'Shower Room', sqFt: 130, sqM: 12, x: 430, y: 265, width: 140, height: 95, color: '#D8D2C7' },
];

const FLOORS = [
  { id: 'ground', label: 'Ground Floor', rooms: GROUND_FLOOR, totalSqFt: 2147, totalSqM: 200 },
  { id: 'first', label: 'First Floor', rooms: FIRST_FLOOR, totalSqFt: 2313, totalSqM: 215 },
];

interface TooltipState {
  room: Room;
  x: number;
  y: number;
}

export default function FloorPlan3D() {
  const [activeFloor, setActiveFloor] = useState(0);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const floor = FLOORS[activeFloor];

  const handleRoomMouseEnter = (room: Room, e: React.MouseEvent<SVGRectElement>) => {
    setHoveredRoom(room.id);
    setTooltip({ room, x: e.clientX, y: e.clientY });
  };

  const handleRoomMouseMove = (e: React.MouseEvent<SVGRectElement>) => {
    if (tooltip) {
      setTooltip(t => t ? { ...t, x: e.clientX, y: e.clientY } : null);
    }
  };

  const handleRoomMouseLeave = () => {
    setHoveredRoom(null);
    setTooltip(null);
  };

  const selectedRoomData = floor.rooms.find(r => r.id === selectedRoom);

  return (
    <div className="lux-card overflow-hidden">
      {/* Header */}
      <div className="bg-[#1C1A17] px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#C9A96A] mb-0.5">Interactive Floor Plan</p>
          <p className="text-white font-light text-sm">Hover or click any room for details</p>
        </div>
        {/* Floor selector */}
        <div className="flex gap-2">
          {FLOORS.map((f, i) => (
            <button
              key={f.id}
              onClick={() => { setActiveFloor(i); setSelectedRoom(null); setHoveredRoom(null); }}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                activeFloor === i
                  ? 'bg-[#C9A96A] text-[#1C1A17] border-[#C9A96A]'
                  : 'text-[#9A8B7A] border-white/20 hover:border-[#C9A96A]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Floor Plan */}
      <div className="relative bg-[#F6F2EC] p-4">
        <svg
          viewBox="0 0 600 380"
          className="w-full max-h-[400px]"
          style={{ fontFamily: 'inherit' }}
        >
          {/* Floor plate background */}
          <rect x="20" y="20" width="560" height="340" fill="#EBE4D8" rx="4" />

          {/* Walls / outer border */}
          <rect x="20" y="20" width="560" height="340" fill="none" stroke="#1C1A17" strokeWidth="2.5" rx="4" />

          {floor.rooms.map(room => {
            const isHovered = hoveredRoom === room.id;
            const isSelected = selectedRoom === room.id;
            return (
              <g key={room.id}>
                {/* Room fill */}
                <rect
                  x={room.x}
                  y={room.y}
                  width={room.width}
                  height={room.height}
                  fill={isSelected ? '#C9A96A' : isHovered ? '#D4B880' : room.color ?? '#EDE5D8'}
                  stroke={isSelected ? '#B08850' : '#9A8B7A'}
                  strokeWidth={isSelected ? 2 : 1}
                  rx="2"
                  className="cursor-pointer transition-colors duration-150"
                  onMouseEnter={e => handleRoomMouseEnter(room, e)}
                  onMouseMove={handleRoomMouseMove}
                  onMouseLeave={handleRoomMouseLeave}
                  onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                />
                {/* Room label */}
                <text
                  x={room.x + room.width / 2}
                  y={room.y + room.height / 2 - 5}
                  textAnchor="middle"
                  fontSize={room.width > 100 ? 8 : 7}
                  fontWeight={isSelected ? '600' : '400'}
                  fill={isSelected ? '#1C1A17' : '#3B342D'}
                  className="pointer-events-none select-none"
                >
                  {room.label}
                </text>
                <text
                  x={room.x + room.width / 2}
                  y={room.y + room.height / 2 + 8}
                  textAnchor="middle"
                  fontSize={7}
                  fill={isSelected ? '#1C1A17' : '#7A6E60'}
                  className="pointer-events-none select-none"
                >
                  {room.sqM} m²
                </text>
              </g>
            );
          })}

          {/* North arrow */}
          <g transform="translate(556, 340)">
            <circle cx="0" cy="0" r="10" fill="#1C1A17" />
            <text x="0" y="4" textAnchor="middle" fontSize="9" fill="#C9A96A" fontWeight="700">N</text>
          </g>

          {/* Scale bar */}
          <line x1="20" y1="368" x2="80" y2="368" stroke="#9A8B7A" strokeWidth="1.5" />
          <line x1="20" y1="364" x2="20" y2="372" stroke="#9A8B7A" strokeWidth="1.5" />
          <line x1="80" y1="364" x2="80" y2="372" stroke="#9A8B7A" strokeWidth="1.5" />
          <text x="50" y="377" textAnchor="middle" fontSize="7" fill="#9A8B7A">5 m</text>
        </svg>

        {/* Room detail panel */}
        {selectedRoomData && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-6 bg-[#1C1A17] text-white rounded-xl px-5 py-4 shadow-xl min-w-[180px]"
          >
            <p className="text-[10px] uppercase tracking-widest text-[#C9A96A] mb-1">Selected Room</p>
            <p className="text-base font-semibold">{selectedRoomData.label}</p>
            <div className="mt-2 space-y-0.5 text-xs text-[#9A8B7A]">
              <p>{selectedRoomData.sqM} m² ({selectedRoomData.sqFt} sq ft)</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Room list */}
      <div className="px-6 pb-6">
        <p className="text-xs uppercase tracking-widest text-[#9A8B7A] mb-3">
          {floor.label} · {floor.totalSqM} m² / {floor.totalSqFt} sq ft total
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {floor.rooms.map(room => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
              className={`text-left px-3 py-2 rounded-lg border text-xs transition-colors ${
                selectedRoom === room.id
                  ? 'bg-[#C9A96A]/10 border-[#C9A96A] text-[#1C1A17]'
                  : 'border-[#E8E1D7] text-[#7A6E60] hover:border-[#C9A96A]'
              }`}
            >
              <span className="block font-medium truncate">{room.label}</span>
              <span className="text-[#9A8B7A]">{room.sqM} m²</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hover tooltip rendered at mouse position */}
      {tooltip && (
        <div
          className="fixed z-[999] pointer-events-none bg-[#1C1A17] text-white text-xs rounded-lg px-3 py-2 shadow-xl"
          style={{ top: tooltip.y - 60, left: tooltip.x + 12 }}
        >
          <p className="font-semibold">{tooltip.room.label}</p>
          <p className="text-[#C9A96A]">{tooltip.room.sqM} m² · {tooltip.room.sqFt} sq ft</p>
        </div>
      )}
    </div>
  );
}
