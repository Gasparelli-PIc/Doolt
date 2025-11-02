import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Calendar } from "lucide-react";

export function TaskList() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Revisar apresentação da reunião', completed: false, priority: 'high', dueDate: 'Hoje' },
    { id: '2', title: 'Responder emails pendentes', completed: true, priority: 'medium', dueDate: 'Ontem' },
    { id: '3', title: 'Comprar ingredientes para jantar', completed: false, priority: 'low', dueDate: 'Hoje' },
    { id: '4', title: 'Agendar consulta médica', completed: false, priority: 'medium', dueDate: 'Amanhã' },
    { id: '5', title: 'Estudar React por 1 hora', completed: true, priority: 'high', dueDate: 'Hoje' },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Minhas Tarefas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tarefas Pendentes */}
        <div>
          <h4 className="font-medium mb-2">Pendentes ({pendingTasks.length})</h4>
          <div className="space-y-2">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <div className="flex-1">
                  <p className="text-sm">{task.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  {task.dueDate && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {task.dueDate}
                    </div>
                  )}
                  <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tarefas Concluídas */}
        {completedTasks.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Concluídas ({completedTasks.length})</h4>
            <div className="space-y-2">
              {completedTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                  />
                  <div className="flex-1">
                    <p className="text-sm line-through text-muted-foreground">{task.title}</p>
                  </div>
                  <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-300">
                    Concluída
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
