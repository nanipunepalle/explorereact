import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radar from 'radar-sdk-js';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// import CircularProgress from '@material-ui/core/CircularProgress';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function FormDialog(props) {
    const open = props.open;
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: 'success',
        type: 'error',
        autoHide: 300
      });
      const [loading, setLoading] = React.useState(false);
      const { vertical, horizontal, nopen, message, type, autoHide } = state;

      function handleClose(){
        setState({ ...state, nopen: false });
      }
    function handleSignin(event) {
        setLoading(true);
        event.preventDefault();
        const { email, password } = event.target.elements
        console.log(email.value);
        console.log(password.value);
        try {
            var data = new FormData()
            const payload = {
                email: email.value,
                password: password.value
            };
            data = JSON.stringify(payload);
            fetch('https://exploreserver2.herokuapp.com/users/login', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: data
            }).then((value) => {
                console.log(value);
                value.json().then(result => {
                    console.log(result);
                    localStorage.setItem('token', result.token);
                    console.log(result.user._id)
                    Radar.setUserId(result.user._id);
                    props.handleClose()
                })
            })
        }
        catch (error) {

            setLoading(false);
            setState({
              open: true,
              vertical: 'top',
              horizontal: 'center',
              message: error.message,
              type: "error",
              autoHide: 6000
            })
        }


    }


    return (
        <div>
        <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={nopen}
        autoHideDuration={autoHide}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={type}>{message}</Alert>
      </Snackbar>
            <Dialog fullWidth
                maxWidth={'sm'} open={open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Signin</DialogTitle>
                <form onSubmit={handleSignin}>
                    <DialogContent>
                        <TextField
                        required
                            autoFocus
                            margin="normal"
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                        <TextField
                        required
                            autoFocus
                            margin="normal"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            {!loading && 'Signin'}
                        </Button>
                    </DialogActions>
                </form>

            </Dialog>
        </div>
    );
}
