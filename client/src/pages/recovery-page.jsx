import React, { Component } from 'react';
import { DataGrid} from '@mui/x-data-grid';
//import { useRef } from 'react';
import Graphic from '../components/Graphic';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';

//https://v4.mui.com/es/components/buttons/?msclkid=40af928eb62411ecaf95a1a6c922508a
//https://materialui.co/icon/expand-more

const RecoveryPage = () =>{
    //------TEMPORARY DATA FOR TESTING
    //table data titles to simulate database
   
    //obtenemos este objeto de una query
    const contentRows = [
        {
            id: "1234",
            DateStart: "11/03",
            DateFinish:"12/03",
            1: 100,
            2: 200,
            3: 4000,
            total1: 6000,
            recover1 : 5000,
            4: 500,
            5: 888,
            6:3838,
            total2: 8000,
            recover2 : 7200,
            total: 10000,
            taxes: 100,
            recover: 3000,
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
            recover1 : 5500,
            4: 330,
            5: 30,
            6:3838,
            total2: 8000,
            recover2 : 75000,
            total: 10000,
            taxes: 100,
            recover: 9000,
            state: true

        }
    ];
    //hacemos esto dentro de la query
    let a = [];
    const month = ["January", "February", "March","April","May","June","July","August", "September", "October", "November", "December"];
    const [ica, setIca] = useState(contentRows);
    const [titles, setTitles] = useState();
    const [months, setMonths] = useState();
    const [recover, setRecover] = useState();
    const [total, setTotal] = useState();

 
    
    let rec = [];
    let tot = [];
    let q1 = [];
    let q2 = [];
    let q3 = [];
    let q4 = [];
    let rec1 = [];
    let rec2 = [];
    let rec3 = [];
    let rec4 = [];
    const icas = () => {
       console.log(ica);
       ica.map((item,index)=>{
            a[index]= item.id;
            q1[index] = item.total1;
            rec1[index] = item.recover1;
            if(item.total2){
                q2[index] = item.total2;
                rec2[index] = item.recover2;
            }
            if(item.total3){
                q3[index] = item.total3;
                rec3[index] = item.recover3;
            }
            if(item.total4){
                q4[index] = item.total4;
                rec4[index] = item.recover4;
            }
            
       });
       
       
       let arr = [0,0,0,0];
       let arr1 = [0,0,0,0];
       for (var i = 0; i < q1.length; i++) {        
            arr[0] = arr[0] + q1[i];
            arr1[0] = arr1[0] + rec1[i];
        }
        console.log(arr[0]);
        if(q2.length > 0){
            for (var i = 0; i < q2.length; i++) {
            
                arr[1] = arr[1] + q2[i];
                arr1[1] = arr1[1] + rec2[i];
                
            }
    
        }
        if(q3.length > 0){
            for (var i = 0; i < q3.length; i++) {
            
                arr[2] = arr[2] + q3[i];
                arr1[2] = arr1[2] + rec3[i];
                
            }
    
        }
        if(q4.length > 0){
            for (var i = 0; i < q4.length; i++) {
            
                arr[3] = arr[3] + q4[i];
                arr1[3] = arr1[3] + rec4[i];
                
            }
    
        }
        //console.log(arr);
       //console.log(arr1);
       setTitles(a);
       setRecover(arr1);
       setTotal(arr);
       //console.log(total);
       //console.log(recover);
    
    } 
    useEffect(() => {
        icas();
        
     }, []);
    
     const [inputMonth, setInputMonth] = useState(null);
     const [inputRecover, setInputRecover] = useState(null);
     const [InputNumber, setInputNumber] = useState("");
    
    
    
      const columns = [
        { field: 'id', headerName: 'Ica', width: 150 },
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
        { field: 'state', headerName: 'Total plus taxes', width: 150 }
      ];
      //const budget = [8137119, 9431691, 10266674,5000000];
      //const recover = [8130000,1110900,7777777,4000000];

      
      //update value of quarter1total quarter2 total or quarter3 total y taxes y recover y el mes 
      const addRecovery = (event) =>{
            console.log(event);
      }
    //---------HTML
    return(
        
        <div style={{ height: 300, width: '100%' }}>          
                <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Grid className='input'>
                        <Autocomplete
                            id="clear-on-escape"
                            clearOnEscape
                            options={titles}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} id="outlined-basic" label="Select the ica you want to recover in" variant="standard"/>}
                        />
                    </Grid>
                    <Grid className='input'>
                        <Autocomplete
                            id="clear-on-escape"
                            clearOnEscape
                            options={month}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} id="outlined-basic" label="Select month of recovery" variant="standard"/>}
                        />
                    </Grid>
                <Grid>
                    <IconButton color = "secondary" size="small" id="addRecovery" >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/></svg>
                        
                    </IconButton>
                        <Button variant="outlined" size="small" onClick = {addRecovery}>Add recovery</Button>
                    </Grid>
                </Grid>
            
            <DataGrid rows={contentRows} columns={columns}/>
            
          
            <Graphic budget={total} recover={recover} />
        </div>
        
            
           

    )
}
export default RecoveryPage;