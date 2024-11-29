"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface TabsProps {
  tabs: {
    id: string;
    label: string;
  }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const NeumorphicTabs = ({
  tabs,
  activeTab,
  onTabChange,
}: TabsProps) => {
  return (
    <div className="flex gap-2 p-4 bg-gray-100 rounded-xl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-6 py-3 rounded-lg font-medium transition-all duration-200",
            "hover:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(70,70,70,0.12)]",
            activeTab === tab.id
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.1),inset_2px_2px_5px_rgba(0,0,0,0.2)]"
              : "bg-gray-100 text-gray-700 shadow-[-2px_-2px_5px_rgba(255,255,255,1),2px_2px_5px_rgba(70,70,70,0.12)]"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default NeumorphicTabs;
