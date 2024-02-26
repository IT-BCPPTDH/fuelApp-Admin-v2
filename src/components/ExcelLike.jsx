import { useState, useCallback } from 'react'
import { Workbook } from '@fortune-sheet/react'
import { socket } from '../socket'
// import { makeStyles, shorthands, Spinner } from "@fluentui/react-components";
import Cookies from 'js-cookie';

const ExcelLike = ({dataXls, setDataXls, id }) => {

  const [user, setUser] = useState(() => {
    let userCookie = Cookies.get('user');
    userCookie = JSON.parse(userCookie);
    return userCookie
    
  });

  const transformDataFormat = data => {
    let dataArray = []
    if (data) {
      data.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (!cell) {
            return null
          }

          const { bg, bl, cl, ct, fc, ff, fs, ht, it, m, v, vt } = cell

          dataArray.push({
            c: colIndex,
            r: rowIndex,
            v: {
              bg: bg || null,
              bl: bl || 0,
              cl: cl || null,
              ct: ct || { fa: 'General', t: 'n' },
              fc: fc || 'rgb(51, 51, 51)',
              ff: ff || 0,
              fs: fs || 11,
              ht: ht || 0,
              it: it || 0,
              m: m || '',
              v: v || null,
              vt: vt || 0
            }
          })
        })
      )
    }

    return dataArray
  }
  const transformSheetData = useCallback(sheet => {
    const transformedData = transformDataFormat(sheet.data)
    return { ...sheet, celldata: transformedData }
  }, [])

  const onChange = useCallback(
    e => {
      const transformedData = e.map(sheet => transformSheetData(sheet))

      if(JSON.stringify(transformedData) !== JSON.stringify(dataXls)){
        setDataXls(transformedData)
        const keynya = `${id}`
        const object = {
          key: keynya,
          value: transformedData,
          user:`${user.JDE} - ${user.fullname}`
        }
        socket.emit('pit-control', JSON.stringify(object), (e) => {
          console.log(e)
          // setIsLoading(false);
        })
      }
    },
    [transformSheetData, setDataXls]
  )

  const onOp = useCallback(e => {
    console.log(e)
  }, [])

  return (
    <div
      style={{
        height: '80vh',
        width: '100%',
        border: '1px solid #ddd'
      }}
    >
      {dataXls && <Workbook data={dataXls} onChange={onChange} onOp={onOp} />}
    </div>
  )
}

export default ExcelLike
