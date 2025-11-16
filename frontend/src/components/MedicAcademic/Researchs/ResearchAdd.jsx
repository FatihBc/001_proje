import React from 'react'
import FormAdd from './FormAdd'

function ResearchAdd({ className }) {
    return (
        <div className={`min-w-xs mr-[10px] ${className}`}>
            <div className="flex items-center text-xl justify-center h-14 mx-1 my-1 px-3 rounded-md bg-[#094857] text-[#ffffff]"
            >Add Research</div>
            <div className="mx-1 my-1" >
                <FormAdd />
            </div>
        </div>
    )
}

export default ResearchAdd
