import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './ExpenseDetail.css';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import CalendarIcon from '../CalendarIcon/CalendarIcon';
import Title from '../Title/Title';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  depositContext: {
    flex: 1,
  }
}));

export default function ExpenseDetail(props: any) {

  const classes = useStyles();

  props = props.expense
  
  let flows = 0

  if(props.outflow > 0){
    flows = - props.outflow
  } else {
    flows = props.inflow
  }

  return (
    <React.Fragment>
      <Container>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={3}  container>
              <CalendarIcon ymd={props.ymd}></CalendarIcon>
            </Grid>
            <Grid item xs={9} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Title>{props.description}</Title>
                  <Typography color="textSecondary" className={classes.depositContext}>
                    {props.method}
                  </Typography>
                  <Typography component="p" variant="h4">
                    {flows} MXN
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
}