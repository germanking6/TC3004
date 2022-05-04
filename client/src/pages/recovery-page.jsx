
import React, { Component } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { useRef } from 'react';
import Graphic from '../components/Graphic';
//https://v4.mui.com/es/components/buttons/?msclkid=40af928eb62411ecaf95a1a6c922508a
//https://materialui.co/icon/expand-more

const RecoveryPage = () =>{
    //------TEMPORARY DATA FOR TESTING
    //table data titles to simulate database
   
    
    const contentRows = [
        {
            id: "1234",
            DateStart: "11/03",
            DateFinish:"12/03",
            1: 100,
            2: 200,
            3: 4000,
            total1: 6000,
            4: 500,
            5: 888,
            6:3838,
            total2: 8000,
            total: 10000,
            taxes: 100,
            recover: 30,
            state: true

        },
        {
            id: "1235",
            DateStart: "11/03",
            DateFinish:"12/03",
            1: 150,
            2: 2000,
            3: 4500,
            total1: 6000,
            4: 330,
            5: 30,
            6:3838,
            total2: 8000,
            total: 10000,
            taxes: 100,
            recover: 10,
            state: true

        }
    ];
 
      
      const columns = [
      
        { field: 'DateStart', headerName: 'Date of start', width: 150 },
        { field: 'DateFinish', headerName: 'Date of end', width: 150 },
        { field: '1', headerName: 'January', width: 150 },
        { field: '2', headerName: 'February', width: 150 },
        { field: '3', headerName: 'March', width: 150 },
        { field: 'total1', headerName: 'Quarter 1', width: 150 },
        { field: '4', headerName: 'April', width: 150 },
        { field: '5', headerName: 'May', width: 150 },
        { field: '6', headerName: 'June', width: 150 },
        { field: 'total2', headerName: 'Quarter 2', width: 150 },
        { field: 'total', headerName: 'Total', width: 150 },
        { field: 'recover', headerName: 'Total of billing', width: 150 },
        { field: 'state', headerName: 'Total plus taxes', width: 150 },
        { field: 'graphic', headerName: 'Graphic', width: 150 }
      ];
      const budget = [8137119, 9431691, 10266674,5000000];
      const recover = [8130000,1110900,7777777,4000000];
      
      
     
      
    
    //---------HTML
    return(
        
        <div style={{ height: 300, width: '100%' }}>
            
            
            <DataGrid rows={contentRows} columns={columns}/>
          
            <Graphic budget={budget} recover={recover} />
        </div>
        
            
           

    )
}
export default RecoveryPage;