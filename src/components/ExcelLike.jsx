import { useState, useCallback, useEffect } from 'react'
import { Workbook } from '@fortune-sheet/react'
import { socket } from '../socket'

const ExcelLike = () => {

  const [isConnected, setIsConnected] = useState(socket.connected);

  // const [dataXls, setDataXls] = useState(() => {
  //   const dataSaved = localStorage.getItem('datanya')
  //   if (dataSaved) {
  //     return JSON.parse(dataSaved)
  //   } else {
  //     return [
  //       {
  //         name: 'Sheet1',
  //         celldata: [{ r: 0, c: 0, v: { v: 'fortune' } }],
  //         order: 0,
  //         row: 25,
  //         column: 30
  //       }
  //     ]
  //   }
  // })
  const [dataXls, setDataXls] = useState()
  
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setDataXls(JSON.parse(value))
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  useEffect(() => {
    socket.emit('getData', 'TimeEntry-20231221-bcp', (e)=>{
      console.log(e)
    })
  }, []);

  const transformDataFormat = data => {
    let dataArray = []
    if(data){
      // console.log(data)
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

  const onChange = useCallback(e => {
  // console.log(e)
    const transformedData = e.map(sheet => transformSheetData(sheet))

    // console.log(transformedData)

    setDataXls(transformedData)
    // localStorage.setItem('datanya', JSON.stringify(transformedData))

    const keynya = 'TimeEntry-20231221-bcp'
    const object = {
      key: keynya,
      value: transformedData
    }

    // console.log(object)
    
    socket.emit('pit-control', JSON.stringify(object), () => {
      // setIsLoading(false);
    });
  }, [transformSheetData])

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
