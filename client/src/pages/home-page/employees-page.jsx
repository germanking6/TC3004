import react from "react";
import TableOutput from "../../components/TableOutput";

const EmployeesPage = (props) =>{
    const columnTitles = ["id", "name","band","ICA"];
    const contentRows = [[1,"Ariana",3,"p233"],[2,"Marisol",3,"p233"],[3,"Victor",3,"p233"],[4,"Alex",3,"p233"],[5,"Sauce",3,"p233"],[6,"German",3,"p233"]];
    return(
        <TableOutput columnTitles = {columnTitles} contentRows ={contentRows} />

    )
}
export default EmployeesPage;