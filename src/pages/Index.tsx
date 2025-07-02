import { ArrowRight, CheckCircle, Calendar, Users, Zap, Shield, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-green-400" />,
      title: "Smart Task Management",
      description: "Organize, prioritize, and track your tasks with intelligent features and real-time updates.",
      gradient: "from-green-400 to-emerald-600"
    },
    {
      icon: <Calendar className="w-8 h-8 text-blue-400" />,
      title: "Calendar Integration",
      description: "Visualize your tasks on a beautiful calendar interface with drag-and-drop functionality.",
      gradient: "from-blue-400 to-cyan-600"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: "Team Collaboration",
      description: "Share tasks and collaborate with your team in real-time with advanced permission controls.",
      gradient: "from-purple-400 to-pink-600"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Real-time Updates",
      description: "Get instant notifications and updates across all your devices with WebSocket technology.",
      gradient: "from-yellow-400 to-orange-600"
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security and OAuth 2.0 authentication.",
      gradient: "from-emerald-400 to-teal-600"
    },
    {
      icon: <Star className="w-8 h-8 text-pink-400" />,
      title: "Premium Experience",
      description: "Enjoy a premium user experience with beautiful animations and intuitive design.",
      gradient: "from-pink-400 to-rose-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612db15?w=64&h=64&fit=crop&crop=face",
      content: "Focilo has revolutionized how our team collaborates. The interface is beautiful and intuitive.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      content: "The real-time updates and calendar integration make it perfect for managing complex projects.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Design Lead",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      content: "Finally, a task manager that's as beautiful as it is functional. Love the modern design!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      
      {/* Navigation */}
      <nav className="relative z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">Focilo</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors hover:scale-105 transform duration-200">Features</a>
              <a href="#testimonials" className="text-white/80 hover:text-white transition-colors hover:scale-105 transform duration-200">Reviews</a>
              <a href="#pricing" className="text-white/80 hover:text-white transition-colors hover:scale-105 transform duration-200">Pricing</a>
            </div>
            
            <Link to="/login">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm text-white/90 mb-8">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              <span>✨ Now with AI-powered task suggestions</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 text-white leading-tight">
              Organize Your Life
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                With Style
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              The most beautiful and powerful task management platform. 
              Collaborate in real-time, stay organized, and achieve more with our advanced features and intuitive design.
            </p>
          </div>

          <div className="animate-fade-in flex flex-col sm:flex-row gap-6 justify-center mb-16" style={{ animationDelay: '0.2s' }}>
            <Link to="/login">
              <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-12 py-4 text-lg rounded-2xl font-semibold shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                Start Free Trial
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/30 hover:border-white/50 text-white px-12 py-4 text-lg rounded-2xl font-semibold transition-all duration-300">
              Watch Demo
            </Button>
          </div>

          {/* Hero Dashboard Preview */}
          <div className="animate-scale-in max-w-5xl mx-auto" style={{ animationDelay: '0.4s' }}>
            <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex space-x-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                  <div className="text-sm text-slate-400 font-medium">Focilo Dashboard</div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <div>
                            <h3 className="text-white font-semibold">Complete project proposal</h3>
                            <p className="text-slate-300 text-sm">Due today • High priority</p>
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-slate-400 hover:text-white transition-colors cursor-pointer" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div>
                            <h3 className="text-white font-semibold">Review team feedback</h3>
                            <p className="text-slate-300 text-sm">Tomorrow • Medium priority</p>
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-slate-400 hover:text-white transition-colors cursor-pointer" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <h3 className="text-white font-semibold">Plan weekend activities</h3>
                            <p className="text-slate-300 text-sm">Next week • Low priority</p>
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-slate-400 hover:text-white transition-colors cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h4 className="text-white font-semibold mb-4">Today's Progress</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-300">Completed</span>
                          <span className="text-green-400">75%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-white/10">
                        <div className="text-2xl font-bold text-white mb-1">12</div>
                        <div className="text-slate-400 text-sm">Tasks completed today</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
              Powerful <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to manage tasks, collaborate with teams, and boost your productivity to new heights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`mb-6 p-4 bg-gradient-to-r ${feature.gradient} bg-opacity-20 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-20 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
              What Our <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">Users Say</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied users who have transformed their productivity with Focilo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-white/20"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-slate-300 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/20 rounded-3xl p-12 hover:border-white/30 transition-all duration-500">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
              Ready to Get <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Started?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Join thousands of users who are already organizing their lives with Focilo. 
              Start your journey to better productivity today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/login">
                <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-16 py-4 text-xl rounded-2xl font-semibold shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                  Start Your Journey
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/30 hover:border-white/50 text-white px-16 py-4 text-xl rounded-2xl font-semibold transition-all duration-300">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">Focilo</span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md">
                The most beautiful and powerful task management platform designed to help you organize your life with style and efficiency.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#integrations" className="text-slate-400 hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#api" className="text-slate-400 hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-slate-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#careers" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#blog" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#contact" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 Focilo. All rights reserved. Built with passion for productivity and beautiful design.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
