import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { themeMaterial } from 'ag-grid-community';

import InputPopup from '../components/InputPopup'

export default function MyGrid() {
    const [rowData, setRowData] = useState([]);

    const colDefs = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            pinned: 'left',
            field: 'ID',
            headerName: 'ID',
        },
        { field: "Name" },
        { field: "Phone Number" },
        { field: "Location" }
    ]

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });

            // Get first sheet
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert to JSON
            const rows  = XLSX.utils.sheet_to_json(worksheet);
            setRowData(rows);
            sendToBackend(rows);  
        };

        reader.readAsBinaryString(file);
        
    };

    const sendToBackend = async (rows) => {
        try {
            const res = await fetch('http://localhost:5000/upload-xlsx', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: rows }),   // rows = array of objects
            });
            const json = await res.json();
            console.log('Server reply:', json);
        } catch (err) {
            console.error('Upload failed:', err);
        }
    };

    const aggridTheme = themeMaterial
        .withParams({
            backgroundColor: "#F7EFEF",
            borderColor: "#0E101026",
            browserColorScheme: "inherit",
            headerBackgroundColor: "#413636",
            headerFontSize: 16,
            headerFontWeight: 700,
            headerTextColor: "#F9FDFF"
        });

    return (
        <div className="ag-theme-alpine h-[calc(100vh-10rem)] " style={{ width: '100%' }}>
            <div className="ag-grid-custom">
                <AgGridReact
                    theme={aggridTheme}
                    rowData={rowData}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={20}
                    rowSelection={"multiple"}
                />
            </div>
            
        </div>
    );
  }