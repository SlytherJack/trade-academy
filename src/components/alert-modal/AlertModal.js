import { Button, Dialog, DialogActions, DialogContent, Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import InfoIcon from '@material-ui/icons/Info';
import './AlertModal.scss';

function AlertModal(props) {
    const styles = (theme) => ({
        root: {
        }
    });

    const { type, open, title, body, btnText, onBtnClick } = props;

    const handleClose = () => {}

    const getIndicatorDOMElement = () => {
        switch (type) {
            case 'Success':
                return <div className="indicator success"><CheckIcon/></div>;
            case 'Info':
                return <div className="indicator info"><InfoIcon/></div>;
            case 'Error':
                return <div className="indicator error"><ErrorOutlineIcon/></div>;
        }
    }

    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                {getIndicatorDOMElement()}
                <Typography variant="h6">{children}</Typography>
            </MuiDialogTitle>
        );
    });

    return (
        <Fragment>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onBtnClick} color="primary">
                        {btnText}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default AlertModal;
