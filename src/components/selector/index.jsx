import React from "react";
import Select from 'react-select'

function Selector(props) { 
    const { name, data, extra, multi = "true", defaultId = [] } = props

    const options = data.map((option) => ({
        value: option.id,
        label: option.name,
    }));

    const defaultValues = options.filter((option) => defaultId.includes(option.value));

    return (
        <>
            <div className={`${extra}`}>
                <label
                    className="text-sm text-navy-700 dark:text-white ml-3 font-bold"
                >
                    {name}
                </label>
                <Select
                    placeholder={`選擇${name}`}
                    options={options}
                    isMulti={multi}
                    defaultValue={defaultValues}
                    isSearchable="true"
                    classNamePrefix="my-react-select"
                    className="text-md h-12 w-full rounded-xl bg-white/0 py-3 my-react-select-container overflow: auto"
                />
            </div>
        </>
    )
}

export default Selector;