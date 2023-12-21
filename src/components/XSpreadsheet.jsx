import  { useEffect, useRef } from 'react'
import Spreadsheet from 'x-data-spreadsheet'
import { Button } from '@fluentui/react-components'
import { Save24Regular } from '@fluentui/react-icons'

const config = {
  mode: 'edit', // edit | read
  showToolbar: true,
  showGrid: true,
  showContextmenu: true,
  showBottomBar: false,
  view: {
    height: () => 585,
    width: () => 1295
  },
  row: {
    len: 50,
    height: 25
  },
  col: {
    len: 26,
    width: 100,
    indexWidth: 60,
    minWidth: 60
  },
  style: {
    bgcolor: '#ffffff',
    align: 'left',
    valign: 'middle',
    textwrap: false,
    strike: false,
    underline: false,
    color: '#0a0a0a',
    font: {
      name: 'Arial',
      size: 10,
      bold: false,
      italic: false
    }
  }
}
const XSpreadsheet = () => {
  const spreadsheetRef = useRef(null)

  useEffect(() => {
    const spreadsheetElement = spreadsheetRef.current

    if (spreadsheetElement && !spreadsheetElement.spreadsheetInstance) {
      
      const spreadsheet = new Spreadsheet(spreadsheetElement, config)

      const handleDataChange = data => {
        console.log(data)
      }

      const rows = {
        len: 20,
        height: 40,
        1: {
          cells: {
            0: { text: 'Unit No.', style: 0 },
            1: { text: 'Product Model', style: 0},
            2: { text: 'Description', style: 0 },
            3: { text: 'Owner', style: 0 },
            4: { text: 'Production Date', style: 0},
            5: { text: 'Shift', style: 0},
            6: { text: 'Operator ID', style: 0},
            7: { text: 'Operator Name', style: 0},
            8: { text: 'SMU Start', style: 0},
            9: { text: 'SMU Finish', style: 0},
            10: { text: 'HM', style: 0},
            11: { text: 'Activity', style: 0},
            12: { text: 'Start Time', style: 0},
            13: { text: 'End Time', style: 0},
            14: { text: 'Duration', style: 0},
            15: { text: 'Convert Duration', style: 0},
            16: { text: 'BD Number', style: 0},
            17: { text: 'From Equipment', style: 0},
            18: { text: 'Material', style: 0},
            19: { text: 'Mat Group', style: 0},
            20: { text: 'DISTANCE', style: 0},
            21: { text: 'Loading Location', style: 0},
            22: { text: 'Dumping Location', style: 0},
            23: { text: 'Trip', style: 0},
            24: { text: 'BCM', style: 0},
            25: { text: 'NOTES', style: 0},
            26: { text: 'Cut Off Status', style: 0},
            27: { text: 'LOC', style: 0},
          }
          ,height: 40
        },
      }

      const styles = [
        { align: 'center', font: { bold: true, name: "Helvetica", size: 10 }, bgcolor: '#7ebe55' },
        { align: 'center'}
      ];

      const cols = {
        0: { width: 102 },
        1: { width: 120 },
        2: { width: 200 },
        4: { width: 119 },
        7: { width: 123 },
        11: { width: 247 },
        15: { width: 129 },
        17: { width: 137 },
        18: { width: 128 },
        21: { width: 138 },
        22: { width: 131 },
        25: { width: 125 },
        26: { width: 107 },
        27: { width: 126 },
      };
      
      spreadsheet
        .loadData([
          {
            freeze: 'B3',
            styles: styles,
            merges: ['C3:D4'],
            cols:cols,
            rows
          }
        ])
        .change(handleDataChange)

      
      spreadsheetElement.spreadsheetInstance = spreadsheet

    }
  }, [])

  const saveData = () => {
    const spreadsheetElement = spreadsheetRef.current
    if (spreadsheetElement && spreadsheetElement.spreadsheetInstance) {
      const data = spreadsheetElement.spreadsheetInstance.getData()
      console.log('Saved Data:', data)
      // Add your logic to send the data to the server or perform other actions.
    }
  }

  const clearData = () => {

  }

  // Render the div only if the ref is not null
  return (
    <div style={{ maxWidth: '100%' }}>
      <div ref={spreadsheetRef} id='x-spreadsheet' style={{border: '1px solid #c8c8c8', padding: '2px'}} />

        
      <div className='btn-group-xls'>
        <Button onClick={clearData}>Clear Data</Button>
        <Button
          onClick={saveData}
          appearance='primary'
          icon={<Save24Regular />}
        >
          Save Data to Server
        </Button>
      </div>
    </div>
  )
}

export default XSpreadsheet
