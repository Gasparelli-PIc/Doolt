import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle, Calendar, Target, TrendingUp } from "lucide-react";

function StatsCard({ title, value, description, icon, trend }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className={`flex items-center text-xs mt-1 ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className="w-3 h-3 mr-1" />
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}% desde semana passada
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  const stats = [
    {
      title: "Tarefas Concluídas",
      value: 12,
      description: "de 18 tarefas totais",
      icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 15, isPositive: true }
    },
    {
      title: "Compromissos Hoje",
      value: 3,
      description: "próximo às 14:00",
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "Metas Alcançadas",
      value: "75%",
      description: "3 de 4 metas mensais",
      icon: <Target className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 8, isPositive: true }
    },
    {
      title: "Produtividade",
      value: "92%",
      description: "meta semanal: 85%",
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 12, isPositive: true }
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
