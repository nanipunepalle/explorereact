import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Radar from 'radar-sdk-js';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const [place,setPlace] = React.useState({});
  const [categories,setCategories] = React.useState([]);
  const [distance,setDistance] = React.useState('');
  const [time,setTime] = React.useState('');
  const userLocation = props.userlocation;
  React.useEffect(()=>{
      setPlace(props.place);
      setCategories(props.place.categories);
      const placeLatitiudes = props.place.location.coordinates[0];
      const placeLongitudes = props.place.location.coordinates[1];
    //   console.log(userLocation.latitude);
    //   console.log(placeLongitudes);
      Radar.getDistance({
        origin: {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude
        },
        destination: {
          latitude: placeLongitudes,
          longitude: placeLatitiudes
        },
        modes: [
          'car'
        ],
        units: 'imperial'
      }, function(err, result) {
        if (!err) {
            console.log(result.routes);
            setTime(result.routes.car.duration.text)
            setDistance(result.routes.car.distance.text)
        }
      });
      
      
  },[])


  function handleMoreClick(){
      props.handleMoreClick(place)
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {place.name}
          </Typography>
          <Chip label={time}></Chip>
          <Chip label={distance}></Chip>
          <Chip label={categories[0]}></Chip>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleMoreClick}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}