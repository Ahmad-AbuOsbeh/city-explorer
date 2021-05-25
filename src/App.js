/* eslint-disable */
'use stirct';

import React from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button} from 'react-bootstrap'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityRequest:'',
      responseData: [],
      imgSrc:'',
      showResponse:false,
      errorMessage:false,
    }
  }
  updtingRequest=(event)=>{
   this.setState(
     {
      cityRequest: event.target.value,
      
     }
   )
  }
  sendingRequest = async (event) => {
    event.preventDefault();
    let urlRequest = `https://eu1.locationiq.com/v1/search.php?key=pk.d2f25ab9a78b95f48f540af0f9fb290e&q=${this.state.cityRequest}&format=json`;
    
   try {
    let responseDataFunction = await axios.get(urlRequest);
    console.log('responseDataFunction', responseDataFunction.data);

    this.setState(
      {
        responseData: responseDataFunction.data[0],
        showResponse:true
      }
      )
      console.log('this.state.responseData.lat',this.state.responseData.lat);
   }
    
   catch{
     this.setState({
         errorMessage:true,
         showResponse: false
     })
   }

      // why we didn'y use another request for the image?

    // let requestImg=`https://maps.locationiq.com/v3/staticmap?key=pk.d2f25ab9a78b95f48f540af0f9fb290e&center=${this.state.responseData.lat},${this.state.responseData.lon}&zoom=18`;
    //   let reponseMap= await axios.get(requestImg);

    //   this.setState(
    //     {
    //       imgSrc: reponseMap,
    //     }
    //   )


  }
  // https://maps.locationiq.com/v3/staticmap?key=pk.d2f25ab9a78b95f48f540af0f9fb290e&center=31.9515694,35.9239625&zoom=5
  render() {
    return (
      <>
        <p>hello from front end react app</p>

        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>City Data</Form.Label>
            <Form.Control type="text" placeholder="search your city" onChange={this.updtingRequest} />
            <Form.Text className="text-muted">
            {this.state.responseData.display_name}
           </Form.Text>
          {this.state.showResponse&& <Form.Text className="text-muted">
            Lattitude :{this.state.responseData.lat} & Longitude :{this.state.responseData.lon}
           </Form.Text>}
          </Form.Group>

          
          <Button onClick={this.sendingRequest} variant="primary" type="submit">
            Explore!
          </Button>
        </Form>
        {/* why this didn't work ? */}
        {/* <img src={this.state.imgSrc} alt=''/> */}

        {this.state.showResponse&& <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.d2f25ab9a78b95f48f540af0f9fb290e&center=${this.state.responseData.lat},${this.state.responseData.lon}&zoom=18`} alt=''/>}
        {/* <button onClick={this.sendingRequest}>Submit Request</button>
        <p>{this.state.responseData.display_name}</p> */}

        {this.state.errorMessage &&<p>please write a valid city name</p>}
      </>
    )

  }






}

export default App;
