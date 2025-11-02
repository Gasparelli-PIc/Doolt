
import React, { useState, useEffect } from "react";
import { DashboardStats } from "./components/dashboard-stats";
import { TaskList } from "./components/task-list";
import { ProgressChart } from "./components/progress-chart";
import { QuickNotes } from "./components/quick-notes";
import { MiniCalendar } from "./components/mini-calendar";
import { TasksPage } from "./components/tasks-page";
import { CalendarPage } from "./components/calendar-page";
import { GoalsPage } from "./components/goals-page";
import { NotesPage } from "./components/notes-page";
import { ProfilePage } from "./components/profile-page";
import { SettingsPage } from "./components/settings-page";
import { LoginPage } from "./components/login-page";
import { RegisterPage } from "./components/register-page";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  Target, 
  StickyNote, 
  Settings,
  User,
  Moon,
  Sun,
  LogOut
} from "lucide-react";
import { Switch } from "./components/ui/switch";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Verifica se há uma sessão salva no localStorage
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth === 'true';
  });
  
  const [userData, setUserData] = useState(() => {
    // Carrega dados do usuário do localStorage
    const savedUser = localStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [currentPage, setCurrentPage] = useState<'dashboard' | 'tasks' | 'calendar' | 'goals' | 'notes' | 'profile' | 'settings'>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Verifica se há preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Se não houver preferência salva, define o tema claro (branco) como padrão
    return false;
  });

  // Aplica a classe 'dark' no elemento raiz quando o tema muda
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleRegister = (newUserData: any) => {
    setUserData(newUserData);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userData', JSON.stringify(newUserData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    setCurrentPage('dashboard');
    setAuthView('login');
  };

  // Se não estiver autenticado, mostra a tela de login ou registro
  if (!isAuthenticated) {
    if (authView === 'register') {
      return (
        <RegisterPage 
          onRegister={handleRegister}
          onBackToLogin={() => setAuthView('login')}
        />
      );
    }
    return (
      <LoginPage 
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthView('register')}
      />
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Bem-vindo de volta! Aqui está um resumo da sua organização pessoal.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="mb-8">
              <DashboardStats />
            </div>

            {/* Charts Section */}
            <div className="mb-8">
              <ProgressChart />
            </div>

            {/* Tasks and Calendar Section */}
            <div className="grid gap-6 lg:grid-cols-3 mb-8">
              <div className="lg:col-span-2">
                <TaskList />
              </div>
              <div>
                <MiniCalendar onNavigateToCalendar={() => setCurrentPage('calendar')} />
              </div>
            </div>

            {/* Notes Section */}
            <div className="mb-8">
              <QuickNotes />
            </div>
          </>
        );
      case 'tasks':
        return <TasksPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'goals':
        return <GoalsPage />;
      case 'notes':
        return <NotesPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border">
        <div className="flex flex-col h-full">
          {/* Logo/Title */}
          <div className="p-6 border-b border-sidebar-border">
            <h1 className="text-xl font-semibold text-sidebar-foreground">
              OrganizaPro
            </h1>
            <p className="text-sm text-sidebar-foreground/70 mt-1">
              Sua organização pessoal
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 'dashboard' 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('tasks')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 'tasks' 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <CheckSquare className="h-4 w-4" />
                  Tarefas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('calendar')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 'calendar' 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  Agenda
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('goals')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 'goals' 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <Target className="h-4 w-4" />
                  Metas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('notes')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 'notes' 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <StickyNote className="h-4 w-4" />
                  Notas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('profile')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 'profile' 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <User className="h-4 w-4" />
                  Meu Perfil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('settings')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 'settings' 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  Configurações
                </button>
              </li>
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-sidebar-border space-y-2">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-sidebar-accent/50">
              <div className="flex items-center gap-2">
                {isDarkMode ? (
                  <Moon className="h-4 w-4 text-sidebar-foreground" />
                ) : (
                  <Sun className="h-4 w-4 text-sidebar-foreground" />
                )}
                <span className="text-sm text-sidebar-foreground">
                  {isDarkMode ? 'Modo Escuro' : 'Modo Claro'}
                </span>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleTheme}
              />
            </div>
            
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:text-destructive hover:border-destructive"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Sair</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-6">
        {renderCurrentPage()}
      </div>
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}