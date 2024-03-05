import {
    Button,
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogActions,
    DialogContent
  } from "@fluentui/react-components";
  import {
    EditRegular,
    DeleteRegular
  } from "@fluentui/react-icons";
  import PropTypes from 'prop-types'

export const TableButtonDialog = ({handleEdit, itemId, open, setOpen, handleDelete }) => {
    return (
        <>
            <Button
                icon={<EditRegular />}
                aria-label="Edit"
                onClick={() => handleEdit(itemId)}
            />
            <Dialog
                open={open}
                onOpenChange={(event, data) => setOpen(data.open)}>
                <DialogTrigger disableButtonEnhancement>
                    <Button
                        icon={<DeleteRegular />}
                        aria-label="Delete"
                    />
                </DialogTrigger>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Hapus Data Ini?</DialogTitle>
                        <DialogContent>
                            Data ini akan di hapus dan tidak dapat di pulihkan
                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Batalkan</Button>
                            </DialogTrigger>
                            <Button
                                appearance="secondary"
                                onClick={() => handleDelete(itemId)}>
                                Hapus
                            </Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
        </>
    )
}

TableButtonDialog.propTypes={
    handleEdit: PropTypes.any,
    itemId: PropTypes.number,
    open: PropTypes.bool,
    setOpen: PropTypes.any,
    handleDelete: PropTypes.any
}