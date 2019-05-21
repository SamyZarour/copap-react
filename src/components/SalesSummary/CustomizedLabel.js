import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const RADIAN = Math.PI / 180;

const CustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

CustomizedLabel.propTypes = {
    cx: PropTypes.any.isRequired,
    cy: PropTypes.any.isRequired,
    midAngle: PropTypes.any.isRequired,
    innerRadius: PropTypes.any.isRequired,
    outerRadius: PropTypes.any.isRequired,
    percent: PropTypes.any.isRequired
};

export default CustomizedLabel;
