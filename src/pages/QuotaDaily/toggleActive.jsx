import React, { useEffect, useState } from 'react';
import { EuiSwitch } from '@elastic/eui';
import dailyQuotaService from '../../services/dailyQuotaService';


const ToogleActive = ({row}) => {
    const [isChecked, setIsChecked] = useState(row.isActive || false);
    const handleToggle = async() => {
        try{
            const newChecked = !isChecked; 
            console.log(newChecked)
            setIsChecked(newChecked); 
            const update = await dailyQuotaService.updateData({ active: newChecked, unitNo: row.unitNo });
            if(update.status == 200){
              // window.location.reload()
            }else{
              // window.location.reload()

            }
        } catch (error) {
            console.log("Error:", error);
            // Optionally revert the toggle state if an error occurs
            setIsChecked(isChecked);
        }
    };

    return (
        <div>
            <EuiSwitch
                checked={isChecked}
                onChange={handleToggle}
                label={row.unitNo} // Optional label for better accessibility
            />
        </div>
    );
};

export default ToggleActive;
