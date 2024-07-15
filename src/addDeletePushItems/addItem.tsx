import useAppointmentService from "../service/AppointmentService";
import './addItemStyle.css';


const AddItem = ({updateTableDate}: {updateTableDate: any}) => {
    const {pushItem} = useAppointmentService();

    const change = () => {
        const inputData = document.getElementById("inputDate") as HTMLFormElement;
        const formData = new FormData(inputData);
        for(let [name] of formData) {
            const emptyElement = inputData.elements.namedItem(name) as HTMLInputElement;
            emptyElement.classList.remove('emptyInput')
        }
       
    }
    const pushData = () => {
        const inputData = document.getElementById("inputDate") as HTMLFormElement;
        const formData = new FormData(inputData); 
        const obj: any = {};
        let count = 0;
    for(let [name, value] of formData) {
        if (value === "") {
           const emptyElement = inputData.elements.namedItem(name) as HTMLInputElement;
           emptyElement.classList.add('emptyInput')
           count++;
        } else if (name === 'companySigDate' || name === 'employeeSigDate') {
                obj[name] = new Date(value.toString() + ' ' + 'UTC').toISOString(); 
        } else {
            const emptyElement = inputData.elements.namedItem(name) as HTMLInputElement;
            emptyElement.classList.remove('emptyInput')
            obj[name] = value;
        }
      }
      if (count === 0) {
        // for (let key in obj) {
        //   console.log(obj);
        //     console.log(key);
        // }
        console.log(obj);
         pushItem(obj, localStorage.getItem('token')).then(data => {
            updateTableDate();
          })
      }
  
    }

    return (
        <>
            <div>
                <form id="inputDate" onChange={change}>
                    <input name="companySigDate" type='text' placeholder='Day Month Year h:m' />
                    <input name="companySignatureName" type='text' placeholder='companySignatureName'/>
                    <input name="documentName" type='text' placeholder='documentName'/>
                    <input name="documentStatus" type='text' placeholder='documentStatus'/>
                    <input name="documentType" type='text' placeholder='documentType'/>
                    <input name="employeeNumber" type='text' placeholder='employeeNumber'/>
                    <input name="employeeSigDate" type='text' placeholder='Day Month Year h:m'/>
                    <input name="employeeSignatureName" type='text' placeholder='employeeSignatureName'/>
                </form>
                <button type="submit" onClick={pushData}>add</button>
            </div>
        </>
    )
}
export default AddItem;