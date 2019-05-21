import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import CustomizedLabel from './CustomizedLabel';
import CustomizedTooltip from './CustomizedTooltip';
import './style.scss';

const PieChartCustom = () => {
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="PieChart">
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={CustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${entry}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip content={CustomizedTooltip} />
            </PieChart>
        </div>
    );
};

PieChartCustom.propTypes = {};

export default PieChartCustom;
