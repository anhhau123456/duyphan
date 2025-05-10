import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import { ClientSideRowModelModule, themeQuartz } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function MyGrid() {
    const [rowData] = useState([
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxster', price: 72000 },
    ]);

    const [columnDefs] = useState([
        {
            headerName: '',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            width: 50,
        },
      { field: 'make' },
      { field: 'model' },
      { field: 'price' },
    ]);

    const theme = themeQuartz
        .withParams({
            browserColorScheme: "light",
            headerFontSize: 14
        });

    return (
        <div>
            <div className="ag-theme-alpine w-screen" style={{ height: 400, width: '100%' }}>
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
        </div>
    );
  }