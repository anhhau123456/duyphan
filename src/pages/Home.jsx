import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import { ClientSideRowModelModule, themeAlpine } from 'ag-grid-community';

export default function MyGrid() {
    const rowData = [
        { name: 'John', age: 24, country: 'USA' },
        { name: 'Alice', age: 30, country: 'Canada' },
        { name: 'Bob', age: 27, country: 'UK' },
        { name: 'Lisa', age: 35, country: 'Germany' },
    ];

    const columnDefs = [
        { headerName: 'Name', field: 'name', checkboxSelection: true, headerCheckboxSelection: true },
        { headerName: 'Age', field: 'age' },
        { headerName: 'Country', field: 'country' },
      ];


    const theme = themeAlpine
        .withParams({
            browserColorScheme: "light",
            headerFontSize: 14
        });

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                modules={[ClientSideRowModelModule]}
                theme={theme}
                animateRows={true}
                pagination={true}
                paginationPageSize={2}
                rowSelection="multiple"
            />
        </div>
    );
  }