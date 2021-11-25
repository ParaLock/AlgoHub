import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';

export default function RemoveDialog(props) {

  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    props.onClose();
  };

  const performDelete = () => {

    setLoading(true)

    console.log(props.removeRequest);

    props.requestService.executeRemoveRequest((err, res) => {

  
      setLoading(false)
      handleClose();
      

    }, props.removeRequest.item.typeName, props.removeRequest.item.id) 
    
  }


  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remove Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.removeRequest && props.removeRequest.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <LoadingButton
              onClick={()=> {performDelete()}}
              loading={loading}
              loadingPosition="center"
              variant="contained"
          >
              Yes
          </LoadingButton>
          <Button onClick={handleClose} autoFocus>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}