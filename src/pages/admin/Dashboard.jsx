import { useState, useEffect } from 'react';
import { BarChart3, Package, Tag, Users, TrendingUp, ShoppingBag } from 'lucide-react';
import api from '../../utils/api';
import { formatRupiahWithPrefix } from '../../utils/currency';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    lowStockProducts: 0,
    totalValue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.getDashboardStats();
      setStats(response.stats || {});
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      // change: '+12%'
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: Tag,
      color: 'bg-green-500',
      // change: '+5%'
    },
    // {
    //   title: 'Low Stock Alert',
    //   value: stats.lowStockProducts,
    //   icon: TrendingUp,
    //   color: 'bg-yellow-500',
    //   change: '-8%'
    // },
    // {
    //   title: 'Total Inventory Value',
    //   value: formatRupiahWithPrefix(stats.totalValue || 0),
    //   icon: ShoppingBag,
    //   color: 'bg-purple-500',
    //   change: '+15%'
    // }
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {/* <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p> */}
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        {/* <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Sales Overview</h2>
            <BarChart3 className="text-gray-400" size={20} />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart will be implemented here</p>
          </div>
        </div> */}

        {/* Top Products */}
        {/* <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                    {i}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Product {i}</p>
                    <p className="text-sm text-gray-600">Category {i}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{100 - i * 10} sold</p>
                  <p className="text-sm text-gray-600">{formatRupiahWithPrefix(500000 - i * 50000)}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Recent Activity */}
      {/* <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'New product added', item: 'SMOK Novo 4', time: '2 hours ago', type: 'success' },
            { action: 'Low stock alert', item: 'Vaporesso XROS', time: '4 hours ago', type: 'warning' },
            { action: 'Category updated', item: 'Pod Systems', time: '1 day ago', type: 'info' },
            { action: 'Product deleted', item: 'Old Mod Device', time: '2 days ago', type: 'error' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 border-l-4 border-gray-200 bg-gray-50 rounded-r-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'warning' ? 'bg-yellow-500' :
                activity.type === 'info' ? 'bg-blue-500' : 'bg-red-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-gray-900">{activity.action}: <span className="font-semibold">{activity.item}</span></p>
                <p className="text-sm text-gray-600">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;