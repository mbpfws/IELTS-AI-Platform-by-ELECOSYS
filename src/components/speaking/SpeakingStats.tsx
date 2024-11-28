import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Progress } from "@/components/ui/progress";

interface SpeakingStatsProps {
  userId: string;
}

interface MetricScore {
  pronunciation: number;
  grammar: number;
  vocabulary: number;
  fluency: number;
  coherence: number;
}

interface SessionStats {
  date: string;
  averageScore: number;
}

export default function SpeakingStats({ userId }: SpeakingStatsProps) {
  const [currentMetrics, setCurrentMetrics] = useState<MetricScore>({
    pronunciation: 0,
    grammar: 0,
    vocabulary: 0,
    fluency: 0,
    coherence: 0,
  });
  const [historicalData, setHistoricalData] = useState<SessionStats[]>([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalPracticeTime, setTotalPracticeTime] = useState(0);

  useEffect(() => {
    // Fetch current session metrics
    const fetchCurrentMetrics = async () => {
      try {
        const response = await fetch(`/api/speaking/metrics/current?userId=${userId}`);
        const data = await response.json();
        setCurrentMetrics(data);
      } catch (error) {
        console.error('Error fetching current metrics:', error);
      }
    };

    // Fetch historical data
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(`/api/speaking/metrics/history?userId=${userId}`);
        const data = await response.json();
        setHistoricalData(data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    // Fetch total statistics
    const fetchTotalStats = async () => {
      try {
        const response = await fetch(`/api/speaking/stats/total?userId=${userId}`);
        const data = await response.json();
        setTotalSessions(data.totalSessions);
        setTotalPracticeTime(data.totalPracticeTime);
      } catch (error) {
        console.error('Error fetching total stats:', error);
      }
    };

    fetchCurrentMetrics();
    fetchHistoricalData();
    fetchTotalStats();
  }, [userId]);

  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Speaking Progress</CardTitle>
          <CardDescription>Your IELTS speaking performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pronunciation</span>
                <span>{currentMetrics.pronunciation.toFixed(1)}/9.0</span>
              </div>
              <Progress value={currentMetrics.pronunciation * 11.11} />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Grammar</span>
                <span>{currentMetrics.grammar.toFixed(1)}/9.0</span>
              </div>
              <Progress value={currentMetrics.grammar * 11.11} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Vocabulary</span>
                <span>{currentMetrics.vocabulary.toFixed(1)}/9.0</span>
              </div>
              <Progress value={currentMetrics.vocabulary * 11.11} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fluency</span>
                <span>{currentMetrics.fluency.toFixed(1)}/9.0</span>
              </div>
              <Progress value={currentMetrics.fluency * 11.11} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Coherence</span>
                <span>{currentMetrics.coherence.toFixed(1)}/9.0</span>
              </div>
              <Progress value={currentMetrics.coherence * 11.11} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Progress Over Time</CardTitle>
          <CardDescription>Your speaking score trend</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 9]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="averageScore"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Practice Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{totalSessions}</p>
              <p className="text-sm text-muted-foreground">Total Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{Math.round(totalPracticeTime / 60)}</p>
              <p className="text-sm text-muted-foreground">Hours Practiced</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
