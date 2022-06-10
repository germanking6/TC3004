import Card from "@mui/material/Card";
import HeaderComponent from "../../components/HeaderComponent";
import TextField from '@mui/material/TextField';
import { Box, Paper, responsiveFontSizes, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { NativeSelect } from "@mui/material";
import React from "react";

import Stack from '@mui/material/Stack';


import Button from '@mui/material/Button';


function generateYearsBetween(startYear, endYear = 2022) {
    const endDate = endYear || new Date().getFullYear();
    let years = Array(endYear - startYear + 1);
    for (let i = 0; i < years.length; i++) {
        years[i] = startYear;
        startYear++;
    }

    return years;
}

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
const YEAR_LIST = generateYearsBetween(2000);

function TextFieldComponent(props) {
    return <TextField
        id={props.id}
        name={props.id}
        label={props.label}
        margin="normal"
        required
        autoFocus
        variant="standard"
        sx={{ margin: "0 20px", width: "200px" }}

    />
}

function SelectFieldComponent(props) {
    return <NativeSelect
        inputProps={{
            name: props.id,
            id: props.id,
        }}
        sx={{ margin: "10px 20px", width: "200px" }}
    >
        {props.select_list.map(k => <option key={k} value={k}>{k}</option>)}
    </NativeSelect>

}

function DatePickerComponent(props) {
    return <input type="date" id={props.id} name={props.id}
        style={{ width: "200px" }}
    />
}


const TABLE_HEADERS = [
    "ICA Code",
    "ICA Core",
    "Year",
    "ID Planning",
    "ICA Owner",
    "Budget",
    "Country",
    "Depto",
    "Frequency bill",
    "CC",
    "City Name Req",
    "R City Req",
    "City Name Perf",
    "R City Perf",
    "Division",
    "Major",
    "Minor",
    "Leru",
    "Description",
    "Type",
    "Nec",
    "Total Plus Taxes",
    "Start Date",
    "End Date",
];
const TABLE_BODY = [
    "ica_code",
    "ica_core",
    "year",
    "id_planning",
    "ica_owner",
    "budget",
    "country",
    "dept",
    "frequency_bill",
    "cc",
    "city_name_req",
    "r_city_req",
    "city_name_perf",
    "r_city_perf",
    "division",
    "major",
    "minor",
    "leru",
    "description",
    "type",
    "nec",
    "total_plus_taxes",
    "start_date",
    "end_date",
];

export default function ICAS() {
    const [rows, setRows] = React.useState([{
        "ica_code": "a",
        "ica_core": "a",
        "year": "a",
        "id_planning": "a",
        "ica_owner": "a",
        "budget": "a",
        "country": "a",
        "dept": "a",
        "frequency_bill": "a",
        "cc": "a",
        "city_name_req": "a",
        "r_city_req": "a",
        "city_name_perf": "a",
        "r_city_perf": "a",
        "division": "a",
        "major": "a",
        "minor": "a",
        "leru": "a",
        "description": "a",
        "type": "a",
        "nec": "a",
        "total_plus_taxes": "a",
        "start_date": "a",
        "end_date": "a",
    }])

    async function fetchRows() {
        const response = await fetch("/icas");
        const data = await response.json();
        setRows(data);
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const json_data = {
            ica_code: data.get("ica_code"),
            ica_core: data.get("ica_core"),
            year: data.get("year"),
            id_planning: data.get("id_planning"),
            ica_owner: data.get("ica_owner"),
            budget: data.get("budget"),
            country: data.get("country"),
            dept: data.get("dept"),
            frequency_bill: data.get("frequency_bill"),
            cc: data.get("cc"),
            city_name_req: data.get("city_name_req"),
            r_city_req: data.get("r_city_req"),
            city_name_perf: data.get("city_name_perf"),
            r_city_perf: data.get("r_city_perf"),
            division: data.get("division"),
            major: data.get("major"),
            minor: data.get("minor"),
            leru: data.get("leru"),
            description: data.get("description"),
            type: data.get("type"),
            nec: data.get("nec"),
            total_plus_taxes: data.get("total_plus_taxes"),
            start_date: data.get("start_date"),
            end_date: data.get("end_date"),
        };

        fetch("/icas", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json_data),
        });
    };

    return <Card variant="outlined" sx={{ 
        maxWidth:'95%', 
        margin:'1rem auto'}}>
        <HeaderComponent title="ICA" />

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
            <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center" }} spacing={5}>
                <TextFieldComponent id="ica_code" label="ICA Code" />
                <TextFieldComponent id="ica_core" label="ICA Core" />
                <TextFieldComponent id="id_planning" label="ID Planning" />
                <TextFieldComponent id="ica_owner" label="ICA Owner" />
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center" }} spacing={5}>
                <TextFieldComponent id="budget" label="Budget" />
                <TextFieldComponent id="dept" label="Depto" />
                <TextFieldComponent id="frequency_bill" label="Frequency Bill" />
                <TextFieldComponent id="cc" label="CC" />
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center" }} spacing={5}>
                <TextFieldComponent id="city_name_req" label="City Name Req" />
                <TextFieldComponent id="r_city_req" label="R City Req" />
                <TextFieldComponent id="city_name_perf" label="City Name Perf" />
                <TextFieldComponent id="r_city_perf" label="R City Perf" />
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center" }} spacing={5}>
                <TextFieldComponent id="division" label="Division" />
                <TextFieldComponent id="major" label="Major" />
                <TextFieldComponent id="minor" label="Minor" />
                <TextFieldComponent id="leru" label="Leru" />
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center" }} spacing={5}>
                <TextFieldComponent id="description" label="Description" />
                <TextFieldComponent id="type" label="Type" />
                <TextFieldComponent id="nec" label="Nec" />
                <TextFieldComponent id="total_plus_taxes" label="Total Plus Taxes" />
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center" }} spacing={5}>
                <SelectFieldComponent id="year" label="Year" select_list={YEAR_LIST} />
                <SelectFieldComponent id="country" label="Country" select_list={COUNTRY_LIST} />
                <DatePickerComponent id="start_date" />
                <DatePickerComponent id="end_date" />
            </Stack>


            <Button variant="outlined" type="submit" >submit</Button>

        </Box>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {TABLE_HEADERS.map(header => <TableCell key={header} align="right">{header}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map(row => <TableRow>{TABLE_BODY.map(k => <TableCell align="right" key={k}>{row[k]}</TableCell>)}</TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    </Card>;
}