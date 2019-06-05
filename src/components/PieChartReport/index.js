import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Tooltip } from 'recharts';
import Select from 'react-select';
import sizeMe from 'react-sizeme';
import { getColor } from '../../utils.js';
import './style.scss';

const renderToolTip = content => content.payload && content.payload.length > 0 && content.payload[0] && content.payload[0].payload && (
    <div className="toolTip">
        { content.payload[0].payload.value }
    </div>
);

const renderLabel = content => {
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        label
    } = content;
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            className="pieLabel"
            x={x}
            y={y}
            fill="#8884d8"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {label && label.substring(0, 10)}{label.length > 10 && '...'}
        </text>
    );
};

class PieChartReport extends Component {
    constructor() {
        super();
        this.state = {
            categoryOptions: [
                { label: 'Clients', value: 'clients' },
                { label: 'Countries', value: 'countries' }
            ],
            valueOptions: [
                { label: 'Monetary', value: 'monetary' },
                { label: 'Quantity', value: 'quantity' }
            ]
        };
    }

    componentDidMount() {
        const values = this.getPieChartValues(this.props.invoices);
        this.setState({ values });
    }

    getPieChartValues = invoices => invoices.reduce((acc, current) => {
        const { TotalSale, Qty, ShipFromID, Client } = current;
        return {
            countries: {
                ...acc.countries,
                [ShipFromID]: {
                    quantity: (acc.countries[ShipFromID] && acc.countries[ShipFromID].quantity) || 0 + Qty,
                    monetary: (acc.countries[ShipFromID] && acc.countries[ShipFromID].monetary) || 0 + TotalSale
                }
            },
            clients: {
                ...acc.clients,
                [Client]: {
                    quantity: (acc.clients[Client] && acc.clients[Client].quantity) || 0 + Qty,
                    monetary: (acc.clients[Client] && acc.clients[Client].monetary) || 0 + TotalSale
                }
            }
        };
    }, { countries: {}, clients: {} });

    getDataByType(values, category, value) {
        let dataTypes = this.isEmpty(values, category, value) ? [{ label: 'Placeholder', value: 1, fill: '#DDD' }] : Object.keys(values[category.value]).map((label, i) => ({ label, value: values[category.value][label][value.value], fill: getColor(i) }));

        if (dataTypes.length > 3) {
            const totalValue = dataTypes.reduce((acc, data) => data.value + acc, 0);
            const reducedDataTypes = dataTypes.sort((a, b) => a.value < b.value ? 1 : -1).slice(0, 3).filter(data => data.value / totalValue > 0.05);
            console.log(`totalValue : ${totalValue}`);
            const reducedValue = reducedDataTypes.reduce((acc, data) => data.value + acc, 0);
            console.log(`reducedValue: ${reducedValue}`);
            const restValue = totalValue - reducedValue;
            console.log(restValue);
            reducedDataTypes.push({ label: 'Rest', value: restValue, fill: '#DDD' });
            dataTypes = reducedDataTypes;
        }

        return dataTypes;
    }

    isEmpty(values, category, value) {
        return !(values && category && category.value && value && value.value);
    }

    render() {
        const { values, categoryOptions, valueOptions, selectedCategory, selectedValue } = this.state;
        const data = this.getDataByType(values, selectedCategory, selectedValue);
        const empty = this.isEmpty(values, selectedCategory, selectedValue);

        const { width } = this.props.size;
        const pieHeight = Math.min(width, 500);

        return (
            <div className="PieChartReport">
                <div>
                    <Select
                        className="typeSelector"
                        placeholder="Category"
                        onChange={input => this.setState({ selectedCategory: input })}
                        value={selectedCategory}
                        options={categoryOptions}
                        styles={({
                            control: provided => ({ ...provided, 'font-size': '14px' }),
                            option: provided => ({ ...provided, 'font-size': '14px' })
                        })}
                    />
                    <Select
                        className="typeSelector"
                        placeholder="Value"
                        onChange={input => this.setState({ selectedValue: input })}
                        value={selectedValue}
                        options={valueOptions}
                        styles={({
                            control: provided => ({ ...provided, 'font-size': '14px' }),
                            option: provided => ({ ...provided, 'font-size': '14px' })
                        })}
                    />
                </div>
                { empty && <div className="promptUserPieChart">Please Chose Category and Value type</div> }
                <PieChart className="pieChart" width={width} height={pieHeight}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={pieHeight / 3}
                        label={!empty && renderLabel}
                    />
                    { !empty && <Tooltip content={renderToolTip} /> }
                </PieChart>
            </div>
        );
    }
}

PieChartReport.propTypes = {
    invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
    size: PropTypes.any.isRequired
};

export default sizeMe()(PieChartReport);
