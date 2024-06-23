import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { Paper, Typography } from '@mui/material';

const TemperatureChart = ({ chartData }) => {
	return (
		<Paper sx={{ width: '100%', height: '100%', padding: 4 }}>
			<Typography variant="h6" gutterBottom>
				Temperature Over the Last Year
			</Typography>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart
					data={chartData}
					margin={{
						top: 10, right: 30, left: 0, bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="XAxisData" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="lineData" stroke="#8884d8" activeDot={{ r: 8 }} />
				</LineChart>
			</ResponsiveContainer>
		</Paper>
	);
};

export default TemperatureChart;
