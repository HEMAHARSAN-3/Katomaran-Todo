import { useState } from 'react';
import { Camera, Mail, User, Calendar, Award, Settings, Bell, Shield, Edit3, Save, X, MapPin, Globe, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate about productivity and getting things done efficiently. Always looking for ways to optimize workflows and help teams achieve their goals.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
    company: 'Tech Innovators Inc.',
    role: 'Senior Product Manager',
    notifications: {
      email: true,
      push: true,
      reminders: true,
      weekly: false,
      marketing: false
    }
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully! 🎉');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData({
      ...profileData,
      name: user?.name || '',
      email: user?.email || ''
    });
  };

  const handleNotificationChange = (type: string, value: boolean) => {
    setProfileData({
      ...profileData,
      notifications: {
        ...profileData.notifications,
        [type]: value
      }
    });
  };

  const stats = [
    { label: 'Tasks Completed', value: '127', icon: Award, color: 'text-green-400', bg: 'from-green-500/10 to-emerald-500/10', border: 'border-green-500/20' },
    { label: 'Active Projects', value: '8', icon: Briefcase, color: 'text-blue-400', bg: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20' },
    { label: 'Days Streak', value: '23', icon: Calendar, color: 'text-purple-400', bg: 'from-purple-500/10 to-pink-500/10', border: 'border-purple-500/20' },
    { label: 'Team Members', value: '12', icon: User, color: 'text-yellow-400', bg: 'from-yellow-500/10 to-orange-500/10', border: 'border-yellow-500/20' }
  ];

  const achievements = [
    { title: 'Early Bird', description: 'Completed 50 tasks before 9 AM', icon: '🌅', earned: true },
    { title: 'Team Player', description: 'Collaborated on 25+ shared tasks', icon: '🤝', earned: true },
    { title: 'Streak Master', description: 'Maintained a 30-day completion streak', icon: '🔥', earned: false },
    { title: 'Productivity Pro', description: 'Completed 100+ tasks in a month', icon: '⚡', earned: true }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8 animate-fade-in">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Profile Settings
              </span>
            </h1>
            <p className="text-slate-400 text-lg">
              Manage your account preferences and customize your experience
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">Profile 85% complete</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400">Security verified</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isEditing ? (
              <>
                <Button
                  onClick={handleCancel}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
                >
                  <X className="w-5 h-5 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-2xl font-semibold shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <Edit3 className="w-5 h-5 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Basic Info Card */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6 mb-8">
                <div className="relative group">
                  <Avatar className="w-32 h-32 border-4 border-white/20 shadow-2xl">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-4xl font-bold">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl hover:scale-110 transition-all duration-300"
                      size="sm"
                    >
                      <Camera className="w-5 h-5" />
                    </Button>
                  )}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{profileData.name}</h2>
                    <p className="text-slate-300 text-lg mb-1">{profileData.role}</p>
                    <p className="text-slate-400 mb-4">{profileData.email}</p>
                    <p className="text-slate-300 leading-relaxed">{profileData.bio}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Globe className="w-4 h-4 text-green-400" />
                      <span>{profileData.website}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Briefcase className="w-4 h-4 text-purple-400" />
                      <span>{profileData.company}</span>
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="space-y-6 border-t border-white/10 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white font-medium">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white font-medium">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-white font-medium">Job Title</Label>
                      <Input
                        id="role"
                        value={profileData.role}
                        onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-white font-medium">Company</Label>
                      <Input
                        id="company"
                        value={profileData.company}
                        onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-white font-medium">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-white font-medium">Website</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-white font-medium">Bio</Label>
                    <textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 focus:bg-white/15 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Notification Settings */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-blue-500/20 rounded-2xl">
                  <Bell className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Notification Preferences</h3>
                  <p className="text-slate-400">Customize how you receive updates</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { key: 'email', title: 'Email Notifications', description: 'Receive email updates about your tasks and projects' },
                  { key: 'push', title: 'Push Notifications', description: 'Get real-time notifications on your device' },
                  { key: 'reminders', title: 'Task Reminders', description: 'Get reminded about upcoming deadlines and due dates' },
                  { key: 'weekly', title: 'Weekly Summary', description: 'Receive weekly productivity reports and insights' },
                  { key: 'marketing', title: 'Marketing Updates', description: 'Stay informed about new features and product updates' }
                ].map((notification, index) => (
                  <div key={notification.key} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex-1">
                      <p className="text-white font-semibold mb-1">{notification.title}</p>
                      <p className="text-slate-400 text-sm leading-relaxed">{notification.description}</p>
                    </div>
                    <Switch
                      checked={profileData.notifications[notification.key as keyof typeof profileData.notifications]}
                      onCheckedChange={(checked) => handleNotificationChange(notification.key, checked)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Stats Cards */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-yellow-500/20 rounded-2xl">
                  <Award className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Your Statistics</h3>
                  <p className="text-slate-400 text-sm">Track your progress</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 bg-gradient-to-r ${stat.bg} border ${stat.border} rounded-2xl group hover:scale-105 transition-all duration-300`} style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <span className="text-white font-medium">{stat.label}</span>
                    </div>
                    <span className={`font-bold text-xl ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-2xl">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Achievements</h3>
                  <p className="text-slate-400 text-sm">Your milestones</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                    achievement.earned 
                      ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20' 
                      : 'bg-white/5 border border-white/10 opacity-60'
                  }`}>
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <p className={`font-medium ${achievement.earned ? 'text-white' : 'text-slate-400'}`}>
                        {achievement.title}
                      </p>
                      <p className="text-slate-400 text-xs">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Security */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-green-500/20 rounded-2xl">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Security</h3>
                  <p className="text-slate-400 text-sm">Protect your account</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  { label: 'Change Password', icon: '🔐' },
                  { label: 'Two-Factor Auth', icon: '🛡️' },
                  { label: 'Connected Apps', icon: '🔗' },
                  { label: 'Login History', icon: '📱' }
                ].map((item, index) => (
                  <Button key={index} className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 text-white font-medium py-3 rounded-2xl transition-all duration-300 hover:scale-105">
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Account Actions */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-slate-400" />
                Account Management
              </h3>
              <div className="space-y-3">
                <Button className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 hover:border-blue-500/50 text-blue-300 hover:text-blue-200 font-medium py-3 rounded-2xl transition-all duration-300 hover:scale-105">
                  📤 Export Data
                </Button>
                <Button className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 hover:border-yellow-500/50 text-yellow-300 hover:text-yellow-200 font-medium py-3 rounded-2xl transition-all duration-300 hover:scale-105">
                  🔄 Import Tasks
                </Button>
                <Button className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-red-300 hover:text-red-200 font-medium py-3 rounded-2xl transition-all duration-300 hover:scale-105">
                  🗑️ Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
