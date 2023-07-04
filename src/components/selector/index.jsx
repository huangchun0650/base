import React from "react";
import Select from 'react-select'

function Selector(props) { 
    const { name, data, extra, multi="true", defaultId=[] } = props

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
                        options={options}
                        isMulti={multi}
                        defaultValue={defaultValues}
                        className="text-xl h-12 w-full sm-max:w-1/2 rounded-xl bg-white/0 py-3"
                    />
            </div>
        </>
    )
}

export default Selector;