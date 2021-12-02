import React, { Component } from 'react'
import axios from 'axios'
import env from 'react-dotenv'


class Landing extends Component {
  state = {
    text: '',
    summoner:'',
    summonerLevel:'',
    matchList:[]
  }
  
  submit = (e) => {
    e.preventDefault()
    this.setSummoner(this.state.text)

    this.setState(() => ({
     text : ''
    }))
  }
  change = (e) => {
    this.setState(() => ({
      text: e.target.value
    }))
  }
  setSummoner = (text) => {
    const baseAPIurl = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'
    let APIkey = "?" + env.API_KEY;

    axios.get(baseAPIurl + text + APIkey).then((res) => {
      this.setState(() => ({
        summoner: res.data.name,
        summonerLevel: res.data.summonerLevel
      }))
    this.getMatchList(res.data.puuid)

    }).catch((err) => console.log(err))
  }
  getMatchList = (puuid) => {
    let APIkey = env.API_KEY;
    const baseAPIurl ='https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/'+ puuid +'/ids?start=0&count=20&'
    axios.get(baseAPIurl + APIkey).then((res) => { 
      console.log(res.data)
      this.transformMatchList(res.data)
    })
  }
  transformMatchList = (array) => {
    let APIkey = "?" + env.API_KEY;
    const baseAPIurl = 'https://americas.api.riotgames.com/lol/match/v5/matches/'
    array.map((item) => {
      axios.get(baseAPIurl + item + APIkey).then((res) => {
        this.setState(() => ({
          matchList: [...this.state.matchList, res.data]
        }))
      })

    })

  }
  render() {

    const {summoner, summonerLevel} = this.state
   return ( 
    <div>
      <form onSubmit={(e) => this.submit(e)}>
        <input onChange={(e) => this.change(e)}type="text"/>
        <input type="submit"/>
      </form>
      <p>{summoner}</p>
      <p>{summonerLevel}</p>
      <ul>
        {this.state.matchList.map((id) => (
            <li >
              {id.metadata.participants}
            </li>
          ))}
      </ul>

    </div>
  )
 }
};

export default Landing;
