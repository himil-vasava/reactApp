import React, { Component } from 'react';
import Header from './Components/Header/Header';
import Date from './Components/Date/Date';
import { Button, Input, TextField } from '@material-ui/core';
import firebaseApp from './Components/Utilities/db';

class App extends Component{
  constructor(props){
    super();
    this.state = {
      transactions: [],
      type:'',
      amount: '',
      remark: '',
      date:'',
      time:'',
      total: 0,
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleRemarkChange = this.handleRemarkChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleAmountChange(e){
    this.setState({
      amount: e.target.value
    })
  }

  handleRemarkChange(e){
    this.setState({
      remark: e.target.value
    })
  }

  handleTypeChange(e){
    this.setState({
      type: e.target.value
    })
  }

  handleDateChange(e){
    this.setState({
      date: e.target.value
    })
  }

  handleTimeChange(e){
    this.setState({
      time: e.target.value
    })
  }
  
  onSubmit(e){
    const array = this.state.transactions;
    let part = this.state.total;

    if(this.state.type=='+'){
      part = part + parseInt(this.state.amount);
    }else{
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

  async componentDidMount(){
    const db = firebaseApp.firestore();
    const arr = [];
    let part = 0;
    await db.collection("transactions").get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async(doc) => {
          console.log(doc.data());
          if(doc.data().type=='+'){
            part = part+parseInt(doc.data().amount);
          }else{
            part = part-parseInt(doc.data().amount);
          }
          arr.push(doc.data());
        });
      })

      this.setState({
        transactions: arr,
        total: part
      });
  }

  render(){
    console.log(this.state);
      return (
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
          <TextField id="type" name="type" onChange={this.handleTypeChange} value={this.state.type} label="Type(+ or -)" variant="outlined" />
          <br /><br />
          <TextField id="amount" name="amount" onChange={this.handleAmountChange} value={this.state.amount} label="Amount" variant="outlined" />
          <br /><br />
          <TextField id="remark" label="Remark" onChange={this.handleRemarkChange} value={this.state.remark} variant="outlined" />
          <br />
          <Button variant="outlined" color="primary">
            Attach Image
          </Button>
          <br />
          <Button onClick={this.onSubmit} variant="contained" color="primary">
            Save
          </Button>
          
          <div>
            {this.state.transactions.map((tran, index) => (
              <div key={index}>
              <p>{tran.amount}</p>
              <p>{tran.remark}</p>
              <p>{tran.date}</p>
              <p>{tran.time}</p>
              </div>
            ))}
          </div>
        </div>
      );
  }
}

export default App;
