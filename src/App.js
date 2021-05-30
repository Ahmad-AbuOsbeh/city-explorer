/* eslint-disable */
'use stirct';

import React from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Table, Card,CardColumns } from 'react-bootstrap'
// require('dotenv').config();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityRequest: '',
      responseData: [],
      imgSrc: '',
      showResponse: false,
      errorMessage: false,
      responseFromBackend: [],
      daysCounter: 1,
      responseForMovie: [],
      imgMovieSrc: '',
    }
  }
  updtingRequest = (event) => {
    this.setState(
      {
        cityRequest: event.target.value,

      }
    )
  }


  sendingRequest = async (event) => {
    event.preventDefault();
    // let WHEATHER_API_KEY=process.env.WHEATHER_API_KEY;
    let WHEATHER_API_KEY = `pk.d2f25ab9a78b95f48f540af0f9fb290e`;
    let urlRequest = `https://eu1.locationiq.com/v1/search.php?key=${WHEATHER_API_KEY}&q=${this.state.cityRequest}&format=json`;


    try {

      const serverRoute = process.env.REACT_APP_SERVER;
      let responseDataFunction = await axios.get(urlRequest);
      console.log('responseDataFunction', responseDataFunction.data);
      // urlRequest2 = http://localhost:3003/ahmad?desired_city=amman
      // https://city-explorer-backend-server.herokuapp.com/ahmad?desired_city=amman
      let urlRequest2 = `${serverRoute}/ahmad?desired_city=${this.state.cityRequest}`
      // let urlRequest2 = `https://city-explorer-backend-server.herokuapp.com/ahmad?desired_city=${this.state.cityRequest}`
      let requestToBackend = await axios.get(urlRequest2);
      console.log('requestToBackend', requestToBackend);

      // let urlMovieReq=`http://localhost:3003/movies?desired_city=amman`
      let urlMovieReq = `${serverRoute}/movies?desired_city=${this.state.cityRequest}`;
      let responseForMovie = await axios.get(urlMovieReq);
      console.log('responseForMovie', responseForMovie);

      this.setState(
        {
          responseData: responseDataFunction.data[0],
          responseFromBackend: requestToBackend.data,
          showResponse: true,
          responseForMovie: responseForMovie.data,


        }
      )
      console.log('this.state.responseData.lat', this.state.responseData.lat);
    }

    catch {
      this.setState({
        errorMessage: true,
        showResponse: false
      })
    }




  }

  // https://maps.locationiq.com/v3/staticmap?key=pk.d2f25ab9a78b95f48f540af0f9fb290e&center=31.9515694,35.9239625&zoom=5
  render() {

    return (
      <>
        <p>hello front end react app</p>

        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>City Data</Form.Label>
            <Form.Control type="text" placeholder="search your city" onChange={this.updtingRequest} />
            <Form.Text className="text-muted">
              {this.state.responseData.display_name}
            </Form.Text>
            {this.state.showResponse && <Form.Text className="text-muted">
              Lattitude :{this.state.responseData.lat} & Longitude :{this.state.responseData.lon}
            </Form.Text>}
          </Form.Group>


          <Button onClick={this.sendingRequest} variant="primary" type="submit">
            Explore!
          </Button>
        </Form>
        {/* why this didn't work ? */}
        {/* <img src={this.state.imgSrc} alt=''/> */}
        {this.state.showResponse &&
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Day :</th>
                <th>Date</th>
                <th>Description</th>
                {/* <th>Username</th> */}
              </tr>
            </thead>

            {/* {this.state.responseFromBackend.map((item) => {
          
          return (
            <> */}


            <tbody>
              <tr>
                <th>{this.state.daysCounter++}</th>
                <td>{this.state.responseFromBackend.date}</td>
                <td>{this.state.responseFromBackend.descreption}</td>
                {/* <td>@mdo</td> */}
              </tr>

            </tbody>

            {/* </>
          )
        })

        }
        } */}
          </Table>
        }

        {this.state.showResponse && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.d2f25ab9a78b95f48f540af0f9fb290e&center=${this.state.responseData.lat},${this.state.responseData.lon}&zoom=18`} alt='' />}
        
       <CardColumns>
        {this.state.responseForMovie.map((item) => {
          // https://image.tmdb.org/t/p/w500/cvNyhndV2ALXgsmeF5JaDQ712UT.jpg
          let imageeee = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
          return (
            <>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                {item.poster_path&&
                  <Card.Img variant="top" src={imageeee} />}
                  <Card.Text>
                  {item.overview}
                </Card.Text>
                 
                </Card.Body>
              </Card>
              
            </>
          )

        })}
      </CardColumns>

        
        {/* <button onClick={this.sendingRequest}>Submit Request</button>
        <p>{this.state.responseData.display_name}</p> */}

        {this.state.errorMessage && <p>please write a valid city name</p>}
      </>
    )

  }






}

export default App;

// hello from lab08 branch
// test pull reaquest
