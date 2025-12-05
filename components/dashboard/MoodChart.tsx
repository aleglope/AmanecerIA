import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "../../context/LanguageContext";

interface MoodData {
  created_at: string;
  mood_label: string;
}

interface MoodChartProps {
  data: MoodData[];
}

const MOOD_VALUES: Record<string, number> = {
  Radiante: 5,
  Feliz: 4,
  Bien: 3,
  Cansado: 2,
  Triste: 1,
  Ansiedad: 1,
  Enojado: 1,
  Estresado: 1,
};

export const MoodChart: React.FC<MoodChartProps> = ({ data }) => {
  const { t } = useTranslation();

  const chartData = useMemo(() => {
    // Take last 7 entries and reverse to show chronological order
    return [...data].reverse().map((entry) => ({
      date: new Date(entry.created_at).toLocaleDateString(undefined, {
        weekday: "short",
      }),
      value: MOOD_VALUES[entry.mood_label] || 3, // Default to 'Bien' if unknown
      label: t(`moodLabels.${entry.mood_label}`),
    }));
  }, [data, t]);

  if (data.length < 2) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-500 text-sm italic">
        {t("dashboard.moodChart.notEnoughData")}
      </div>
    );
  }

  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
          />
          <YAxis domain={[0, 6]} hide />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value: number, name: string, props: any) => [
              props.payload.label,
              t("dashboard.moodChart.mood"),
            ]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8B5CF6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorMood)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
