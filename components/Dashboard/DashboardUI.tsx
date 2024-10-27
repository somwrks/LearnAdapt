'use client';

import React from 'react';
import ClientChart from '@/components/Dashboard/ClientChart';

import {
  Users,
  Package,
  DollarSign,
  Clock,
  LayoutDashboard,
  Box,
  Heart,
  Inbox,
  ListOrdered,
  Calendar,
  CheckSquare,
  Contact,
  FileText,
  Layers,
  Users2,
  Table
} from 'lucide-react';

// Types for our statistics and chart data
interface Statdiv {
  title: string;
  value: string | number;
  change: {
    value: number;
    timeframe: string;
    trend: 'up' | 'down';
  };
  icon: React.ReactNode;
  color: string;
}

interface NavItem {
  name: string;
  icon: React.ReactNode;
}

interface SalesDataPoint {
  name: string;
  value: number;
}

const DashboardUI = () => {
  // Navigation items with icons
  const navItems: NavItem[] = [
    { name: 'Chat with Learny', icon: <Users2 size={20} /> },
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Academics', icon: <Box size={20} /> },
    { name: 'Schedule Maker', icon: <Heart size={20} /> },
    { name: 'To-Do', icon: <CheckSquare size={20} /> },
    { name: 'Games', icon: <Contact size={20} /> },
    { name: 'Hobbies', icon: <FileText size={20} /> },
  ];

  // Sample sales data for the chart
  const salesData: SalesDataPoint[] = Array.from({ length: 60 }, (_, i) => ({
    name: `${i * 5}k`,
    value: Math.random() * 60 + 20,
  }));

  // Stats divs data
  const stats: Statdiv[] = [
    {
      title: 'Total User',
      value: '40,689',
      change: { value: 8.5, timeframe: 'yesterday', trend: 'up' },
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-100'
    },
    {
      title: 'Total Order',
      value: '10293',
      change: { value: 1.3, timeframe: 'past week', trend: 'up' },
      icon: <Package className="h-6 w-6" />,
      color: 'bg-yellow-100'
    },
    {
      title: 'Total Sales',
      value: '$89,000',
      change: { value: 4.3, timeframe: 'yesterday', trend: 'down' },
      icon: <DollarSign className="h-6 w-6" />,
      color: 'bg-green-100'
    },
    {
      title: 'Total Pending',
      value: '2040',
      change: { value: 1.8, timeframe: 'yesterday', trend: 'up' },
      icon: <Clock className="h-6 w-6" />,
      color: 'bg-red-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold text-blue-600">LearnAdapt</h1>
        </div>
        <nav className="mt-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center px-6 py-3 text-black hover:bg-blue-50 hover:text-blue-600 ${
                item.name === 'Dashboard' ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl text-black font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <input
              type="search"
              placeholder="Search"
              className="rounded-lg border px-4 py-2"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.title}>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-black">{stat.title}</p>
                    <p className="mt-1 text-2xl text-black font-semibold">{stat.value}</p>
                  </div>
                  <div className={`rounded-full p-3 ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span
                    className={`flex items-center text-sm ${
                      stat.change.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {stat.change.trend === 'up' ? '↑' : '↓'} {stat.change.value}%
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    from {stat.change.timeframe}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sales Chart */}
        <div className="mt-8">
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Sales Details</h2>
              <select className="rounded-md border px-3 py-1">
                <option>October</option>
              </select>
            </div>
            <div className="h-80">
              <ClientChart data={salesData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUI; 