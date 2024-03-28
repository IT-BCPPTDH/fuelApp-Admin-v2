import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button
} from "@fluentui/react-components";
import {
  CalendarMonthRegular,
} from "@fluentui/react-icons";
import PropTypes from 'prop-types'
import { useState, useEffect } from "react";

export const DialogComponent = ({ open, setOpen, title, message, handleAction, showButton, buttonText, sendingData }) => {
  const [hideButton, setHideButton] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  
  const handleButtonAction=()=>{
    handleAction()
  }
  useEffect(() => {
    if(sendingData){
      setHideButton(true)
      setShowSpinner(true)
    } else {
      setHideButton(false)
      setShowSpinner(false)
    }
  }, [sendingData]);
  return (
    <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)} modalType="alert">
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            {message}
          </DialogContent>
          <DialogActions>
            {!hideButton ? <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">{buttonText ? 'Batal' : 'Tutup'}</Button>
            </DialogTrigger> : <></> }
          {showButton ?
           <Button style={{backgroundColor: '#4caf50', color: "white"}} icon={<CalendarMonthRegular />} onClick={handleButtonAction}>
              Simpan
            </Button>: <></>
          } 
          {showSpinner ? <div className="spinner-loader"></div>:<></>}
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

DialogComponent.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.any,
  title: PropTypes.string,
  message: PropTypes.string,
  handleAction: PropTypes.func,
  buttonText: PropTypes.string,
  showButton: PropTypes.bool,
  sendingData: PropTypes.bool
}