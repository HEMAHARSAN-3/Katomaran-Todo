import { useState } from 'react';
import { Plus, Search, Filter, Calendar, CheckCircle2, Clock, AlertCircle, User, TrendingUp, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TaskCard from '@/components/tasks/TaskCard';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';

// Mock data
const mockTasks = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Write and review the Q4 project proposal for the new client',
    priority: 'high' as const,
    status: 'todo' as const,
    dueDate: new Date(),
    tags: ['Work', 'Important'],
    assignee: 'John Doe'
  },
  {
    id: '2',
    title: 'Review team feedback',
    description: 'Go through the feedback from the design team and implement changes',
    priority: 'medium' as const,
    status: 'in-progress' as const,
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    tags: ['Design', 'Review'],
    assignee: 'Jane Smith'
  },
  {
    id: '3',
    title: 'Plan weekend activities',
    description: 'Research and plan fun activities for the upcoming weekend',
    priority: 'low' as const,
    status: 'todo' as const,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    tags: ['Personal'],
    assignee: 'John Doe'
  },
  {
    id: '4',
    title: 'Update documentation',
    description: 'Update the API documentation with recent changes',
    priority: 'medium' as const,
    status: 'completed' as const,
    dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    tags: ['Documentation', 'API'],
    assignee: 'Mike Johnson'
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(mockTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length
  };

  const completionRate = Math.round((taskStats.completed / taskStats.total) * 100);

  const handleCreateTask = (taskData: any) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      status: 'todo' as const,
      assignee: user?.name || 'Unknown'
    };
    setTasks([newTask, ...tasks]);
    setIsCreateModalOpen(false);
  };

  const handleUpdateTask = (taskId: string, updates: any) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8 animate-fade-in">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
              Welcome back, 
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ml-2">
                {user?.name}!
              </span>
            </h1>
            <p className="text-slate-400 text-lg">
              You have {taskStats.inProgress} tasks in progress and {taskStats.overdue} overdue tasks
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">{completionRate}% completion rate this week</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400">+12% from last week</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-2xl font-semibold shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Task
          </Button>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl p-6 group hover:scale-105 hover:border-blue-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm font-medium">Total Tasks</p>
                <p className="text-3xl font-bold text-white">{taskStats.total}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-blue-400 text-sm font-medium">85%</span>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl p-6 group hover:scale-105 hover:border-green-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-white">{taskStats.completed}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{ width: `${completionRate}%` }}></div>
              </div>
              <span className="text-green-400 text-sm font-medium">{completionRate}%</span>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-3xl p-6 group hover:scale-105 hover:border-yellow-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-white">{taskStats.inProgress}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
              <span className="text-yellow-400 text-sm font-medium">Active</span>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-3xl p-6 group hover:scale-105 hover:border-red-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm font-medium">Overdue</p>
                <p className="text-3xl font-bold text-white">{taskStats.overdue}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {taskStats.overdue > 0 ? (
                <>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-400 to-pink-500 h-2 rounded-full animate-pulse" style={{ width: '30%' }}></div>
                  </div>
                  <span className="text-red-400 text-sm font-medium">Action needed</span>
                </>
              ) : (
                <span className="text-green-400 text-sm font-medium">✨ All caught up!</span>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
              <Input
                placeholder="Search tasks, tags, or assignees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              {[
                { key: 'all', label: 'All Tasks', count: taskStats.total },
                { key: 'todo', label: 'To Do', count: tasks.filter(t => t.status === 'todo').length },
                { key: 'in-progress', label: 'In Progress', count: taskStats.inProgress },
                { key: 'completed', label: 'Completed', count: taskStats.completed }
              ].map(({ key, label, count }) => (
                <Button
                  key={key}
                  variant={filterStatus === key ? 'default' : 'outline'}
                  onClick={() => setFilterStatus(key)}
                  className={`h-12 px-6 rounded-2xl font-medium transition-all duration-300 ${
                    filterStatus === key 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                      : 'bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/30 hover:border-white/50 text-white hover:scale-105'
                  }`}
                >
                  {label}
                  <Badge className="ml-2 bg-white/20 text-white border-0 text-xs">
                    {count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Tasks Grid */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className="animate-fade-in transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TaskCard
                  task={task}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 max-w-md mx-auto">
              <CheckCircle2 className="w-20 h-20 text-slate-400 mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold text-white mb-4">No tasks found</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search terms or filters to find what you\'re looking for.' 
                  : 'You\'re all caught up! Create your first task to get started on your productivity journey.'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Task
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
