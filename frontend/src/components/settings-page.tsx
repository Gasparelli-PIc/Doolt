import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Settings, 
  User, 
  Bell, 
  Palette, 
  Shield, 
  Globe, 
  HardDrive,
  Info,
  LogOut,
  Trash2,
  Download,
  Upload,
  Save
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface SettingsData {
  // Conta
  username: string;
  email: string;
  
  // Notificações
  emailNotifications: boolean;
  taskReminders: boolean;
  goalReminders: boolean;
  weeklyReport: boolean;
  reminderTime: string;
  
  // Aparência
  theme: string;
  accentColor: string;
  compactMode: boolean;
  
  // Privacidade
  showProfile: boolean;
  dataCollection: boolean;
  
  // Idioma e Região
  language: string;
  dateFormat: string;
  timeFormat: string;
  
  // Backup
  autoBackup: boolean;
  backupFrequency: string;
}

export function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData>({
    username: '',
    email: '',
    emailNotifications: true,
    taskReminders: true,
    goalReminders: true,
    weeklyReport: false,
    reminderTime: '09:00',
    theme: 'light',
    accentColor: 'blue',
    compactMode: false,
    showProfile: true,
    dataCollection: true,
    language: 'pt-BR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    autoBackup: true,
    backupFrequency: 'weekly',
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Carregar configurações do localStorage
    const savedSettings = localStorage.getItem('app_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Carregar dados do usuário
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const user = JSON.parse(userData);
      setSettings(prev => ({
        ...prev,
        username: user.name || '',
        email: user.email || '',
      }));
    }
  }, []);

  const updateSetting = (key: keyof SettingsData, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    localStorage.setItem('app_settings', JSON.stringify(settings));
    setHasChanges(false);
    toast.success('Configurações salvas com sucesso!');
  };

  const exportData = () => {
    const allData = {
      settings,
      tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
      notes: JSON.parse(localStorage.getItem('notes') || '[]'),
      goals: JSON.parse(localStorage.getItem('goals') || '[]'),
      events: JSON.parse(localStorage.getItem('events') || '[]'),
    };

    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `organizapro-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Backup exportado com sucesso!');
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (data.settings) localStorage.setItem('app_settings', JSON.stringify(data.settings));
        if (data.tasks) localStorage.setItem('tasks', JSON.stringify(data.tasks));
        if (data.notes) localStorage.setItem('notes', JSON.stringify(data.notes));
        if (data.goals) localStorage.setItem('goals', JSON.stringify(data.goals));
        if (data.events) localStorage.setItem('events', JSON.stringify(data.events));
        
        toast.success('Backup importado! Recarregue a página para ver as alterações.');
      } catch (error) {
        toast.error('Erro ao importar backup. Arquivo inválido.');
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    localStorage.removeItem('tasks');
    localStorage.removeItem('notes');
    localStorage.removeItem('goals');
    localStorage.removeItem('events');
    toast.success('Todos os dados foram apagados!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-3 mb-2">
          <Settings className="h-8 w-8" />
          Configurações
        </h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e configurações do aplicativo
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="account">
            <User className="h-4 w-4 mr-2" />
            Conta
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" />
            Aparência
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Shield className="h-4 w-4 mr-2" />
            Privacidade
          </TabsTrigger>
          <TabsTrigger value="language">
            <Globe className="h-4 w-4 mr-2" />
            Idioma
          </TabsTrigger>
          <TabsTrigger value="backup">
            <HardDrive className="h-4 w-4 mr-2" />
            Backup
          </TabsTrigger>
          <TabsTrigger value="about">
            <Info className="h-4 w-4 mr-2" />
            Sobre
          </TabsTrigger>
        </TabsList>

        {/* Conta */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Conta</CardTitle>
              <CardDescription>Gerencie suas informações pessoais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nome de usuário</Label>
                <Input
                  id="username"
                  value={settings.username}
                  onChange={(e) => updateSetting('username', e.target.value)}
                  placeholder="Seu nome"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSetting('email', e.target.value)}
                  placeholder="seu@email.com"
                />
              </div>

            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Segurança
              </CardTitle>
              <CardDescription>Mantenha sua conta segura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Alterar Senha
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Configurar 2FA
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Gerenciar Sessões
              </Button>
              <Separator />
              <p className="text-xs text-muted-foreground">
                Mantenha sua conta segura com autenticação de dois fatores.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Zona de perigo</CardTitle>
              <CardDescription>Ações irreversíveis da conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir conta
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta
                      e removerá todos os seus dados de nossos servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                      Sim, excluir conta
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>Configure quando e como você deseja ser notificado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por email</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba atualizações importantes por email
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Lembretes de tarefas</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificações sobre tarefas pendentes e prazos
                  </p>
                </div>
                <Switch
                  checked={settings.taskReminders}
                  onCheckedChange={(checked) => updateSetting('taskReminders', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Lembretes de metas</Label>
                  <p className="text-sm text-muted-foreground">
                    Acompanhe o progresso das suas metas
                  </p>
                </div>
                <Switch
                  checked={settings.goalReminders}
                  onCheckedChange={(checked) => updateSetting('goalReminders', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Relatório semanal</Label>
                  <p className="text-sm text-muted-foreground">
                    Resumo semanal da sua produtividade
                  </p>
                </div>
                <Switch
                  checked={settings.weeklyReport}
                  onCheckedChange={(checked) => updateSetting('weeklyReport', checked)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="reminderTime">Horário dos lembretes</Label>
                <Input
                  id="reminderTime"
                  type="time"
                  value={settings.reminderTime}
                  onChange={(e) => updateSetting('reminderTime', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Horário padrão para envio de lembretes diários
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aparência */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personalização Visual</CardTitle>
              <CardDescription>Customize a aparência do aplicativo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Tema</Label>
                <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Escuro</SelectItem>
                    <SelectItem value="auto">Automático (Sistema)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Use o toggle na barra lateral para alternar entre claro e escuro
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="accentColor">Cor de destaque</Label>
                <Select value={settings.accentColor} onValueChange={(value) => updateSetting('accentColor', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Azul</SelectItem>
                    <SelectItem value="green">Verde</SelectItem>
                    <SelectItem value="purple">Roxo</SelectItem>
                    <SelectItem value="red">Vermelho</SelectItem>
                    <SelectItem value="orange">Laranja</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo compacto</Label>
                  <p className="text-sm text-muted-foreground">
                    Reduz espaçamentos para exibir mais conteúdo
                  </p>
                </div>
                <Switch
                  checked={settings.compactMode}
                  onCheckedChange={(checked) => updateSetting('compactMode', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacidade */}
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacidade e Segurança</CardTitle>
              <CardDescription>Controle seus dados e privacidade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Perfil público</Label>
                  <p className="text-sm text-muted-foreground">
                    Permite que outros usuários vejam seu perfil
                  </p>
                </div>
                <Switch
                  checked={settings.showProfile}
                  onCheckedChange={(checked) => updateSetting('showProfile', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Coleta de dados de uso</Label>
                  <p className="text-sm text-muted-foreground">
                    Ajuda a melhorar o aplicativo com dados anônimos
                  </p>
                </div>
                <Switch
                  checked={settings.dataCollection}
                  onCheckedChange={(checked) => updateSetting('dataCollection', checked)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Gerenciar dados</Label>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" onClick={exportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Baixar meus dados
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="w-full text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Apagar todos os dados
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Apagar todos os dados?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Isso removerá permanentemente todas as suas tarefas, notas, metas e eventos.
                          Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={clearAllData}
                        >
                          Sim, apagar tudo
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Idioma e Região */}
        <TabsContent value="language" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Idioma e Região</CardTitle>
              <CardDescription>Configure suas preferências regionais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es-ES">Español</SelectItem>
                    <SelectItem value="fr-FR">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="dateFormat">Formato de data</Label>
                <Select value={settings.dateFormat} onValueChange={(value) => updateSetting('dateFormat', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="timeFormat">Formato de hora</Label>
                <Select value={settings.timeFormat} onValueChange={(value) => updateSetting('timeFormat', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24 horas</SelectItem>
                    <SelectItem value="12h">12 horas (AM/PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup e Sincronização */}
        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup e Sincronização</CardTitle>
              <CardDescription>Proteja seus dados com backups automáticos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Backup automático</Label>
                  <p className="text-sm text-muted-foreground">
                    Cria backups periódicos dos seus dados
                  </p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Frequência do backup</Label>
                <Select 
                  value={settings.backupFrequency} 
                  onValueChange={(value) => updateSetting('backupFrequency', value)}
                  disabled={!settings.autoBackup}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diário</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Gerenciar backups</Label>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" onClick={exportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar backup agora
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <label htmlFor="import-backup" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Importar backup
                    </label>
                  </Button>
                  <input
                    id="import-backup"
                    type="file"
                    accept=".json"
                    onChange={importData}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>Último backup:</strong> Nunca
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Seus dados são armazenados localmente no navegador
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sobre */}
        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sobre o OrganizaPro</CardTitle>
              <CardDescription>Informações sobre o aplicativo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center py-6">
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Settings className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mt-4">OrganizaPro</h3>
                  <p className="text-sm text-muted-foreground">Versão 1.0.0</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Desenvolvido com</span>
                  <span className="text-sm">React + Tailwind CSS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Componentes UI</span>
                  <span className="text-sm">shadcn/ui</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Ícones</span>
                  <span className="text-sm">Lucide React</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Termos de uso
                </Button>
                <Button variant="outline" className="w-full">
                  Política de privacidade
                </Button>
                <Button variant="outline" className="w-full">
                  Ajuda e suporte
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground pt-4">
                © 2025 OrganizaPro. Todos os direitos reservados.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Botão de salvar fixo */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button onClick={saveSettings} size="lg" className="shadow-lg">
            <Save className="h-5 w-5 mr-2" />
            Salvar alterações
          </Button>
        </div>
      )}
    </div>
  );
}
