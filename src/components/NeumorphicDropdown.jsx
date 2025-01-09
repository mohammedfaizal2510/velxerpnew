import React from 'react';
import Select from 'react-select';

const NeumorphicDropdown = ({ options, placeholder, onChange, value }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#dde1e7",
      borderRadius: "20px",
      border: "none",
    //   boxShadow: state.isFocused
    //     ? "inset -5px -5px 10px rgba(255, 255, 255, 0.5), inset 5px 5px 10px rgba(94, 104, 121, 0.3), -10px -10px 25px rgba(255, 255, 255, 1), 10px 10px 25px rgba(94, 104, 121, 0.7)"
    //     : "inset -5px -5px 10px rgba(255, 255, 255, 0.5), inset 5px 5px 10px rgba(94, 104, 121, 0.3), -10px -10px 20px rgba(255, 255, 255, 0.8), 10px 10px 20px rgba(94, 104, 121, 0.5)",
        boxShadow: state.isFocused
        ? "4px 4px 6px 0 rgba(255,255,255,.5),-4px -4px 6px 0 rgba(116, 125, 136, .2), inset -4px -4px 6px 0 rgba(255,255,255,.5),inset 4px 4px 6px 0 rgba(116, 125, 136, .3);"
        : "4px 4px 6px 0 rgba(255,255,255,.5),-4px -4px 6px 0 rgba(116, 125, 136, .2), inset -4px -4px 6px 0 rgba(255,255,255,.5),inset 4px 4px 6px 0 rgba(116, 125, 136, .3);",
      padding: "5px",
      transition: "box-shadow 0.3s ease",
      cursor: "pointer",
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isFocused ? "#f5f5f5" : "#dde1e7",
      color: "#5e6879",
      cursor: "pointer",
      padding: "10px",
    }),
    menu: (provided) => ({
      ...provided,
      background: "#dde1e7",
      borderRadius: "15px",
      boxShadow: "5px 5px 10px rgba(94, 104, 121, 0.3), -5px -5px 10px rgba(255, 255, 255, 0.8)",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#2d313a",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#1f2127",
    }),
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      placeholder={placeholder || "Select an option"}
      onChange={onChange}
      value={value}
      isClearable={true}
    />
  );
};

export default NeumorphicDropdown;
