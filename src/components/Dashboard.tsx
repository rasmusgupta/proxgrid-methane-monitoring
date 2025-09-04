'use client';

import { useAuth } from '@/lib/auth';
import { 
  SignalIcon, 
  ExclamationTriangleIcon, 
  BuildingOfficeIcon, 
  ChartBarSquareIcon,
  ArrowTrendingUpIcon,
  MapIcon,
  WifiIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="h-full p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back, {user?.name}. Here&apos;s your emissions monitoring overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Sensors</p>
              <p className="text-white text-2xl font-bold">127</p>
            </div>
            <SignalIcon className="w-6 h-6 text-green-500" aria-hidden="true" />
          </div>
          <div className="mt-2">
            <span className="text-green-500 text-sm">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Emissions Detected</p>
              <p className="text-white text-2xl font-bold">2.3k</p>
            </div>
            <ExclamationTriangleIcon className="w-6 h-6 text-orange-500" aria-hidden="true" />
          </div>
          <div className="mt-2">
            <span className="text-red-500 text-sm">+5% from last week</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Sites Monitored</p>
              <p className="text-white text-2xl font-bold">89</p>
            </div>
            <BuildingOfficeIcon className="w-6 h-6 text-blue-500" aria-hidden="true" />
          </div>
          <div className="mt-2">
            <span className="text-green-500 text-sm">+3 new sites</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Reports Generated</p>
              <p className="text-white text-2xl font-bold">456</p>
            </div>
            <ChartBarSquareIcon className="w-6 h-6 text-purple-500" aria-hidden="true" />
          </div>
          <div className="mt-2">
            <span className="text-green-500 text-sm">+18% this month</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Industrial Emissions Over Time</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <ArrowTrendingUpIcon className="w-12 h-12 text-gray-400 mb-2" aria-hidden="true" />
              <p>Chart visualization would be here</p>
              <p className="text-sm">(Integration with charting library needed)</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Geographic Distribution</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MapIcon className="w-12 h-12 text-gray-400 mb-2" aria-hidden="true" />
              <p>Map visualization would be here</p>
              <p className="text-sm">(Integration with mapping library needed)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { type: 'alert', message: 'High emission levels detected at Site 23', time: '2 minutes ago', status: 'critical' },
            { type: 'report', message: 'Weekly emissions report generated for North Field', time: '1 hour ago', status: 'completed' },
            { type: 'sensor', message: 'New sensor installed at Site 45', time: '3 hours ago', status: 'info' },
            { type: 'system', message: 'System maintenance completed successfully', time: '1 day ago', status: 'success' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'critical' ? 'bg-red-500' :
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'
                }`}></div>
                <div>
                  <p className="text-white text-sm">{activity.message}</p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
              </div>
              <div className="text-gray-400">
                {activity.type === 'alert' ? <ExclamationTriangleIcon className="w-4 h-4" aria-hidden="true" /> : 
                 activity.type === 'report' ? <ChartBarSquareIcon className="w-4 h-4" aria-hidden="true" /> :
                 activity.type === 'sensor' ? <WifiIcon className="w-4 h-4" aria-hidden="true" /> : <WrenchScrewdriverIcon className="w-4 h-4" aria-hidden="true" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}