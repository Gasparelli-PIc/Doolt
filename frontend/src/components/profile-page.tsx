import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  User, 
  Edit2, 
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Trophy,
  Target,
  CheckSquare,
  StickyNote,
  TrendingUp
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  occupation: string;
  birthDate: string;
  joinDate: string;
  avatar: string;
}



export function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '+55 (11) 99999-9999',
    location: 'São Paulo, SP',
    bio: 'Apaixonada por produtividade e organização. Sempre buscando maneiras de otimizar meu tempo e alcançar meus objetivos pessoais e profissionais.',
    occupation: 'Gerente de Projetos',
    birthDate: '1990-05-15',
    joinDate: '2024-01-15',
    avatar: 'MS'
  });



  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfile, setEditProfile] = useState(profile);

  // Mock stats data
  const userStats = {
    totalTasks: 127,
    completedTasks: 98,
    activeGoals: 8,
    completedGoals: 12,
    totalNotes: 45,
    eventsThisMonth: 23,
    productivityScore: 87,
    streakDays: 15
  };

  const achievements = [
    { id: 1, title: 'Primeiro Passo', description: 'Criou sua primeira tarefa', icon: CheckSquare, earned: true },
    { id: 2, title: 'Organizador', description: 'Completou 50 tarefas', icon: Trophy, earned: true },
    { id: 3, title: 'Planejador', description: 'Criou 10 metas', icon: Target, earned: true },
    { id: 4, title: 'Escritor', description: 'Criou 25 notas', icon: StickyNote, earned: true },
    { id: 5, title: 'Consistente', description: 'Manteve streak de 30 dias', icon: TrendingUp, earned: false },
    { id: 6, title: 'Mestre da Produtividade', description: 'Alcançou 95% de produtividade', icon: Trophy, earned: false }
  ];

  const saveProfile = () => {
    setProfile(editProfile);
    setIsEditingProfile(false);
  };



  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Meu Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais, estatísticas e conquistas.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
          <TabsTrigger value="achievements">Conquistas</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Profile Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Informações Pessoais</CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditProfile(profile);
                      setIsEditingProfile(true);
                    }}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{profile.name}</h3>
                    <p className="text-muted-foreground">{profile.occupation}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {profile.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {calculateAge(profile.birthDate)} anos
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Information */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{profile.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Telefone</p>
                        <p className="text-sm text-muted-foreground">{profile.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Data de Nascimento</p>
                        <p className="text-sm text-muted-foreground">{formatDate(profile.birthDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Membro desde</p>
                        <p className="text-sm text-muted-foreground">{formatDate(profile.joinDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h4 className="font-medium mb-2">Sobre mim</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {profile.bio}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo da Atividade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tarefas Concluídas</span>
                  <Badge variant="secondary">{userStats.completedTasks}/{userStats.totalTasks}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Metas Ativas</span>
                  <Badge variant="secondary">{userStats.activeGoals}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Notas Criadas</span>
                  <Badge variant="secondary">{userStats.totalNotes}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Produtividade</span>
                  <Badge className="bg-green-100 text-green-800">{userStats.productivityScore}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Streak Atual</span>
                  <Badge className="bg-orange-100 text-orange-800">{userStats.streakDays} dias</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Edit Profile Dialog */}
          <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Editar Perfil</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={editProfile.name}
                      onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="occupation">Profissão</Label>
                    <Input
                      id="occupation"
                      value={editProfile.occupation}
                      onChange={(e) => setEditProfile({ ...editProfile, occupation: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editProfile.email}
                      onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={editProfile.phone}
                      onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      value={editProfile.location}
                      onChange={(e) => setEditProfile({ ...editProfile, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthDate">Data de Nascimento</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={editProfile.birthDate}
                      onChange={(e) => setEditProfile({ ...editProfile, birthDate: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Sobre mim</Label>
                  <Textarea
                    id="bio"
                    value={editProfile.bio}
                    onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={saveProfile}>
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Tarefas</p>
                    <p className="text-2xl font-bold">{userStats.totalTasks}</p>
                    <p className="text-xs text-green-600">+12 este mês</p>
                  </div>
                  <CheckSquare className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
                    <p className="text-2xl font-bold">{Math.round((userStats.completedTasks / userStats.totalTasks) * 100)}%</p>
                    <p className="text-xs text-green-600">+5% este mês</p>
                  </div>
                  <Trophy className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Metas Totais</p>
                    <p className="text-2xl font-bold">{userStats.activeGoals + userStats.completedGoals}</p>
                    <p className="text-xs text-blue-600">{userStats.completedGoals} concluídas</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pontuação</p>
                    <p className="text-2xl font-bold">{userStats.productivityScore}</p>
                    <p className="text-xs text-orange-600">Excelente!</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Atividade Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tarefas Criadas</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tarefas Concluídas</span>
                    <span className="font-medium">15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Metas Criadas</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Notas Criadas</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Eventos Agendados</span>
                    <span className="font-medium">{userStats.eventsThisMonth}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progresso dos Objetivos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Produtividade Geral</span>
                      <span className="text-sm font-medium">{userStats.productivityScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${userStats.productivityScore}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Metas Concluídas</span>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Consistency Score</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conquistas</CardTitle>
              <p className="text-sm text-muted-foreground">
                Desbloqueie conquistas completando tarefas e atingindo metas.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border ${
                        achievement.earned 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className={`p-2 rounded-full ${
                        achievement.earned 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <Trophy className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>


      </Tabs>
    </div>
  );
}