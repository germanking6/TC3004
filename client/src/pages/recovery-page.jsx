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
import { Input } from '@mui/material';

//insert into ICA_DATA (ID, "DateStart", "DateFinish", "1", "2", "3", "4", "5", "6", TOTAL1, RECOVER1, TOTAL2, RECOVER2, TOTAL, TAXES, RECOVER) VALUES ('1234', to_date('2020-12-17', 'yyyy-mm-dd'),to_date('2021-12-17', 'yyyy-mm-dd'),150,2000,4500,6000,5500,330,30,3838,8000,75000,10000,100,9000);

//https://v4.mui.com/es/components/buttons/?msclkid=40af928eb62411ecaf95a1a6c922508a
//https://materialui.co/icon/expand-more

const RecoveryPage = () =>{
    //fetch
    const cargarDatos = async () => {
        try{
            const url = "http://127.0.0.1:5000/recoveryPage";
            const res = await fetch(url);
            const datos = await res.json();
            console.log(datos);
            return datos
        } catch(err) {
          console.log(err)
        }
        
      };
    const [ica, setIca] = useState();
    useEffect(async () => {
          icas();
        
        
     }, []);
   
   
  
    const month = ["January", "February", "March","April","May","June","July","August", "September", "October", "November", "December"];

    const [titles, setTitles] = useState();
    //const [months, setMonths] = useState();
    const [recover, setRecover] = useState();
    const [total, setTotal] = useState();

    let q1 = [];
    let q2 = [];
    let q3 = [];
    let q4 = [];
    let rec1 = [];
    let rec2 = [];
    let rec3 = [];
    let rec4 = [];
    let op = [];
    const icas = async () => {
        
        let arrt =[]
        let a = await cargarDatos();
        await setIca(await a.data )
        console.log(ica);
           
       await a.data.map((item,index)=>{
            op.push(""+item.id)
            //a[index]= item.id;
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
            setTitles(op);
            
            
       });
       
       
       let arr = [0,0,0,0];
       let arr1 = [0,0,0,0];
       for (var i = 0; i < q1.length; i++) {        
            arr[0] = arr[0] + q1[i];
            arr1[0] = arr1[0] + rec1[i];
        }
        console.log(arr[0]);
        if(await q2.length > 0){
            for (var i = 0; i < q2.length; i++) {
            
                arr[1] = arr[1] + q2[i];
                arr1[1] = arr1[1] + rec2[i];
                
            }
    
        }
        if(await q3.length > 0){
            for (var i = 0; i < q3.length; i++) {
            
                arr[2] = arr[2] + q3[i];
                arr1[2] = arr1[2] + rec3[i];
                
            }
    
        }
        if(await q4.length > 0){
            for (var i = 0; i < q4.length; i++) {
            
                arr[3] = arr[3] + q4[i];
                arr1[3] = arr1[3] + rec4[i];
                
            }
    
        }
      
       
       
       await setRecover(await arr1);
       await setTotal(await arr);
       
    
    } 
    const updateRecover = (number,q,recover,totalrecover,tot) =>{
    // POST request using fetch()
    console.log(recover)
    console.log(tot)
        fetch(`http://127.0.0.1:5000/recoveryPage?id=${number}&recover=${totalrecover}&quarter=${q}&trecover=${recover}&t=${tot}`, {
            
            // Adding method type
            method: "POST",
        
            // Adding body or contents to send
            body: "id=1"
            
            /*// Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }*/
        })
        
        // Converting to JSON
        .then(response => response.json())
        //.then(setIca([json]))
        // Displaying results to console
        .then(json => setIca([json]));

    }
    const [inputMonth, setInputMonth] = useState(month[0]);
    const [inputRecover, setInputRecover] = useState();
    const [InputNumber, setInputNumber] = useState("");
     //update value of quarter1total quarter2 total or quarter3 total y taxes y recover y el mes 
     const addRecovery = () =>{
           console.log(InputNumber);
           console.log(inputMonth)
           console.log(inputRecover)
           
           //first cuarter
           if(inputMonth == month[0] || inputMonth == month[1] || inputMonth == month[2] || inputMonth == month[3]){
             //update recover in first quarter
                console.log(ica[0].total+InputNumber)
               updateRecover(inputRecover,1,parseInt(InputNumber),parseInt(InputNumber)+parseInt(ica[0].recover1),parseInt(ica[0].total)+parseInt(InputNumber))
           }
           //second quarter
           if(inputMonth == month[4] || inputMonth == month[5] || inputMonth == month[6] || inputMonth == month[7]){
               updateRecover(inputRecover,2,parseInt(InputNumber),parseInt(InputNumber)+parseInt(ica[0].recover2),parseInt(ica[0].total)+parseInt(InputNumber))
            }
            //third quarter
            if(inputMonth == month[8] || inputMonth == month[9] || inputMonth == month[10] || inputMonth == month[11]){
                updateRecover(inputRecover,3,parseInt(InputNumber),parseInt(InputNumber)+parseInt(ica[0].recover3),parseInt(ica[0].total)+parseInt(InputNumber))
            }
            
           //setInputNumber(InputNumber)
     }
    /*useEffect(async () => {
         let a = await getData();
         await icas();
     }, []);*/
    
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

  
    //---------HTML
    return(
        
        <div style={{ height: 300, width: '100%' }}>          
                <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Grid className='input'>
                        <Autocomplete
                            id="clear-on-escape"
                            clearOnEscape
                            options={titles}
                            value = {inputRecover}
                            onChange = {(event) => setInputRecover(titles[parseInt(event.target.id[event.target.id.length-1])] )}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} id="outlined-basic" label="Select the ica you want to recover in" variant="standard"/>}
                        />
                    </Grid>
                    <Grid className='input'>
                        <Autocomplete
                            clearOnEscape
                            options={month}
                            value = {inputMonth}
                            onChange={(event) => setInputMonth(month[parseInt(event.target.id[event.target.id.length-1])] )}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} id="outlined-basic" label="Select month of recovery" variant="standard"/>}
                        />
                    </Grid>
                    <Grid className='input'>
                        <Input
                        type='number'
                        value = {InputNumber}
                        onChange = {(event) => setInputNumber(event.target.value)}
                            
                        />
                    </Grid>
                <Grid>
                    <IconButton color = "secondary" size="small" id="addRecovery" >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/></svg>
                        
                    </IconButton>
                        <Button variant="outlined" size="small" onClick = {addRecovery}>Add recovery</Button>
                    </Grid>
                </Grid>
            
            <DataGrid rows={ica} columns={columns}/>
            
          
            <Graphic budget={total} recover={recover} />
        </div>
        
            
           

    )
}
export default RecoveryPage;