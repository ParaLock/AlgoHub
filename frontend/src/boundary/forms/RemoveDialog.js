import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSelector, useDispatch } from 'react-redux';

export default function RemoveDialog(props) {

  const [loading, setLoading] = React.useState(false);
  const [requestError, setRequestError] = React.useState("");
  const ontologyHierarchy = useSelector(state => state.model.ontologyHierarchy);
  const selectedItem = useSelector(state => state.viewModel.selectedOntologyItem);
  

  const handleClose = () => {
    props.onClose();
  };

  const performDelete = () => {

    setLoading(true)

    var parent = null;

    if(selectedItem) {

      var candidates = ontologyHierarchy.filter((item) => item.id == selectedItem.parentId)
      if(candidates.length > 0) {
        parent = candidates[0];
      }
    }

    props.ontologyController.selectOntologyItem(parent);

    props.requestService.executePostRequest(
      (err) => {
          console.log(err)
          setLoading(false)

          if (err.length == 0) {

              props.onClose();
              handleClose();
          }

      },
      {
          id: props.removeRequest.item.id,
      },
      props.removeRequest.item.typeName + "s" + "/remove",
      "Failed to remove " + props.removeRequest.item.typeName,
      "Removed " + props.removeRequest.item.typeName + " successfully."
  );
    
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