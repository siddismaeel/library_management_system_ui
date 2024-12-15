import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FaPlus } from 'react-icons/fa';

function CustomTable({ columns, data , action = ()=>{}}) {


    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = data.filter((row) =>
        Object.values(row)
            .join(' ') 
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    const Actions = (
        <div className='position-static w-100'>
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <input type='text'
                    className='form-control my-2'
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{ marginBottom: '20px', width: '300px' }}
                />

                <Button className='my-2' onClick={action}><FaPlus/></Button>
            </div>
        </div>
    )

    return (<div>


        <DataTable
            className='table'
            title={Actions}
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            pointerOnHover
            sortable={true}
            selectableRows={false}
            selectableRowsHighlight
            onSelectedRowsChange={(state) =>{}}
        />

    </div>
    )
}

export default CustomTable
