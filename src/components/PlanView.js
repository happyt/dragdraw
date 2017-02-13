import React, { Component } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data01 = [{x: 100, y: 200, z: 200}, {x: 120, y: 100, z: 260},
                  {x: 170, y: 300, z: 400}, {x: 140, y: 250, z: 280},
                  {x: 150, y: 400, z: 500}, {x: 110, y: 280, z: 200}];
const data02 = [{x: 200, y: 260, z: 240}, {x: 240, y: 290, z: 220},
                  {x: 180, y: 280, z: 260}, {x: 210, y: 220, z: 230}];


export class PlanView extends Component {


  render() {
    let crowd = []
    for (var i = 0; i < this.props.squad.length; i++) {
        let p = {}
 //       console.log(JSON.stringify(this.props.squad[i]))
        p['x'] = this.props.squad[i].posX
        p['y'] = this.props.squad[i].posY
        p['z'] = 400
        crowd.push(p)
    }

    return (
        <div>
            <ScatterChart width={600} height={600} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                <XAxis dataKey={'x'} name='stature' unit='cm'/>
                <YAxis dataKey={'y'} name='weight' unit='kg'/>
                <ZAxis dataKey={'z'} range={[50, 600]} name='score' unit='km'/>
                <CartesianGrid />
                <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                <Legend/>
                <Scatter name='A' data={data01} fill='#8884d8' shape="star"/>
                <Scatter name='B' data={data02} fill='#82ca9d' shape="triangle"/>
                <Scatter name='C' data={crowd} fill='#d22a9d' shape="circle"/>
            </ScatterChart>
        </div>
    );
  }
}