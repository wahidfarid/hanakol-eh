import React, { ReactNode } from 'react';

type StartProps = {
    getLocation(): void;
}

const Start = ({getLocation}: StartProps) => <>
    <h1 className="text-5xl flex flex-col justify-center align-middle text-center my-12">
        <span>Press the button to find deals near you</span>
        <button className="mx-auto bg-yellow-400 text-2xl rounded p-4 font-semibold hover:bg-yellow-300 my-12" onClick={getLocation}>Start Looking!</button>
    </h1>
</>

export default Start;