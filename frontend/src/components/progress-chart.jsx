import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weeklyData = [
  { day: 'Seg', tasks: 8, completed: 6 },
  { day: 'Ter', tasks: 12, completed: 10 },
  { day: 'Qua', tasks: 10, completed: 8 },
  { day: 'Qui', tasks: 15, completed: 12 },
  { day: 'Sex', tasks: 9, completed: 9 },
  { day: 'Sáb', tasks: 6, completed: 4 },
  { day: 'Dom', tasks: 4, completed: 3 },
];

const goals = [
  { name: 'Exercitar-se', progress: 85, target: ' 5x por semana', current: '4x esta semana' },
  { name: 'Leitura', progress: 60, target: '2 livros por mês', current: '1.2 livros este mês' },
  { name: 'Economia', progress: 92, target: 'R$ 1.000 por mês', current: 'R$ 920 este mês' },
  { name: 'Estudos', progress: 75, target: '10h por semana', current: '7.5h esta semana' },
];

export function ProgressChart() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Produtividade Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                labelFormatter={(label) => `${label}`}
                formatter={(value, name) => [value, name === 'tasks' ? 'Total' : 'Concluídas']}
              />
              <Bar dataKey="tasks" fill="var(--color-muted)" name="tasks" />
              <Bar dataKey="completed" fill="var(--color-primary)" name="completed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metas Mensais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {goals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{goal.name}</span>
                <span className="text-muted-foreground">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{goal.current}</span>
                <span>{goal.target}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
