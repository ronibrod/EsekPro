import React from 'react';
import { useDrawingArea, useXScale, useYScale } from '@mui/x-charts/hooks';
import { LineChart, lineElementClasses, markElementClasses } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

export const CustomOverlay = () => {
  const ratios = [0.2, 0.8, 0.6, 0.5];

  return (
    <BarChart
      height={350}
      loading
      xAxis={[
        { scaleType: 'band', data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] },
      ]}
      slots={{
        loadingOverlay: ({ xScale, yScale, drawingArea }) => {
          if (!xScale || !yScale || !drawingArea) {
            // If scales or drawing area is not available, don't attempt to render the overlay
            return null;
          }

          const bandWidth = xScale.bandwidth();
          const [bottom, top] = yScale.range();
          const { left, width, height } = drawingArea;

          return (
            <g>
              {xScale.domain().map((item, index) => {
                const ratio = ratios[index % ratios.length];
                const barHeight = ratio * (bottom - top);

                return (
                  <rect
                    key={item}
                    x={xScale(item)}
                    y={bottom - barHeight}
                    width={bandWidth}
                    height={barHeight}
                    fill="#d3d3d3"
                    opacity={0.7}
                  />
                );
              })}
              <text
                x={left + width / 2}
                y={top + height / 2}
                textAnchor="middle"
                fill="#000"
                fontSize="16"
              >
                Loading data...
              </text>
            </g>
          );
        },
      }}
      series={[]}
      margin={{ top: 10, right: 10, left: 25, bottom: 25 }}
    />
  );
}

export const PieChartComponent = ({ displayedChartData, XAxisData }) => {
  const firstSeries = displayedChartData[0];

  const pieData = XAxisData.map((date, index) => {
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Format date as yyyy-mm-dd
    return {
      id: formattedDate,  // Use the formatted date as the ID
      value: firstSeries.data[index],  // Use the corresponding value from the first series
      label: formattedDate,  // Label it with the formatted date
      color: firstSeries.color,  // Use the color from the first series
    };
  });

  return (
    <PieChart
      height={350}
      series={[
        {
          data: pieData,
          id: 'pieDataId',
          // arcLabel: (item) => `${item.label}: ${item.value}`,
          highlightScope: { highlighted: 'item', faded: 'global' },
          arcLabelMinAngle: 10,
          innerRadius: 25,
          outerRadius: 160,
          paddingAngle: 2,
          cornerRadius: 3,
        },
      ]}
    />
  );
};

export const BarChartComponent = ({ displayedChartData, XAxisData }) => (
  <BarChart
    height={350}
    series={displayedChartData.filter(series => series.isChecked).map((series, index) => ({
      name: series.label,
      data: series.data,
      color: series.color,
      id: `barDataId-${index}`,
    }))}
    xAxis={[{
      scaleType: 'band',
      data: XAxisData,
      valueFormatter: (timestamp, context) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0'); // Ensure day is two digits
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure month is two digits
        const year = String(date.getFullYear()).slice(-2);
        if (context.location === 'tooltip') {
          return `${day}/${month}/${year}`;
        }
        return `${day}/${month}`;
      }
    }]}
    grid={{ vertical: true, horizontal: true }}
    bottomAxis={{
      labelStyle: {
        fontSize: 12,
        transform: 'translateY(45px)',
      },
      tickLabelStyle: {
        angle: 45,
        textAnchor: 'start',
        fontSize: 10,
      },
    }}
  />
);

export const ScatterChartComponent = ({ displayedChartData, XAxisData }) => (
  <ScatterChart
    height={350}
    series={displayedChartData.filter(series => series.isChecked).map((series, index) => ({
      name: series.label,
      data: series.data.map((value, idx) => ({
        x: XAxisData[idx], // Assuming XAxisData is already in timestamp or numeric format
        y: Number(value),
      })).filter(point => !isNaN(point.y)), // Filter out NaN values
      color: series.color,
      id: `scatterDataId-${index}`,
    }))}
    xAxis={[{
      scaleType: 'time',
      data: XAxisData, // Ensure this is an array of timestamps
      valueFormatter: (timestamp, context) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0'); // Ensure day is two digits
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure month is two digits
        const year = String(date.getFullYear()).slice(-2);
        if (context.location === 'tooltip') {
          return `${day}/${month}/${year}`;
        }
        return `${day}/${month}`;
      }
    }]}
    grid={{ vertical: true, horizontal: true }}
    bottomAxis={{
      labelStyle: {
        fontSize: 12,
        transform: 'translateY(45px)',
      },
      tickLabelStyle: {
        angle: 45,
        textAnchor: 'start',
        fontSize: 10,
      },
    }}
  />
);

export const LineChartComponent = ({ displayedChartData, XAxisData, info }) => {
  return (
    <LineChart
      height={350}
      series={displayedChartData}
      xAxis={[{
        scaleType: 'time',
        data: XAxisData,
        valueFormatter: (timestamp, context) => {
          const date = new Date(timestamp);
          const day = String(date.getDate());
          const month = String(date.getMonth() + 1);
          const year = String(date.getFullYear()).slice(-2);
          if (context.location === 'tooltip') {
            // return String(timestamp);
            return `${day}/${month}/${year}`;
          }

          return `${day}/${month}`;
        }
      }]}
      grid={{ vertical: true, horizontal: true }}
      sx={{
        [`.${lineElementClasses.root}`]: { strokeWidth: 1 },
        '.MuiLineElement-series-lineDataId': { strokeWidth: info.lineLength > 50 ? 0.4 : 1 },
        [`.${markElementClasses.root}`]: { display: 'none' },
      }}
      bottomAxis={{
        labelStyle: {
          fontSize: 12,
          transform: `translateY(45px)`
        },
        tickLabelStyle: {
          angle: 45,
          textAnchor: 'start',
          fontSize: 10,
        },
      }}
    />
  );
};
