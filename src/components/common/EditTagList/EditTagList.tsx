import { Box, Button, Card, CardContent, Chip, Grid, Paper, TextField, Typography } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { makeStyles } from "@mui/styles"
import { useContext, useEffect, useState } from "react";
import { EntryControllerApi, ExpenseControllerApi } from "../../../api";
import EntriesDrawerContext from "../../../store/entries-drawer-context";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpensesDrawerContext from "../../../store/expenses-drawer-context";

const useStyles = makeStyles((theme: any) => ({
    chipContainer: {
      display: 'flex',
      justifyContent: 'left',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
      }
  }));
export default function EditTagList(props: any) {

    const TYPE_EXPENSE = 'expense'
    const TYPE_ENTRY = 'entry'
    const mockItem: any = {
        id: '',
        ymd: '',
        tags: [],
        description: '',
        method: '',
        inflow: 0,
        outflow: 0
    }

    // TODO: update top10Tags later to include ML selected options
    const top10Tags = ['to-be-paid','bank','living-costs']

    const classes = useStyles();
    const entriesDrawerCtx = useContext(EntriesDrawerContext);
    const expensesDrawerCtx = useContext(ExpensesDrawerContext);
    const [item, setItem] = useState(mockItem)
    const [currentTag, setCurrentTag] = useState('')
    const [hackyHide, setHackyHide] = useState('')

    let controller: any;

    if (props.type == TYPE_ENTRY){
        controller = new EntryControllerApi()
    } else  if (props.type == TYPE_EXPENSE){
        controller = new ExpenseControllerApi()
    }

    useEffect(() => {      
        if (props.type == TYPE_ENTRY && !!entriesDrawerCtx.item.id){
            setItem(entriesDrawerCtx.item)
        } else  if (props.type == TYPE_EXPENSE && !!expensesDrawerCtx.item.id){
            setItem(expensesDrawerCtx.item)
        }
    }, [entriesDrawerCtx.item, expensesDrawerCtx.item]);
 
    const updateTagCall = (newTagList: string[], beingAdded: boolean) =>{
        if (props.type == TYPE_ENTRY && !!item.id ){
            controller.entryControllerUpdateTagsById(item.id,newTagList).then((data: any) => {
                entriesDrawerCtx.openItem(item.id)
            })
        } else  if (props.type == TYPE_EXPENSE && !!item.id){
            controller.expenseControllerUpdateTagsById(item.id,newTagList).then((data: any) => {
                expensesDrawerCtx.openItem(item.id)
            })
        }
        if(beingAdded){
            setHackyHide(currentTag)
            setCurrentTag('')
        }
    }

    const handleEditTag = (event: any, value: any) => {
        setCurrentTag(value)
    }

    const handleRemoveTag = (tag: string) => () => {
        updateTagCall(item.tags.filter((x: string) => x !== tag), false)
    }

    const handleSaveTag = () => {
        updateTagCall([...item.tags, currentTag], true)
    }

    return (

<div>

<Grid container  >
    <Grid container item >
        <Grid item style={{ width: '80%' }}>
            <Autocomplete
                
                key={hackyHide}
                freeSolo
                clearOnEscape
                options={top10Tags}
                onInputChange={handleEditTag}
                value={currentTag}
                renderInput={(params) => (
                <TextField
                    style={{backgroundColor: 'white'}}
                    {...params}
                    label="Add tag"
                    margin="normal"
                    onChange={(hey) => {console.log(hey)}}
                    onKeyDown={e => {
                        if (e.keyCode === 13 && currentTag && currentTag !== '') {
                            handleSaveTag()
                        }
                    }}
                />
                )}
            />
        </Grid>
        <Button style={{ width: '20%' }} className='closeButton' onClick={handleSaveTag} >
            <AddCircleOutlineIcon></AddCircleOutlineIcon>
        </Button>
    </Grid>
</Grid>
<Grid container xs={12}>
    <div className={classes.chipContainer}>
        {
        item.tags.map((tag: string) => {
            return (
            <Chip
                label={tag}
                color="primary"
                onDelete={handleRemoveTag(tag)}
                style={{margin: 1}}
            />
            )
        })
        }
    </div>
</Grid>

</div>


    )
}
