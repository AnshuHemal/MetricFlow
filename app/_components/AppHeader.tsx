import React from 'react'


function AppHeader() {
    return (
        <div className='p-4 shadow-sm flex items-center justify-between w-full '>
            <div className="flex items-center">
                <h1 className="text-xl font-semibold">MetricFlow Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
                {/* Add any header actions here */}
            </div>
        </div>
    )
}

export default AppHeader