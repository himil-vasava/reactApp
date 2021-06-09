import React, { Component } from 'react';
import Header from './Components/Header/Header';
import { Box, Button, Grid, Input, TextField } from '@material-ui/core';
import firebaseApp from './Components/Utilities/db';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      transactions: [],
      type: '',
      amount: '',
      remark: '',
      date: '',
      time: '',
      total: 0,
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleRemarkChange = this.handleRemarkChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleAmountChange(e) {
    this.setState({
      amount: e.target.value
    })
  }

  handleRemarkChange(e) {
    this.setState({
      remark: e.target.value
    })
  }

  handleTypeChange(e) {
    this.setState({
      type: e.target.value
    })
  }

  handleDateChange(e) {
    this.setState({
      date: e.target.value
    })
  }

  handleTimeChange(e) {
    this.setState({
      time: e.target.value
    })
  }

  onSubmit(e) {
    const array = this.state.transactions;
    let part = this.state.total;

    if (this.state.type == '+') {
      part = part + parseInt(this.state.amount);
    } else {
      part = part - parseInt(this.state.amount);
    }

    array.push(
      {
        amount: this.state.amount,
        remark: this.state.remark,
        type: this.state.type,
        date: this.state.date,
        time: this.state.time
      }
    )

    const db = firebaseApp.firestore();

    db.collection("transactions").doc(`${array.length}`).set({
      amount: this.state.amount,
      remark: this.state.remark,
      type: this.state.type,
      date: this.state.date,
      time: this.state.time
    })

    this.setState({
      transactions: array,
      total: part,
      amount: '',
      remark: '',
      type: '',
      date: '',
      time: '',
    })
  }

  async componentDidMount() {
    const db = firebaseApp.firestore();
    const arr = [];
    let part = 0;
    await db.collection("transactions").get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          console.log(doc.data());
          if (doc.data().type == '+') {
            part = part + parseInt(doc.data().amount);
          } else {
            part = part - parseInt(doc.data().amount);
          }
          arr.push(doc.data());
        });
      })

    this.setState({
      transactions: arr,
      total: part
    });
  }

  render() {
    console.log(this.state);
    const d = new Date();
    return (
      <>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={3}>
            <div>
              <Header />
              <br />
              <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue="2017-05-24"
                onChange={this.handleDateChange}
                value={this.state.date}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ marginRight: 20 }}
              />
              <TextField
                id="time"
                label="Time"
                type="time"
                defaultValue="07:30"
                onChange={this.handleTimeChange}
                value={this.state.time}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
              <br />
              <TextField id="type" name="type" onChange={this.handleTypeChange} value={this.state.type} label="Type(+ or -)" variant="outlined" style={{ marginTop: 30, width: '100%' }} />
              <br /><br />
              <TextField id="amount" name="amount" onChange={this.handleAmountChange} value={this.state.amount} label="Amount" variant="outlined" style={{ width: '100%' }} />
              <br /><br />
              <TextField id="remark" label="Remark" onChange={this.handleRemarkChange} value={this.state.remark} variant="outlined" style={{ marginBottom: 30, width: '100%' }} />
              <br />
              <Button variant="outlined" color="primary" style={{ marginBottom: 30, width: '60%' }} >
                Attach Image
          </Button>
              <br />
              <Button onClick={this.onSubmit} variant="contained" color="primary" style={{ width: '100%' }}>
                Save
          </Button>
              <div>
                <Box border={1} display="flex" alignContent="center" style={{ marginTop: 10, color: "gray", borderColor: '#000' }}>
                  <Box style={{ paddingLeft: 10 }} flexGrow={1}>
                    <div style={{ fontSize: 12 }}>{moment(d).format('MMM Do YY')}</div>
                  Total
                </Box>
                  <Box style={{ paddingRight: 10 }}>
                    {this.state.total}
                  </Box>
                  {/* <p>{tran.time}</p> */}
                </Box>
                {this.state.transactions.map((tran, index) => (
                  <Box border={1} key={index} display="flex" alignContent="center" style={{ marginTop: 10, color: tran.type == '+' ? '#E4D00A' : '#ff0f0f', borderColor: '#000' }}>
                    <Box style={{ paddingLeft: 10 }} flexGrow={1}>
                      <div style={{ fontSize: 12 }}>{moment(tran.date).format('MMM Do YY')}</div>
                      {tran.remark}
                    </Box>
                    <Box style={{ paddingRight: 10 }}>
                      {tran.type}{tran.amount}
                    </Box>
                    {/* <p>{tran.time}</p> */}
                  </Box>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default App;
