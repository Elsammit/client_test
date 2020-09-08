import React, { Component } from 'react';
import axios from 'axios' 

import "./clien.css";

import Sit from './image/DoSit.jpg'
import Stand from './image/DoRemove.jpg'
import Imagefile from './image/ground.jpg'
import StandSound from './sound/zyosei1-ganbaro.mp3'
import SitSound from './sound/zyosei1-otukaresamadesu.mp3'


axios.defaults.baseURL = 'http://192.168.56.101';
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

//axios.defaults.withCredentials = true;

export default class Todo extends Component  {

    constructor (props) {
        super(props);
        this.state = {
            name: 'yahoo',
            Soundflg:false,
            imgHeight:500,
            imgWidth:500,
            zoom:10
        };
    }

    componentDidMount = () =>{
        this.interval = setInterval(()=>{
            this.Clcik();
        },1000);
    }

    Clcik = () => {
        const url = "http://192.168.56.101:8080/Get";
        axios.post(url,{
            withCredentials: true,
            credentials: 'include'
        }).then((res) => {
            console.log("==================================");
            console.log(res.data.data)
            console.log("==================================");
          this.setState({
            name: res.data.data
          });

        });
      }

      GoSound = (sitflg) =>{
          const {Soundflg} = this.state;
          if(sitflg === 1 && Soundflg === false){
            const audio = new Audio(StandSound);
            audio.play();
            this.setState(()=>{
                return {Soundflg:true}
            })
          }else if(sitflg === 2 && Soundflg === true){
            const audio = new Audio(SitSound);     
            audio.play();   
            this.setState(()=>{
                return {Soundflg:false}
            })    
          }
      }

    zoom = (e) =>{
        const {imgHeight} = this.state;
        const {imgWidth} = this.state;
        const {zoom} = this.state;
        console.log("========================")
        console.log(e.deltaY)
        console.log("========================")

        if(imgHeight <=0 || imgWidth <=0){
            return;
        }

        if(e.deltaY > 0){
            this.setState(()=>{
                return {
                    zoom:zoom - 0.1
                }
            })
        }else{
            this.setState(()=>{
                return {
                    zoom:zoom + 0.1
                }
            })
        }
        document.getElementById("img01").style.zoom = zoom;
    }

    onMouseMove = (e) =>{
        var element = document.getElementById("imgID");
        element.scrollTop = element.scrollTop - e.movementY*10;
        element.scrollLeft = element.scrollLeft - e.movementX*10;
    }


    render() {
        const {name} = this.state;
        var distance = Number(name);

        const {zoom} = this.state;
        var Zoom = zoom + "%";
        
        console.log(Zoom);

        return(<div>
            <h1>&nbsp;
                <u>テスト</u>
            </h1>
                    <div id="imgID" onWheel = {(e) => this.zoom(e)} onMouseMove = {(e) => this.onMouseMove(e)} className="test">
                        <img src={Imagefile} id="img01" heigt="100px" width="100px"  />
                    </div>
                    {
                        (()=>{
                            if(distance < 50){
                                this.GoSound(1);
                                return(<img src={Sit} alt="席に座る" width="100px" heigt="100px" />)
                            }else{
                                this.GoSound(2);
                                return(<img src={Stand} alt="席を立つ" width="100px" heigt="100px" />)
                            }
                        })()
                    }

                    
            </div>
        );
    }    
}