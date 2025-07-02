
import { useState } from 'react';
import { MoreVertical, Calendar, User, Tag, CheckCircle2, Clock, AlertCircle, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  dueDate: Date;
  tags: string[];
  assignee: string;
}

interface TaskCardProps {
  task: Task;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    low: 'bg-green-500/20 text-green-300 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    high: 'bg-red-500/20 text-red-300 border-red-500/30'
  };

  const statusColors = {
    todo: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'in-progress': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    completed: 'bg-green-500/20 text-green-300 border-green-500/30'
  };

  const statusIcons = {
    todo: Clock,
    'in-progress': AlertCircle,
    completed: CheckCircle2
  };

  const StatusIcon = statusIcons[task.status];
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  const handleStatusChange = () => {
    const statusOrder = ['todo', 'in-progress', 'completed'] as const;
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    onUpdate(task.id, { status: nextStatus });
  };

  return (
    <div className={`glass-card hover-glow transition-all duration-300 cursor-pointer ${
      task.priority === 'high' ? 'border-l-4 border-l-red-500' :
      task.priority === 'medium' ? 'border-l-4 border-l-yellow-500' :
      'border-l-4 border-l-green-500'
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 
              className="text-lg font-semibold text-white mb-2 cursor-pointer hover:text-blue-300 transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {task.title}
            </h3>
            <div className="flex items-center space-x-2 mb-3">
              <Badge className={`${priorityColors[task.priority]} text-xs font-medium`}>
                {task.priority}
              </Badge>
              <Badge className={`${statusColors[task.status]} text-xs font-medium`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {task.status.replace('-', ' ')}
              </Badge>
              {isOverdue && (
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs font-medium">
                  Overdue
                </Badge>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800 border-slate-700">
              <DropdownMenuItem onClick={handleStatusChange} className="text-white hover:bg-slate-700">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Change Status
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-slate-700">
                <Edit className="w-4 h-4 mr-2" />
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(task.id)}
                className="text-red-400 hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Description */}
        <p className={`text-slate-300 mb-4 transition-all duration-300 ${
          isExpanded ? 'line-clamp-none' : 'line-clamp-2'
        }`}>
          {task.description}
        </p>

        {/* Tags */}
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white/10 text-slate-300 border border-white/20"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-slate-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span className={isOverdue ? 'text-red-400' : ''}>
                {format(task.dueDate, 'MMM dd')}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{task.assignee}</span>
            </div>
          </div>
          
          <Button
            onClick={handleStatusChange}
            size="sm"
            className="btn-glass text-white hover:scale-105 transition-transform duration-200"
          >
            <StatusIcon className="w-4 h-4 mr-1" />
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
