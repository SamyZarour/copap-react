import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

export const renderField = config => {
    const {
        input,
        isRequired,
        label,
        placeholder,
        type,
        readOnly,
        meta: {
            touched,
            error,
            warning
        }
    } = config;

    return (
        <div className="field fieldText">
            { label && <label className="field-label">{isRequired && <span className="required-indicator">*</span>}{label}</label> }
            <input {...input} placeholder={placeholder} type={type} disabled={readOnly} />
            {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="warning">{warning}</span>))}
        </div>
    );
};

export const renderFieldSelect = config => {
    const {
        input,
        onChange,
        isRequired,
        options,
        label,
        placeholder,
        readOnly,
        meta: {
            touched,
            error,
            warning
        }
    } = config;

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            background: state.isDisabled ? '#dddddd' : 'transparent',
            'font-size': '14px',
            border: '2px solid #5e686b !important',
            // This line disable the blue border
            boxShadow: state.isFocused ? 0 : 0,
            '&:hover': {
                border: '2px solid #5e686b !important'
            }
        }),
        valueContainer: provided => ({
            ...provided,
            padding: '10px',
            height: '41px'
        }),
        dropdownIndicator: provided => ({
            ...provided,
            color: '#757575'
        }),
        indicatorSeparator: provided => ({
            ...provided,
            background: '#757575'
        }),
        option: provided => ({
            ...provided,
            background: 'white',
            color: 'black',
            'font-size': '14px',
            '&:hover': {
                background: '#CCC'
            }
        }),
        menuList: provided => ({
            ...provided,
            background: 'white'
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: state.isDisabled ? '#CCC' : 'black',
            top: '85%'
        })
    };

    return (
        <div className="field fieldSelect">
            { label && <label className="field-label">{isRequired && <span className="required-indicator">*</span>}{label}</label> }
            <Select
                {...input}
                name={input.name}
                placeholder={placeholder || ''}
                options={options}
                value={input.value && options.find(option => option.value === input.value)}
                onChange={value => onChange ? onChange(value) : input.onChange(value.value)}
                onBlur={value => input.onBlur(value.value)}
                styles={customStyles}
                isDisabled={readOnly}
            />
            {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="warning">{warning}</span>))}
        </div>
    );
};

export const renderFieldTextBox = config => {
    const {
        input,
        isRequired,
        label,
        placeholder,
        readOnly,
        meta: {
            touched,
            error,
            warning
        }
    } = config;

    return (
        <div className="field">
            { label && <label className="field-label">{isRequired && <span className="required-indicator">*</span>}{label}</label> }
            <textarea {...input} placeholder={placeholder} disabled={readOnly} />
            {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="warning">{warning}</span>))}
        </div>
    );
};

export const renderFieldDatePicker = config => {
    const {
        input,
        isRequired,
        label,
        placeholder,
        readOnly,
        widthLayout,
        meta: {
            touched,
            error,
            warning
        }
    } = config;

    const withPortal = widthLayout < 450;

    return (
        <div className="field">
            { label && <label className="field-label">{isRequired && <span className="required-indicator">*</span>}{label}</label> }
            <div className="field-date-picker">
                <DatePicker
                    {...input}
                    onChangeRaw={input.onChange}
                    dateForm="MM/DD/YYYY"
                    selected={input.value ? new Date(input.value) : null}
                    placeholderText={placeholder}
                    disabled={readOnly}
                    autoComplete="off"
                    withPortal={withPortal}
                />
                {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="warning">{warning}</span>))}
                <i className="fa fa-calendar"></i>
            </div>
        </div>
    );
};
