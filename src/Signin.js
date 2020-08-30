import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radar from 'radar-sdk-js';

export default function FormDialog(props) {
    const open = props.open;

    function handleSignin(event) {
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
            fetch('http://localhost:4000/users/login', {
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
                    fetch('https://api.radar.io/v1/users/56db1f4613012711002229f4', {
                        headers: {
                            // 'Content-Type': 'application/json',
                            // 'Accept': 'application/json',
                            'Authorization': btoa("prj_live_pk_3bb22a86ba4987c58bb96bcee419db8c41368c62"),
                        },
                        method: 'GET',
                    })
                })
            })
        }
        catch (error) {

            // setLoading(false);
            // setState({
            //   open: true,
            //   vertical: 'top',
            //   horizontal: 'center',
            //   message: error.message,
            //   type: "error",
            //   autoHide: 6000
            // })
        }


    }


    return (
        <div>
            <Dialog fullWidth
                maxWidth={'sm'} open={open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Signin</DialogTitle>
                <form onSubmit={handleSignin}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="normal"
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                        <TextField
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
                            Signin
                        </Button>
                    </DialogActions>
                </form>

            </Dialog>
        </div>
    );
}