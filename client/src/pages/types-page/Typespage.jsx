import React from 'react';
// Local components
// MUI components
import { useState } from 'react';
import { DataGrid  } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import Box from '@mui/material/Box';
import { ButtonBase } from '@mui/material';
import HeaderComponent from '../../components/HeaderComponent';
import CircularIndeterminate from '../../components/Loading';

const COUNTRY_LIST = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Åland Islands"
];
function TypesPage() {
    const url = "https://apilerttesting-humble-bear-yd.mybluemix.net/types";
    const [typeOptions, setType] = useState([{label:"Trip"},{label:"Course"},]);
    const [bandOptions, setBand] = useState([{label:"1"},{label:"2"},{label:"3"},{label:"4"},{label:"5"},{label:"6"},{label:"7"},{label:"8"},]);
    const [formState, setFormState] = React.useState({
        "Country": "",
        "Type": "",
        "Band": "",
        "Rate": "",
        "Date1": "",
        "Date2": ""
      });
    const columns = [
        {
            field: 'action',
            width:100,
            headerName: 'Action',
            renderCell: (params) => (
            <IconButton aria-label="delete" size="small" height="15" width="15"onClick={() => 
                {
                    console.log(params.id)
                    console.log(params.row)
                    deleteButton(params)
                }
            }>
                <DeleteIcon />
            </IconButton>
            
            ),
        },
        { field: 'Country', headerName: 'Country', width: 200 },
        { field: 'Type', headerName: 'Type', width: 200 },
        { field: 'Band', headerName: 'Band', width: 200 },
        { field: 'Rate', headerName: 'Rate', width: 200 },
        { field: 'Date1', headerName: 'Date1', width: 200 },
        { field: 'Date2', headerName: 'Date2', width: 200 },
        
    ];
    const [rows, setRows] = useState([]);
    const [InputField, setInputField] = useState("");
    const [load,setLoad]=useState(false);
    const deleteButton = (params) => {
        if(confirm("¿Está seguro que desea eliminar el registro " + params.row.id + "?")){
            setLoad(false);
            console.log("ola")
            fetch(url+`?ID=${params.row.id}`,{
            method:'DELETE',
            headers : {
                'Content-Type':'application/json'
            },
            });
        }
    }
    const handleSubmit = (event) => {
       
        
            setLoad(false);
            fetch(url+`?Type=${formState.Type}&Band=${formState.Band}&Country=${formState.Country}&Rate=${formState.Rate}&Date1=${formState.Date1}&Date2=${formState.Date2}`,{
            method:'POST',
            headers : {
                'Content-Type':'application/json'
            },
            });
       
    }
    
    const handleChange = (event) =>{
        event.preventDefault();
        console.log(event.target.value)
        setFormState({
            ...formState,
            [event.target.id]: event.target.value
          });
    };
    React.useEffect(()=>{
        if(!load){
            fetch(url,{
                method:'GET',
            })
            .then((res)=>res.json())
            .then((data)=>setRows(data)).then(()=>setLoad(true))
        }
        
    })
    return (
        <Card sx={{ 
            maxWidth:'95%', 
            margin:'1rem auto'}}>
            <HeaderComponent title="Types"/>
            { !load && (<CircularIndeterminate/>)}
            <Container sx={{
            '& .MuiTextField-root': { m: 2, width:"35ch"},
          }}>
                <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center'}}>  
                    <Grid item xs={4}>
                        <Autocomplete
                        disablePortal
                        id="Country"
                        options={COUNTRY_LIST}
                        onInputChange={(event, newInputValue) => {
                            setFormState({
                                ...formState,
                                ["Country"]: newInputValue
                            });
                        }}
                        renderInput={(params) => <TextField {...params} label="Country" />}
                        />
                    </Grid>
                    <Grid item xs={4} className='input'>
                        <TextField value ={formState.Type} id="outlined-basic" label="Type" variant="outlined" onChange = {(event)=>{
                            setFormState({
                                ...formState,
                                ["Type"]: event.target.value
                            });
                        }} />
                    </Grid>
                    <Grid item xs={4} className='input'>
                        <TextField value ={formState.Band} id="outlined-basic" label="Band" variant="outlined" onChange = {(event)=>{
                            setFormState({
                                ...formState,
                                ["Band"]: event.target.value
                            });
                        }} />
                    </Grid>
                    <Grid item xs={4} className='input'>
                        <TextField value ={formState.Rate} id="outlined-basic" label="Rate" variant="outlined" onChange = {(event)=>{
                            setFormState({
                                ...formState,
                                ["Rate"]: event.target.value
                            });
                        }} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            required
                            id="Date1"
                            value={formState.Date1}
                            onChange={handleChange}
                            label="Date1"
                            variant="standard"
                            type="date"
                            helperText="Please select a date"
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            required
                            id="Date2"
                            value={formState.Date2}
                            onChange={handleChange}
                            label="Date2"
                            variant="standard"
                            type="date"
                            helperText="Please select a date"
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </Grid>
                    
                </Grid>
                <Grid>
                    <Button variant="outlined" size="small" onClick={()=>{
                        handleSubmit()
                    }} >SUBMIT</Button>
                </Grid>
            </Container>
            
            <Box>
                <Card className="table" sx={{  
                            margin:'1rem 1rem 0 1rem'}}>
                    <Box>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            padding: "20px",
                        }}>
                            <h3 style={{ flex: "1 1 auto" }}>Types Information: </h3>
                            <div>
                                <IconButton aria-label="download" onClick={()=>console.log(rows)}>
                                    <DownloadIcon />
                                </IconButton>
                            </div>
                        </div>
                    </Box>
                </Card>
                <Card sx={{  
                            margin:'0 1rem 1rem 1rem'}}>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        
                        />
                    </div>
                </Card>
            </Box>
            
        </Card>
    )
}


export default TypesPage;
