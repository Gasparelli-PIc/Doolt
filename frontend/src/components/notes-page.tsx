import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  StickyNote, 
  Plus, 
  Search,
  Grid3X3,
  List,
  Star,
  StarOff,
  Edit2,
  Trash2,
  BookOpen,
  Tag,
  Calendar,
  Clock,
  Filter
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  color: string;
}

export function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Ideias para o projeto',
      content: 'Implementar sistema de notificações\nAdicionar modo escuro\nMelhorar performance da aplicação\nCriar testes automatizados',
      tags: ['desenvolvimento', 'ideias', 'features'],
      isFavorite: true,
      createdAt: '2024-12-20',
      updatedAt: '2024-12-21',
      color: 'blue'
    },
    {
      id: '2',
      title: 'Lista de compras',
      content: 'Leite\nPão\nOvos\nFrutas (banana, maçã)\nLegumes (cenoura, brócolis)\nCarne para o jantar\nDetergente',
      tags: ['compras', 'casa'],
      isFavorite: false,
      createdAt: '2024-12-21',
      updatedAt: '2024-12-21',
      color: 'green'
    },
    {
      id: '3',
      title: 'Receita de bolo de chocolate',
      content: 'Ingredientes:\n- 2 xícaras de farinha\n- 1 xícara de açúcar\n- 1/2 xícara de cacau\n- 2 ovos\n- 1 xícara de leite\n\nModo de preparo:\n1. Misture os ingredientes secos\n2. Adicione os líquidos\n3. Asse por 40 minutos a 180°C',
      tags: ['receita', 'doce', 'chocolate'],
      isFavorite: true,
      createdAt: '2024-12-19',
      updatedAt: '2024-12-20',
      color: 'yellow'
    },
    {
      id: '4',
      title: 'Metas para 2024',
      content: 'Profissional:\n- Aprender React avançado\n- Conseguir promoção\n- Fazer networking\n\nPessoal:\n- Ler 24 livros\n- Fazer exercícios 3x/semana\n- Viajar para 2 países novos\n\nFinanceiro:\n- Economizar 20% do salário\n- Investir em renda variável',
      tags: ['metas', '2024', 'objetivos'],
      isFavorite: false,
      createdAt: '2024-12-18',
      updatedAt: '2024-12-18',
      color: 'purple'
    },
    {
      id: '5',
      title: 'Anotações da reunião',
      content: 'Pontos discutidos:\n- Novo layout da homepage\n- Prazo: 15 dias\n- Responsável: Maria\n\nPendências:\n- Revisar wireframes\n- Validar com UX team\n- Preparar apresentação\n\nPróxima reunião: 28/12',
      tags: ['reunião', 'projeto', 'tarefas'],
      isFavorite: false,
      createdAt: '2024-12-22',
      updatedAt: '2024-12-22',
      color: 'red'
    }
  ]);

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: '',
    color: 'blue'
  });

  // Carrega notas do localStorage na inicialização
  useEffect(() => {
    const savedNotes = localStorage.getItem('appNotes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error('Erro ao carregar notas:', error);
      }
    }
  }, []);

  // Salva as notas no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem('appNotes', JSON.stringify(notes));
  }, [notes]);

  const colors = {
    blue: 'bg-blue-100 border-blue-200',
    green: 'bg-green-100 border-green-200',
    yellow: 'bg-yellow-100 border-yellow-200',
    purple: 'bg-purple-100 border-purple-200',
    red: 'bg-red-100 border-red-200',
    orange: 'bg-orange-100 border-orange-200',
    pink: 'bg-pink-100 border-pink-200',
    gray: 'bg-gray-100 border-gray-200'
  };

  const getTagColor = (tag: string) => {
    // Gera uma cor consistente baseada no hash da tag
    const colors = [
      'bg-blue-100 text-blue-700',
      'bg-green-100 text-green-700',
      'bg-purple-100 text-purple-700',
      'bg-orange-100 text-orange-700',
      'bg-pink-100 text-pink-700',
      'bg-indigo-100 text-indigo-700',
      'bg-teal-100 text-teal-700',
      'bg-amber-100 text-amber-700'
    ];
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateString === today.toISOString().split('T')[0]) {
      return 'Hoje';
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  const saveNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const tagsList = newNote.tags 
        ? newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : [];

      const currentDate = new Date().toISOString().split('T')[0];

      if (editingNote) {
        setNotes(notes.map(note =>
          note.id === editingNote.id ? {
            ...note,
            title: newNote.title,
            content: newNote.content,
            tags: tagsList,
            color: newNote.color,
            updatedAt: currentDate
          } : note
        ));
      } else {
        setNotes([...notes, {
          id: Date.now().toString(),
          title: newNote.title,
          content: newNote.content,
          tags: tagsList,
          color: newNote.color,
          isFavorite: false,
          createdAt: currentDate,
          updatedAt: currentDate
        }]);
      }

      setNewNote({
        title: '',
        content: '',
        tags: '',
        color: 'blue'
      });
      setEditingNote(null);
      setIsDialogOpen(false);
    }
  };

  const editNote = (note: Note) => {
    setEditingNote(note);
    setNewNote({
      title: note.title,
      content: note.content,
      tags: note.tags.join(', '),
      color: note.color
    });
    setIsDialogOpen(true);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    ));
  };

  const filteredNotes = notes.filter(note => {
    const matchesFilter = filter === 'all' || (filter === 'favorites' && note.isFavorite);
    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  // Conta todas as tags únicas
  const allTags = new Set<string>();
  notes.forEach(note => {
    note.tags.forEach(tag => allTags.add(tag));
  });

  const stats = {
    total: notes.length,
    favorites: notes.filter(n => n.isFavorite).length,
    tags: allTags.size,
    recentlyUpdated: notes.filter(n => {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      return n.updatedAt === today || n.updatedAt === yesterdayStr;
    }).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notas</h1>
          <p className="text-muted-foreground">
            Organize suas ideias, lembretes e anotações importantes.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingNote(null);
              setNewNote({
                title: '',
                content: '',
                tags: '',
                color: 'blue'
              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Nota
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingNote ? 'Editar Nota' : 'Nova Nota'}
              </DialogTitle>
              <DialogDescription>
                {editingNote ? 'Atualize as informações da nota abaixo.' : 'Preencha as informações para criar uma nova nota.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Título da nota..."
                />
              </div>

              <div>
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Escreva sua nota aqui..."
                  rows={8}
                  className="min-h-32"
                />
              </div>

              <div>
                <Label htmlFor="color">Cor</Label>
                <Select value={newNote.color} onValueChange={(value) => setNewNote({ ...newNote, color: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Azul</SelectItem>
                    <SelectItem value="green">Verde</SelectItem>
                    <SelectItem value="yellow">Amarelo</SelectItem>
                    <SelectItem value="purple">Roxo</SelectItem>
                    <SelectItem value="red">Vermelho</SelectItem>
                    <SelectItem value="orange">Laranja</SelectItem>
                    <SelectItem value="pink">Rosa</SelectItem>
                    <SelectItem value="gray">Cinza</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={newNote.tags}
                  onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                  placeholder="Separadas por vírgula (ex: trabalho, ideias, importante)"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={saveNote}>
                  {editingNote ? 'Salvar' : 'Criar Nota'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Notas</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <StickyNote className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Favoritas</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.favorites}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tags Únicas</p>
                <p className="text-2xl font-bold text-purple-600">{stats.tags}</p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Tag className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Atualizadas Recentemente</p>
                <p className="text-2xl font-bold text-green-600">{stats.recentlyUpdated}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar notas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters and View */}
            <div className="flex gap-2">
              <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="favorites">Favoritas</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={view === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setView('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setView('list')}
                  className="rounded-l-none border-l"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {filteredNotes.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <StickyNote className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">Nenhuma nota encontrada</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || filter !== 'all'
                ? 'Tente ajustar os filtros ou criar uma nova nota.'
                : 'Comece criando sua primeira nota.'}
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Nota
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={
          view === 'grid' 
            ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'space-y-4'
        }>
          {filteredNotes.map((note) => (
            <Card 
              key={note.id} 
              className={`hover:shadow-md transition-shadow ${colors[note.color as keyof typeof colors]} ${
                view === 'list' ? 'flex' : ''
              }`}
            >
              <CardHeader className={`pb-3 ${view === 'list' ? 'flex-shrink-0 w-64' : ''}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-2 truncate">{note.title}</CardTitle>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {note.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className={`text-xs ${getTagColor(tag)}`}>
                          {tag}
                        </Badge>
                      ))}
                      {note.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-gray-100 text-gray-700">
                          +{note.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(note.id)}
                      className="h-6 w-6 p-0"
                    >
                      {note.isFavorite ? (
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarOff className="h-3 w-3" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editNote(note)}
                      className="h-6 w-6 p-0"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNote(note.id)}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className={`pt-0 ${view === 'list' ? 'flex-1' : ''}`}>
                <p className={`text-sm text-muted-foreground mb-4 whitespace-pre-line ${
                  view === 'grid' ? 'line-clamp-4' : 'line-clamp-3'
                }`}>
                  {note.content}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(note.createdAt)}
                    </div>
                    {note.updatedAt !== note.createdAt && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Editado {formatDate(note.updatedAt)}
                      </div>
                    )}
                  </div>
                  {note.isFavorite && (
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
