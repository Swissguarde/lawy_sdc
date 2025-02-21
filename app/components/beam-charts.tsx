import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SpanCriticalPoints } from "../utils/criticalBMSF";

interface BMSFChartsProps {
  criticalPoints: SpanCriticalPoints[];
}

export default function BeamCharts({ criticalPoints }: BMSFChartsProps) {
  // Combine all critical points from all spans
  const allPoints = criticalPoints.flatMap((span) => span.criticalPoints);

  // Sort points by position to ensure correct order
  const sortedPoints = allPoints.sort((a, b) => a.position - b.position);

  // Transform data for Recharts
  const chartData = sortedPoints.map((point) => ({
    position: point.position,
    shearForce: point.shearForce,
    bendingMoment: point.bendingMoment,
  }));

  // Extract unique positions for XAxis ticks
  const uniquePositions = Array.from(
    new Set(chartData.map((item) => item.position))
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-blue-400">◆</span>
          Shear Force Diagram
        </h3>
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 60, bottom: 30 }}
            >
              <defs>
                <linearGradient
                  id="shearForceGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="position"
                type="number"
                ticks={uniquePositions}
                domain={["dataMin", "dataMax"]}
                tickFormatter={(value) => value.toFixed(2)}
                label={{
                  value: "Position (m)",
                  position: "insideBottom",
                  offset: -10,
                  fill: "#94a3b8",
                }}
                stroke="#94a3b8"
              />
              <YAxis
                label={{
                  value: "Force (kN)",
                  angle: -90,
                  position: "insideLeft",
                  offset: -45,
                  fill: "#94a3b8",
                }}
                stroke="#94a3b8"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(17, 24, 39, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                labelStyle={{ color: "#94a3b8" }}
              />
              <Area
                type="monotone"
                dataKey="shearForce"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#shearForceGradient)"
                fillOpacity={1}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-purple-400">◆</span>
          Bending Moment Diagram
        </h3>
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 60, bottom: 30 }}
            >
              <defs>
                <linearGradient
                  id="bendingMomentGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="position"
                type="number"
                ticks={uniquePositions}
                domain={["dataMin", "dataMax"]}
                tickFormatter={(value) => value.toFixed(2)}
                label={{
                  value: "Position (m)",
                  position: "insideBottom",
                  offset: -10,
                  fill: "#94a3b8",
                }}
                stroke="#94a3b8"
              />
              <YAxis
                label={{
                  value: "Moment (kNm)",
                  angle: -90,
                  position: "insideLeft",
                  offset: -45,
                  fill: "#94a3b8",
                }}
                stroke="#94a3b8"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(17, 24, 39, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                labelStyle={{ color: "#94a3b8" }}
              />
              <Area
                type="monotone"
                dataKey="bendingMoment"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#bendingMomentGradient)"
                fillOpacity={1}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
