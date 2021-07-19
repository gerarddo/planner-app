import { BaseAPI } from '../../api/base'
import Button from '@material-ui/core/Button';


const baseapi = new BaseAPI()


export default function ExpenseSelection(props: any) {

    let selectExpense = function(props: any){
        console.log('hey, i was selected!')
        console.log(props.id)

        // Checkpoint.
        // TODO: use the id information to make a POST call to backend and register relation bewteen entry and expense
    
    }


    return (
        <Button onClick={() => {selectExpense(props.props)}}>SELECT</Button>
        )

}