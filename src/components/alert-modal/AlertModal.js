import { Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import React, { Component } from 'react';

class AlertModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.props
        };
    }

    handleClose = () => {
    };

    componentDidUpdate() {
        this.state = {
            ...this.props
        };
    }

    render () {
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.props.open}>
                <DialogTitle id="customized-dialog-title">
                    {this.props.title}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body1">
                        {this.props.body}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.props.onBtnClick} color="primary">
                        {this.props.btnText}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default AlertModal;
