import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
} from "@fluentui/react-components";
import PropTypes from 'prop-types'

export const DialogComponent = ({open, setOpen, title, message}) => {
//   const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
      {/* <DialogTrigger disableButtonEnhancement>
        <Button>Open dialog</Button>
      </DialogTrigger> */}
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            {message}
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            {/* <Button appearance="primary">Do Something</Button> */}
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

DialogComponent.propTypes={
    open: PropTypes.bool,
    setOpen: PropTypes.any,
    title: PropTypes.string,
    message: PropTypes.string
}