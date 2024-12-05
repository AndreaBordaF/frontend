import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Customized, Rectangle, CustomizedProps  } from 'recharts';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';

const chartData = [
    { day: "Lunes 23", sh: 15, eh: 16, requests: 6 },
    { day: "Martes 24", sh: 8, eh: 9, requests: 2 },
    { day: "Miércoles 25", sh: 10, eh: 12, requests: 8 },
    { day: "Jueves 26", sh: 13, eh: 15, requests: 10 },
    { day: "Viernes 27", sh: 9, eh: 11, requests: 5 },
  ];
  
  // Componente para dibujar rectángulos personalizados
  const CustomizedRectangle = ({ yAxisMap, xAxisMap, formattedGraphicalItems }: CustomizedProps<any, any>) => {
    const firstSeries = formattedGraphicalItems[0];
  
    return firstSeries?.props?.points.map((point: { x: number; y: number }, index: number) => {
      const data = chartData[index];
      const startHour = data.sh;
      const endHour = data.eh;

      const yScale = yAxisMap[0]?.scale; 

      const x = point.x;
      const yStart = yScale(startHour);
      const yEnd = yScale(endHour);
      const height = yStart - yEnd;
  
      return (
        <Rectangle
          key={index}
          x={x}
          y={yStart}
          width={10}
          height={Math.abs(height)}
          fill="#2FAF7E"
        />
      );
    });
  };


  const getTotalRequests = () => {
    return chartData.reduce((acc, { requests }) => acc + requests, 0);
  }

export default function RequestChart() {

    return (
      <Box
        sx={{
            width: "100%",
            paddingY: 2,
            paddingRight: 6,
            backgroundColor: "#fff",
            borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontSize={20} color="#C8CCD0" marginX={3} gutterBottom>
          {getTotalRequests()} Solicitudes Ingresadas Recientemente
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
            data={chartData}
              margin={{
                right: 20,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickFormatter={(day) => day}
                tick={{ fontSize: 12 }}
                />
              <YAxis
                domain={[8, 20]}
                tickFormatter={(hour) => `${hour}:00`}
                type="number"
                allowDecimals={false}
                interval={0} 
                tick={{fontSize: 12}}
                reversed
              />
              <Tooltip
                formatter={(value, name, props) => {
                  const { payload } = props || {};
                  if (payload) {
                    return [payload.requests, "Solicitudes"];
                  }
                  return [value, name];
                }}
                labelFormatter={(label, payload) => {
                    if (payload && payload.length > 0) {
                      const { sh, eh } = payload[0].payload;
                      return `${label} - ${sh}:00-${eh}:00`;
                    }
                    return label;
                  }}
                />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="sh"
                name="Solicitudes"
                stroke="#2FAF7E"
                dot={{ stroke: "#2FAF7E", strokeWidth: 2 }}
              />
              <Customized component={CustomizedRectangle} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
};

