import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Radar from 'radar-sdk-js';
// import classes from '*.module.css';

const useStyles = makeStyles((theme) => ({
    dialog: {
        // height: '800px',
        minHeight: '90vh',
        maxHeight: '90vh',
    },
}));

export default function ScrollDialog(props) {
  const open = props.open;
  const place = props.place;
  const classes = useStyles()

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
      console.log(place);
      if(place){
        const placeLatitiudes = props.place.location.coordinates[0];
        const placeLongitudes = props.place.location.coordinates[1];
        Radar.reverseGeocode({
          latitude: placeLongitudes,
          longitude: placeLatitiudes
        }, function(err, result) {
          if (!err) {
            // do something with result.addresses
            console.log(result);
          }
        });
      }
      // eslint-disable-next-line
  }, [open]);

  return (
    <div>
      <Dialog
      fullWidth
      maxWidth='lg'
        open={open}
        onClose={props.handleClose}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className={classes.dialog}
      >
        <DialogTitle id="scroll-dialog-title">{place.name}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
          <Chip label={props.time}></Chip>
          <Chip label={props.distance}></Chip>
          {/* <Chip label={props.categories[0]}></Chip> */}
          <Typography>Connect with people </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}