import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday, isWeekend } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';

// Mock tasks data (same as dashboard)
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
    title: 'Client presentation',
    description: 'Present the new design concepts to the client',
    priority: 'high' as const,
    status: 'todo' as const,
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    tags: ['Work', 'Presentation'],
    assignee: 'Jane Smith'
  }
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState(mockTasks);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => isSameDay(new Date(task.dueDate), date));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return { bg: 'bg-red-500', border: 'border-red-500', text: 'text-red-300' };
      case 'medium': return { bg: 'bg-yellow-500', border: 'border-yellow-500', text: 'text-yellow-300' };
      case 'low': return { bg: 'bg-green-500', border: 'border-green-500', text: 'text-green-300' };
      default: return { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-blue-300' };
    }
  };

  const handleCreateTask = (taskData: any) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      status: 'todo' as const,
      assignee: 'John Doe'
    };
    setTasks([newTask, ...tasks]);
    setIsCreateModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8 animate-fade-in">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Calendar
              </span>
            </h1>
            <p className="text-slate-400 text-lg">
              Visualize your tasks and deadlines in a beautiful timeline
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400">{tasks.length} total tasks</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-green-400">{getTasksForDate(new Date()).length} due today</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1">
              <Button
                onClick={() => setViewMode('month')}
                className={`px-6 py-2 rounded-xl transition-all duration-300 ${
                  viewMode === 'month'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                Month
              </Button>
              <Button
                onClick={() => setViewMode('week')}
                className={`px-6 py-2 rounded-xl transition-all duration-300 ${
                  viewMode === 'week'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                Week
              </Button>
            </div>
            
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-2xl font-semibold shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Task
            </Button>
          </div>
        </div>

        {/* Enhanced Calendar Container */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={previousMonth}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 text-white p-3 rounded-2xl hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <p className="text-slate-400">
                {daysInMonth.length} days • {tasks.length} tasks scheduled
              </p>
            </div>
            
            <Button
              onClick={nextMonth}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 text-white p-3 rounded-2xl hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
              <div key={day} className="text-center py-4">
                <div className={`font-bold text-lg ${
                  index === 0 || index === 6 ? 'text-blue-400' : 'text-white'
                }`}>
                  {day.slice(0, 3)}
                </div>
                <div className="text-slate-400 text-sm">{day.slice(3)}</div>
              </div>
            ))}
          </div>

          {/* Enhanced Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day, dayIdx) => {
              const dayTasks = getTasksForDate(day);
              const isCurrentDay = isToday(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isWeekendDay = isWeekend(day);

              return (
                <div
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    min-h-[140px] p-3 rounded-2xl border cursor-pointer transition-all duration-300 group
                    ${isCurrentDay 
                      ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-blue-400/50 shadow-2xl shadow-blue-500/25 scale-105' 
                      : isSelected
                        ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/50 shadow-xl shadow-purple-500/20 scale-105'
                        : isWeekendDay
                          ? 'bg-white/5 border-white/10 hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-blue-500/10 hover:border-cyan-400/30 hover:scale-105'
                          : 'bg-white/5 border-white/10 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 hover:border-white/20 hover:scale-105'
                    }
                    ${!isSameMonth(day, currentDate) ? 'opacity-30' : ''}
                  `}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-lg font-bold ${
                      isCurrentDay 
                        ? 'text-blue-300' 
                        : isWeekendDay 
                          ? 'text-cyan-300' 
                          : 'text-white'
                    }`}>
                      {format(day, 'd')}
                    </span>
                    {dayTasks.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${
                          dayTasks.some(t => t.priority === 'high') ? 'bg-red-400' :
                          dayTasks.some(t => t.priority === 'medium') ? 'bg-yellow-400' : 'bg-green-400'
                        } animate-pulse`}></div>
                        <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-1 rounded-full font-medium">
                          {dayTasks.length}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    {dayTasks.slice(0, 2).map((task) => {
                      const colors = getPriorityColor(task.priority);
                      return (
                        <div
                          key={task.id}
                          className={`text-xs p-2 rounded-xl ${colors.bg}/20 border ${colors.border}/30 backdrop-blur-sm group-hover:scale-105 transition-transform duration-200`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 ${colors.bg} rounded-full flex-shrink-0`}></div>
                            <span className="text-white font-medium truncate">{task.title}</span>
                          </div>
                          <div className="flex items-center mt-1 space-x-2 text-slate-300">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">{format(task.dueDate, 'HH:mm')}</span>
                          </div>
                        </div>
                      );
                    })}
                    {dayTasks.length > 2 && (
                      <div className="text-xs text-center py-2 text-slate-400 bg-white/5 rounded-xl backdrop-blur-sm">
                        +{dayTasks.length - 2} more tasks
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Task Details for Selected Date */}
        {selectedDate && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 animate-scale-in hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Tasks for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400">{getTasksForDate(selectedDate).length} tasks</span>
                  </div>
                  {isToday(selectedDate) && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400">Today</span>
                    </div>
                  )}
                  {isWeekend(selectedDate) && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-cyan-400">Weekend</span>
                    </div>
                  )}
                </div>
              </div>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
            
            {getTasksForDate(selectedDate).length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {getTasksForDate(selectedDate).map((task, index) => {
                  const colors = getPriorityColor(task.priority);
                  return (
                    <div
                      key={task.id}
                      className={`p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border ${colors.border}/30 hover:from-white/10 hover:to-white/15 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-3 h-3 ${colors.bg} rounded-full animate-pulse`}></div>
                            <h4 className="font-bold text-white text-lg">{task.title}</h4>
                          </div>
                          <p className="text-slate-300 leading-relaxed mb-4">{task.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`text-xs px-3 py-1 rounded-full ${colors.bg}/20 ${colors.text} font-medium`}>
                            {task.priority} priority
                          </div>
                          <div className="flex items-center space-x-1 text-slate-400">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{task.assignee}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-slate-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{format(task.dueDate, 'HH:mm')}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {task.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <CalendarIcon className="w-16 h-16 text-slate-400 mx-auto mb-4 animate-pulse" />
                <h4 className="text-xl font-semibold text-white mb-2">No tasks scheduled</h4>
                <p className="text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">
                  This day is free! Perfect time to focus on other priorities or take a well-deserved break.
                </p>
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Task
                </Button>
              </div>
            )}
          </div>
        )}

        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateTask}
        />
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
