import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export function MiniCalendar({ onNavigateToCalendar }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock events for demo
  const events = [
    { date: '2025-09-10', title: 'Reunião de equipe', time: '14:00', type: 'meeting' },
    { date: '2025-09-10', title: 'Dentista', time: '16:30', type: 'personal' },
    { date: '2025-09-11', title: 'Entrega do projeto', time: '18:00', type: 'deadline' },
    { date: '2025-09-12', title: 'Academia', time: '07:00', type: 'personal' },
    { date: '2025-09-13', title: 'Apresentação cliente', time: '10:00', type: 'meeting' },
  ];

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  
  const todayEvents = events.filter(event => event.date === todayString);
  const upcomingEvents = events.filter(event => event.date > todayString).slice(0, 3);

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'personal': return 'bg-green-100 text-green-800 border-green-300';
      case 'deadline': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Amanhã';
    } else {
      return date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Agenda
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {today.toLocaleDateString('pt-BR', { 
              weekday: 'long',
              day: 'numeric', 
              month: 'long' 
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Eventos de hoje */}
        <div>
          <h4 className="font-medium mb-2">Hoje ({todayEvents.length})</h4>
          {todayEvents.length > 0 ? (
            <div className="space-y-2">
              {todayEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                  <Badge variant="outline" className={`text-xs ${getEventTypeColor(event.type)}`}>
                    {event.type === 'meeting' ? 'Reunião' : 
                     event.type === 'personal' ? 'Pessoal' : 'Prazo'}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhum evento hoje</p>
          )}
        </div>

        {/* Próximos eventos */}
        <div>
          <h4 className="font-medium mb-2">Próximos</h4>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-2">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(event.date)} às {event.time}
                    </p>
                  </div>
                  <Badge variant="outline" className={`text-xs ${getEventTypeColor(event.type)}`}>
                    {event.type === 'meeting' ? 'Reunião' : 
                     event.type === 'personal' ? 'Pessoal' : 'Prazo'}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhum evento próximo</p>
          )}
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={onNavigateToCalendar}
        >
          Ver agenda completa
        </Button>
      </CardContent>
    </Card>
  );
}
