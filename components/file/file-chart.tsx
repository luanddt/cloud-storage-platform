"use client";

import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";

import {
  calculatePercentage,
  convertFileSize,
} from "@/lib/utils";

const chartConfig = {
  used: {
    label: "Used",
    color: "#ffffff",
  },
} satisfies ChartConfig;

type FileChartProps = {
  used?: number;
  total?: number;
};

const FileChart = ({
  used = 0,
  total = 2 * 1024 * 1024 * 1024
}: FileChartProps) => {
  const percentage = Math.min(
    Number(calculatePercentage(used)),
    100
  );

  const chartData = [
    {
      name: "used",
      value: percentage,
      fill: "var(--color-used)",
    },
  ];

  return (
    <Card className="flex items-center rounded-20 bg-primary p-5 text-primary-foreground md:flex-col xl:flex-row">
      <CardContent className="flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-55"
        >
          <RadialBarChart
            data={chartData}
            innerRadius={82}
            outerRadius={110}
            startAngle={90}
            endAngle={90 - percentage * 3.6}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={999}
              background={{
                fill: "rgba(255,255,255,.18)",
              }}
            />

            <PolarRadiusAxis
              tick={false}
              tickLine={false}
              axisLine={false}
            >
              <Label
                content={({ viewBox }) => {
                  if (
                    !viewBox ||
                    !("cx" in viewBox) ||
                    !("cy" in viewBox)
                  ) {
                    return null;
                  }

                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        className="fill-white text-4xl font-bold"
                      >
                        {percentage}%
                      </tspan>

                      <tspan
                        x={viewBox.cx}
                        dy={24}
                        className="fill-white/70 text-sm"
                      >
                        Space used
                      </tspan>
                    </text>
                  );
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardHeader className="flex-1 items-start px-3 py-0 sm:px-5 lg:p-3 xl:pr-5">
        <CardTitle className="h3 font-bold">
          Available Storage
        </CardTitle>

        <CardDescription className="subtitle-1 mt-2 text-white/70">
          {convertFileSize(used)} / {convertFileSize(total)}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default FileChart;