import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { 
  Target, 
  Plus, 
  Trophy,
  Calendar,
  TrendingUp,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  BarChart3,
  Search,
  Filter
} from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description?: string;
  category: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
}

export function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Ler 24 livros este ano',
      description: 'Desenvolver o hábito de leitura e expandir conhecimentos',
      category: 'Educação',
      targetValue: 24,
      currentValue: 18,
      unit: 'livros',
      deadline: '2024-12-31',
      priority: 'high',
      status: 'active',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      title: 'Perder 10kg',
      description: 'Melhorar a saúde e condicionamento físico',
      category: 'Saúde',
      targetValue: 10,
      currentValue: 6.5,
      unit: 'kg',
      deadline: '2024-06-30',
      priority: 'high',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      title: 'Economizar R$ 10.000',
      description: 'Reserva de emergência para estabilidade financeira',
      category: 'Financeiro',
      targetValue: 10000,
      currentValue: 7500,
      unit: 'reais',
      deadline: '2024-12-31',
      priority: 'medium',
      status: 'active',
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      title: 'Completar curso de React',
      description: 'Dominar desenvolvimento front-end moderno',
      category: 'Carreira',
      targetValue: 100,
      currentValue: 100,
      unit: '% concluído',
      deadline: '2024-03-31',
      priority: 'high',
      status: 'completed',
      createdAt: '2024-01-01'
    },
    {
      id: '5',
      title: 'Meditar 365 dias',
      description: 'Praticar mindfulness e reduzir estresse',
      category: 'Bem-estar',
      targetValue: 365,
      currentValue: 298,
      unit: 'dias',
      deadline: '2024-12-31',
      priority: 'medium',
      status: 'active',
      createdAt: '2024-01-01'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'paused'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'Pessoal',
    targetValue: 1,
    currentValue: 0,
    unit: '',
    deadline: '',
    priority: 'medium' as const
  });

  const categories = ['Educação', 'Saúde', 'Financeiro', 'Carreira', 'Bem-estar', 'Pessoal', 'Fitness'];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'paused': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Educação': 'bg-purple-100 text-purple-800',
      'Saúde': 'bg-green-100 text-green-800',
      'Financeiro': 'bg-blue-100 text-blue-800',
      'Carreira': 'bg-orange-100 text-orange-800',
      'Bem-estar': 'bg-pink-100 text-pink-800',
      'Pessoal': 'bg-indigo-100 text-indigo-800',
      'Fitness': 'bg-red-100 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const saveGoal = () => {
    if (newGoal.title.trim() && newGoal.unit.trim() && newGoal.deadline) {
      if (editingGoal) {
        setGoals(goals.map(goal =>
          goal.id === editingGoal.id ? {
            ...goal,
            title: newGoal.title,
            description: newGoal.description,
            category: newGoal.category,
            targetValue: newGoal.targetValue,
            currentValue: newGoal.currentValue,
            unit: newGoal.unit,
            deadline: newGoal.deadline,
            priority: newGoal.priority
          } : goal
        ));
      } else {
        setGoals([...goals, {
          id: Date.now().toString(),
          title: newGoal.title,
          description: newGoal.description,
          category: newGoal.category,
          targetValue: newGoal.targetValue,
          currentValue: newGoal.currentValue,
          unit: newGoal.unit,
          deadline: newGoal.deadline,
          priority: newGoal.priority,
          status: 'active',
          createdAt: new Date().toISOString().split('T')[0]
        }]);
      }

      setNewGoal({
        title: '',
        description: '',
        category: 'Pessoal',
        targetValue: 1,
        currentValue: 0,
        unit: '',
        deadline: '',
        priority: 'medium'
      });
      setEditingGoal(null);
      setIsDialogOpen(false);
    }
  };

  const editGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setNewGoal({
      title: goal.title,
      description: goal.description || '',
      category: goal.category,
      targetValue: goal.targetValue,
      currentValue: goal.currentValue,
      unit: goal.unit,
      deadline: goal.deadline,
      priority: goal.priority
    });
    setIsDialogOpen(true);
  };

  const updateProgress = (goalId: string, newValue: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const status = newValue >= goal.targetValue ? 'completed' : goal.status;
        return { ...goal, currentValue: newValue, status };
      }
      return goal;
    }));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const toggleGoalStatus = (goalId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        let newStatus: 'active' | 'completed' | 'paused';
        if (goal.status === 'active') {
          newStatus = 'paused';
        } else if (goal.status === 'paused') {
          newStatus = 'active';
        } else {
          newStatus = 'active';
        }
        return { ...goal, status: newStatus };
      }
      return goal;
    }));
  };

  const filteredGoals = goals.filter(goal => {
    const matchesFilter = filter === 'all' || goal.status === filter;
    const matchesCategory = categoryFilter === 'all' || goal.category === categoryFilter;
    const matchesSearch = searchQuery === '' || 
      goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (goal.description && goal.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesCategory && matchesSearch;
  });

  const stats = {
    total: goals.length,
    active: goals.filter(g => g.status === 'active').length,
    completed: goals.filter(g => g.status === 'completed').length,
    averageProgress: goals.length > 0 
      ? Math.round(goals.reduce((acc, goal) => acc + calculateProgress(goal.currentValue, goal.targetValue), 0) / goals.length)
      : 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Metas</h1>
        <p className="text-muted-foreground">
          Defina e acompanhe seus objetivos pessoais e profissionais.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Metas</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ativas</p>
                <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Concluídas</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Trophy className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Progresso Médio</p>
                <p className="text-2xl font-bold text-purple-600">{stats.averageProgress}%</p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar metas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="active">Ativas</SelectItem>
                  <SelectItem value="completed">Concluídas</SelectItem>
                  <SelectItem value="paused">Pausadas</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Add Goal Button */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setEditingGoal(null);
                    setNewGoal({
                      title: '',
                      description: '',
                      category: 'Pessoal',
                      targetValue: 1,
                      currentValue: 0,
                      unit: '',
                      deadline: '',
                      priority: 'medium'
                    });
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Meta
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingGoal ? 'Editar Meta' : 'Nova Meta'}
                    </DialogTitle>
                    <DialogDescription>
                      {editingGoal ? 'Atualize as informações da meta abaixo.' : 'Preencha as informações para criar uma nova meta.'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={newGoal.title}
                        onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                        placeholder="Nome da sua meta..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={newGoal.description}
                        onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                        placeholder="Descreva sua meta (opcional)..."
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Categoria</Label>
                        <Select value={newGoal.category} onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="priority">Prioridade</Label>
                        <Select value={newGoal.priority} onValueChange={(value: any) => setNewGoal({ ...newGoal, priority: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Baixa</SelectItem>
                            <SelectItem value="medium">Média</SelectItem>
                            <SelectItem value="high">Alta</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="targetValue">Meta</Label>
                        <Input
                          id="targetValue"
                          type="number"
                          value={newGoal.targetValue}
                          onChange={(e) => setNewGoal({ ...newGoal, targetValue: Number(e.target.value) })}
                          min="1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="currentValue">Atual</Label>
                        <Input
                          id="currentValue"
                          type="number"
                          value={newGoal.currentValue}
                          onChange={(e) => setNewGoal({ ...newGoal, currentValue: Number(e.target.value) })}
                          min="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="unit">Unidade</Label>
                        <Input
                          id="unit"
                          value={newGoal.unit}
                          onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                          placeholder="kg, livros..."
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="deadline">Prazo</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={saveGoal}>
                        {editingGoal ? 'Salvar' : 'Criar Meta'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredGoals.map((goal) => {
          const progress = calculateProgress(goal.currentValue, goal.targetValue);
          const daysLeft = getDaysUntilDeadline(goal.deadline);
          
          return (
            <Card key={goal.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-2 truncate">{goal.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline" className={`text-xs ${getCategoryColor(goal.category)}`}>
                        {goal.category}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(goal.status)}`}>
                        {goal.status === 'active' ? 'Ativa' : 
                         goal.status === 'completed' ? 'Concluída' : 'Pausada'}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(goal.priority)}`}>
                        {goal.priority === 'high' ? 'Alta' : 
                         goal.priority === 'medium' ? 'Média' : 'Baixa'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editGoal(goal)}
                      className="h-6 w-6 p-0"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteGoal(goal.id)}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {goal.description && (
                  <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
                )}
                
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Progresso</span>
                      <span className="text-sm font-medium">{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">
                        {goal.currentValue} / {goal.targetValue} {goal.unit}
                      </span>
                      {goal.status === 'completed' && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </div>

                  {/* Update Progress */}
                  {goal.status !== 'completed' && (
                    <div>
                      <Label className="text-xs">Atualizar progresso</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="number"
                          value={goal.currentValue}
                          onChange={(e) => updateProgress(goal.id, Number(e.target.value))}
                          min="0"
                          max={goal.targetValue}
                          className="h-8 text-xs"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleGoalStatus(goal.id)}
                          className="h-8 px-2 text-xs"
                        >
                          {goal.status === 'active' ? 'Pausar' : 'Ativar'}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Deadline Info */}
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar className="h-3 w-3" />
                    <span className="text-muted-foreground">
                      {new Date(goal.deadline).toLocaleDateString('pt-BR')}
                    </span>
                    {daysLeft > 0 && goal.status !== 'completed' && (
                      <span className={`ml-2 ${daysLeft <= 7 ? 'text-red-600' : 'text-muted-foreground'}`}>
                        ({daysLeft} {daysLeft === 1 ? 'dia' : 'dias'} restantes)
                      </span>
                    )}
                    {daysLeft < 0 && goal.status !== 'completed' && (
                      <span className="ml-2 text-red-600">
                        (Prazo vencido)
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredGoals.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">Nenhuma meta encontrada</h3>
            <p className="text-muted-foreground mb-4">
              {filter !== 'all' || categoryFilter !== 'all' 
                ? 'Tente ajustar os filtros ou criar uma nova meta.'
                : 'Comece definindo suas primeiras metas pessoais.'}
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Meta
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}