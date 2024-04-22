import React from "react";
import TopNavBlack from "../../components/TopNavBlack";

function ProcessSalary() {
    return (
        <div className="p-8">
            <div className="mt-[-32px] ml-[-32px] mr-[-32px]">
                <TopNavBlack />
            </div>
            <div className="mt-8 mb-4 text-left">
                <h1 className="text-2xl font-bold">Process salary</h1>
                <p className="text-lg">Generate salary slips for employees, individually or by batch.</p>
            </div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <label className="mr-2">Filters: Employee ID:</label>
                    <input type="text" className="border p-1 rounded" />
                    <label className="ml-4 mr-2">Job title:</label>
                    <input type="text" className="border p-1 rounded" />
                </div>
            </div>
        </div>
    )
}

export default ProcessSalary;