import React, { useEffect, useState, useCallback } from 'react';
import {
  EuiButton,
  EuiSwitch
} from '@elastic/eui';
import dailyQuotaService from '../../services/dailyQuotaService';


const ToogleActive = ({row}) => {
    const [isChecked, setIsChecked] = useState(row.isActive);

    const handleToggle = async() => {
        try{
            const newChecked = !isChecked; 
            setIsChecked(newChecked); 
            const update = await dailyQuotaService.updateData({ active: newChecked, unitNo: row.unitNo });
            if(update.status == 200){
                console.log("berhasil")
            }else{
                console.log("coba lagi")
            }
        }catch(error){
            console.log(error)
        }
    };


    return (
    <>
    <div>
      <EuiSwitch
        checked={isChecked} 
        onChange={handleToggle} 
      />
    </div>
    </>
  );
}

export default ToogleActive;