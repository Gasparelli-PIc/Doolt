import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StickyNote, Star } from "lucide-react";

export function QuickNotes() {
  const [notes, setNotes] = useState([]);

  // Carrega as notas do localStorage
  useEffect(() => {
    const loadNotes = () => {
      const savedNotes = localStorage.getItem('appNotes');
      if (savedNotes) {
        try {
          const parsedNotes = JSON.parse(savedNotes);
          // Ordena por data de atualização (mais recente primeiro) e pega até 5 notas
          const sortedNotes = parsedNotes
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .slice(0, 5);
          setNotes(sortedNotes);
        } catch (error) {
          console.error('Erro ao carregar notas:', error);
          setNotes([]);
        }
      } else {
        setNotes([]);
      }
    };

    loadNotes();

    // Atualiza quando há mudança no localStorage
    const handleStorageChange = () => {
      loadNotes();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Também verifica periodicamente por mudanças (para mudanças na mesma aba)
    const interval = setInterval(loadNotes, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const getTagColor = (tag) => {
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

  const formatDate = (dateString) => {
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

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      yellow: 'bg-yellow-50 border-yellow-200',
      purple: 'bg-purple-50 border-purple-200',
      red: 'bg-red-50 border-red-200',
      orange: 'bg-orange-50 border-orange-200',
      pink: 'bg-pink-50 border-pink-200',
      gray: 'bg-gray-50 border-gray-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <StickyNote className="h-5 w-5" />
            Notas Recentes
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notes.map((note) => (
            <div 
              key={note.id} 
              className={`p-3 border rounded-lg hover:shadow-sm transition-shadow ${getColorClasses(note.color)}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-medium flex-1">{note.title}</h4>
                {note.isFavorite && (
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                )}
              </div>
              
              <div className="flex items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-1 flex-wrap">
                  {note.tags && note.tags.slice(0, 2).map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className={`text-xs ${getTagColor(tag)}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                  {note.tags && note.tags.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{note.tags.length - 2}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatDate(note.updatedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <StickyNote className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p className="text-sm">Nenhuma nota ainda.</p>
            <p className="text-xs">Vá para a seção Notas para criar sua primeira nota.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
