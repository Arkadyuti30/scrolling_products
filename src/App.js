import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";


class App extends React.Component {
  // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false,
            skip: 0,
            total: 0,
            allItemsAdded: false
        };
    }

  componentDidMount() {
        fetch(
            "https://dummyjson.com/products?limit=10&skip=0")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json.products,
                    DataisLoaded: true,
                    skip: this.state.skip + 10,
                    total: json.total
                });
            })
  }

  onScroll = () => {
    if (this.state.items.length < this.state.total) {
      fetch(
            `https://dummyjson.com/products?limit=10&skip=${this.state.skip}`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: [...this.state.items, ...json.products],
                    DataisLoaded: true,
                    skip: this.state.skip + 10
                });
            })
    }
  }
  render() {
  
    const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;
    return (

    <div className="App">
      <h1> Fetch data from an api in react </h1>
      <div className="items-card" onScroll={this.onScroll}> 
        {
                items.map((item) => ( 
                <ol key = { item.id } >
                    { item.title }
                    </ol>
                ))
            }
      </div>
      
    </div>
  );
  }
}

export default App;
