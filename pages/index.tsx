import React, { ReactNode } from 'react';
import Link from 'next/link'
import Layout from '../components/Layout'

import tw from "tailwind-styled-components"


type MainState = {
  location: GeolocationCoordinates
};

class IndexPage extends React.Component<{}, MainState>{


  getLocation = () => {
    const parent = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      parent.setState({
        location: position.coords
      });
    });
  };


  render():ReactNode {
    return <Layout title="Hanakol eh?">

    <h1 className="text-5xl flex justify-between">
      Press the button to find deals near you
      <button className="mx-auto bg-yellow-400 text-2xl rounded p-4 font-semibold hover:bg-yellow-300" onClick={this.getLocation}>Start Looking!</button>
      </h1>
  </Layout>;
  }
}

export default IndexPage
