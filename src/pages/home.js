import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';


 class home extends Component {
    state = {
        posts: null,
    }

    componentDidMount() {
        axios.get('https://asia-east2-fakebook-39e52.cloudfunctions.net/api/posts')
        .then(data => {
            this.setState({posts: data.data})
            console.log(data.data);
        })
        .catch(err => {
            console.log(err);
        }) 
    }

    render() {
    
        return (
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    <p>Content...</p>
                    <p></p>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile</p>
                </Grid>
            
            </Grid>
        )
    }
}

export default home
