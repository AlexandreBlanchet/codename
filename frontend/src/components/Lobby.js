import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const URL = 'ws://localhost:8000/ws/games'

class Lobby extends Component {

    state = {
        games: []
    }

    ws = new WebSocket(URL)

    componentDidMount() {
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
            this.ws.send(JSON.stringify({"action": "list", "request_id": 1}))
        }

        this.ws.onmessage = evt => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(evt.data);
            console.log(message)
            if( message.action === 'list') {
                this.setState({ games: message.data });
            }
            if( message.action === 'create') {
                this.setState({ games: [{pk:message.pk, status:'P'}, ...this.state.games]})
            }
        }

        this.ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            this.setState({
            ws: new WebSocket(URL),
            })
        }
    }

    componentWillUnmount() {
        this.ws.close();
    }

    render() {
        return (
            <List className="Lobby">{
                this.state.games.map( value => (
                     <ListItem key={value.pk} button onClick={() => this.props.handleGameSelect(value.pk)}>
                     <ListItemAvatar>
                       <Avatar>
                         <ImageIcon />
                       </Avatar>
                     </ListItemAvatar>
                     <ListItemText primary={value.status} secondary="Jan 9, 2014" />
                   </ListItem>

                ))
            }   
          </List>
        )
    }

}

export default Lobby;