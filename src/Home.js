import React from 'react';
import Radar from 'radar-sdk-js';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import PlaceCard from './PlaceCard';
import { Grid } from '@material-ui/core';
import Signin from './Signin';
import Signup from './Signup';
import PlaceDetailsDialog from './PlaceDetailsDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    button: {
        borderRadius: theme.spacing(2)
    },
    filterField: {
        marginBottom: theme.spacing(1),
    },
    discardButton: {
        borderRadius: theme.spacing(2),
        marginLeft: theme.spacing(0.5),
    },
    box: {
        margin: theme.spacing(13),
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    contentdiv: {
        margin: theme.spacing(5)
    }
}));

function Home() {
    const classes = useStyles();
    const categories = ['city-infrastructure', 'education', 'government-building', 'hotel-lodging', 'local-services', 'locality', 'medical-health', 'outdoor-places', 'religion', 'science-engineering', 'shopping-retail', 'sports-recreation', 'travel-transportation']
    const [places, setPlaces] = React.useState([]);
    const [signinOpen, setSigninOpen] = React.useState(false);
    const [signupOpen, setSignupOpen] = React.useState(false);
    const [moreOpen,setMoreOpen] = React.useState(false);
    const [selectedPlace,setSelectedPlace] = React.useState({});
    const [currentUserLocation, setCurrentUserLocation] = React.useState(null);
    const [loggedin, setLoggedin] = React.useState(false);
    const token = localStorage.getItem('token');
    function handleClose() {
        setSigninOpen(false);
        setSignupOpen(false);
        setMoreOpen(false);
    }

    function handleSigninClick() {
        setSigninOpen(true)
    }
    function handleSignupClick() {
        setSignupOpen(true);
    }
    function handleMoreClick(p){
        setSelectedPlace(p);
        setMoreOpen(true);
    }
    function handleSignoutClick(){
        fetch('http://localhost:4000/users/logout', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
            }).then(result=>{
                console.log(result);
                localStorage.removeItem('token')
                setLoggedin(false);
            })
    }

    React.useEffect(() => {
        if (token) {
            setLoggedin(true)
        }
        Radar.trackOnce(function (err, result) {
            console.log(err);
            console.log(result);
            if (!err) {
                console.log(result);
                console.log(result.location.latitude);
                setCurrentUserLocation(result.location);
                Radar.searchPlaces({
                    near: {
                        latitude: result.location.latitude,
                        longitude: result.location.longitude
                    },
                    categories: categories,
                    radius: 1000,
                    // chains: ['dominos'],
                    limit: 10
                }, function (err, result) {
                    if (!err) {
                        console.log(result);
                        setPlaces(result.places);
                    }
                });
            }
        });
    }, [])
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Explore places
                    </Typography>
                    {!loggedin && <Button color="inherit" onClick={handleSigninClick}>Signin</Button>}
                    {!loggedin && <Button color="inherit" onClick={handleSignupClick}>Signup</Button>}
                    {loggedin && <Button color="inherit" onClick={handleSignoutClick}>Signout</Button>}
                </Toolbar>
            </AppBar>
            <Typography variant="h2" align='center'>Find places near you,connect with others </Typography>
            <Box m={1} p={1} className={classes.box}>
                <Box whiteSpace="normal">
                    <Autocomplete
                        className={classes.filterField}
                        multiple
                        id="tags-outlined"
                        options={categories}
                        getOptionLabel={(option) => option}
                        // defaultValue={[top100Films[13]]}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Filter based on your interests"
                                placeholder="Favorites"
                            />
                        )}
                    />
                </Box>
                <Box className={classes.buttons}>
                    <Button className={classes.button} variant="contained">Filter</Button>
                    <Button className={classes.discardButton} variant="contained">Discard</Button>
                </Box>
            </Box>
            <div className={classes.contentdiv}>
                <Grid container component="main" alignItems="center" spacing={1}>
                    {
                        places.map((place, index) => {
                            return <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                <PlaceCard userlocation={currentUserLocation} place={place}></PlaceCard>
                            </Grid>
                        })
                    }
                </Grid>
            </div>
            <Signin open={signinOpen} handleClose={handleClose}></Signin>
            <Signup open={signupOpen} handleClose={handleClose}></Signup>
            {/* <PlaceDetailsDialog open={moreOpen} handleMore={handleMoreClick} place={selectedPlace} handleClose={handleClose}></PlaceDetailsDialog> */}
        </div>
    );
}

export default Home;