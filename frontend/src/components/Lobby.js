import React, { Component, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import {Link} from "react-router-dom";
const URL = 'ws://localhost:8000/ws/games'

const Lobby = props => {

    const [games, setGames] = useState([])
    const [ws,setWs] = useState(new WebSocket(URL))

    ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected')
        ws.send(JSON.stringify({"action": "list", "request_id": 1}))
    }

    ws.onmessage = evt => {
        // on receiving a message, add it to the list of messages
        const message = JSON.parse(evt.data);
        console.log(message)
        if( message.action === 'list') {
            setGames(message.data);
        }
        if( message.action === 'create') {
            setGames([{pk:message.pk, status:'P'}, ...games]);
        }
    }

    ws.onclose = () => {
        console.log('disconnected')
        // automatically try to reconnect on connection loss
        setWs(new WebSocket(URL));
    }

    return (
        <List className="Lobby">{
            games.map( value => (
                <Link  key={value.pk}   style={{textDecoration: 'none'}} to={'/game/' + value.pk}>
                    <ListItem >
                    <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={value.status} secondary="Jan 9, 2014" />
                    </ListItem>
                </Link>

            ))
        }   
        </List>
    );

}

export default Lobby;